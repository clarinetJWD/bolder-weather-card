import { LitElement, html, type TemplateResult, type PropertyValues, type CSSResultGroup, css, unsafeCSS, type CSSResult, type HTMLTemplateResult } from 'lit'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, state } from 'lit/decorators.js'
import {
  type HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  type ActionHandlerEvent,
  handleAction,
  TimeFormat,
  type ActionConfig,
  type LovelaceCardEditor
} from 'custom-card-helpers' // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import {
  type BolderWeatherCardConfig,
  type MergedBolderWeatherCardConfig,
  type MergedWeatherForecast,
  Rgb,
  type TemperatureSensor,
  type TemperatureUnit,
  type HumiditySensor,
  type Weather,
  WeatherEntityFeature,
  type WeatherForecast,
  type WeatherForecastEvent,
  type StyleItem
} from './types'
import { GetCss } from './styles'
import { actionHandler } from './action-handler-directive'
import localize from './localize/localize'
import { type HassEntity, type HassEntityBase } from 'home-assistant-js-websocket'
import { extractMostOccuring, max, min, round, roundDown, roundIfNotNull, roundUp } from './utils'
import { cropIcons, staticIcons } from './images'
import { version } from '../package.json'
import { safeRender } from './helpers'
import { DateTime } from 'luxon'

console.info(
  `%c  BOLDER-WEATHER-CARD \n%c Version: ${version}`,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);

// This puts your card into the UI card picker dialog
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'bolder-weather-card',
  name: 'Bolder Weather Card',
  description: 'A weather card that uses large text and bold images for use on mounted dashboards that are viewed from a distance.'
})

@customElement('bolder-weather-card')
export class BolderWeatherCard extends LitElement {
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant

  @state() private config!: MergedBolderWeatherCardConfig
  @state() private currentDate!: DateTime
  @state() private forecasts?: WeatherForecast[]
  @state() private error?: TemplateResult
  private forecastSubscriber?: () => Promise<void>
  private forecastSubscriberLock = false

  public static async getConfigElement (): Promise<LovelaceCardEditor> {
    await import('./editor')
    return document.createElement('bolder-weather-card-editor')
  }

  constructor () {
    super()
    this.currentDate = DateTime.now()
    const msToNextSecond = (1000 - this.currentDate.millisecond)
    setTimeout(() => setInterval(() => {
      if (this.time() !== this.time(DateTime.now())) {
        this.currentDate = DateTime.now()
      }
    }, 1000), msToNextSecond)
    setTimeout(() => {
      if (this.time() !== this.time(DateTime.now())) {
        this.currentDate = DateTime.now()
      }
    }, msToNextSecond)
  }

  public static getStubConfig (_hass: HomeAssistant, entities: string[], entitiesFallback: string[]): Record<string, unknown> {
    const entity = entities.find(e => e.startsWith('weather.') ?? entitiesFallback.find(() => true))
    if (entity) {
      return { entity }
    }

    return {}
  }

  public getCardSize (): number {
    return 3 + roundUp(this.config.forecast_rows / 2)
  }

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig (config?: BolderWeatherCardConfig): void {
    if (!config) {
      throw this.createError('Invalid configuration.')
    }

    if (!config.entity) {
      throw this.createError('Attribute "entity" must be present.')
    }

    if (config.forecast_rows && config.forecast_rows < 1) {
      throw this.createError('Attribute "forecast_rows" must be greater than 0.')
    }

    if (config.time_format && config.time_format.toString() !== '24' && config.time_format.toString() !== '12') {
      throw this.createError('Attribute "time_format" must either be "12" or "24".')
    }

    if (config.hide_today_section && config.hide_forecast_section) {
      throw this.createError('Attributes "hide_today_section" and "hide_forecast_section" must not enabled at the same time.')
    }

    this.config = this.mergeConfig(config)
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate (changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false
    }

    if (changedProps.has('forecasts')) {
      return true
    }

    const oldHass = changedProps.get('hass') as HomeAssistant | undefined
    if (oldHass) {
      const oldSun = oldHass.states[this.config.sun_entity]
      const newSun = this.hass.states[this.config.sun_entity]
      if (oldSun !== newSun) {
        return true
      }
    }

    return hasConfigOrEntityChanged(this, changedProps, false)
  }

  protected updated (changedProps: PropertyValues): void {
    super.updated(changedProps)
    if (changedProps.has('config')) {
      void this.subscribeForecastEvents()
    }
  }

  // https://lit.dev/docs/components/rendering/
  protected render (): TemplateResult {
    if (this.error) {
      return this.error
    }

    const showToday = !this.config.hide_today_section
    const showForecast = !this.config.hide_forecast_section
    const daytime = this.getSun()?.state === 'below_horizon' ? 'night' : 'day'
    const cardClass = this.config.use_day_night_colors ? 'bolder-weather-card-' + daytime : 'bolder-weather-card'
    return html`
      <ha-card 
        class="${cardClass}"
        @action=${(e: ActionHandlerEvent) => { this.handleAction(e) }}
        .actionHandler=${actionHandler({
      hasHold: hasAction(this.config.hold_action as ActionConfig | undefined),
      hasDoubleClick: hasAction(this.config.double_tap_action as ActionConfig | undefined)
    })}
        tabindex="0"
        .label=${`Bolder Weather Card: ${this.config.entity || 'No Entity Defined'}`}
      >
        <div class="card-content">
          ${showToday
        ? html`
            <bolder-weather-card-today>
              ${safeRender(() => this.renderToday())}
            </bolder-weather-card-today>`
        : ''}

          ${this.config.title
          ? html`
            <div class="card-header">
              ${this.config.title}
            </div>`
          : ''}

          ${showForecast
        ? html`
            <bolder-weather-card-forecast>
              ${safeRender(() => this.renderForecast())}
            </bolder-weather-card-forecast>`
        : ''}
        </div>
        <style>${this.config.styles ? this.getStyleOverrideFromConfig(this.config.styles) : css``}</style>
      </ha-card>
    `
  }

  public connectedCallback (): void {
    super.connectedCallback()
    if (this.hasUpdated) {
      void this.subscribeForecastEvents()
    }
  }

  public disconnectedCallback (): void {
    super.disconnectedCallback()
    void this.unsubscribeForecastEvents()
  }

  protected willUpdate (changedProps: PropertyValues): void {
    super.willUpdate(changedProps)
    if (!this.forecastSubscriber) {
      void this.subscribeForecastEvents()
    }
  }

  private renderToday (): TemplateResult {
    const weather = this.getWeather()
    const state = weather.state
    const temp = this.getCurrentTemperature()
    const tempPrecision = this.getConfiguredTemperaturePrecision(this.getMainTemperatureEntityName())
    const tempUnit = weather.attributes.temperature_unit
    const apparentTemp = this.getApparentTemperature()
    const aqi = this.getAqi()
    const aqiColorClass = this.getAqiColor(aqi)
    const uv = this.getUv()
    const uvColorClass = this.getUvColor(uv)
    const humidity = roundIfNotNull(this.getCurrentHumidity())
    const icon = this.toIcon(state, 'crop', false)
    const weatherString = this.localize(`weather.${state}`)
    const localizedTemp = temp !== null ? this.toConfiguredTempWithoutUnit(tempUnit, temp).toFixed(tempPrecision) : null
    const localizedUnit = temp !== null ? this.getConfiguredTemperatureUnit() : null
    const localizedApparent = apparentTemp !== null ? this.toConfiguredTempWithUnit(tempUnit, apparentTemp, this.getConfiguredTemperaturePrecision(this.config.apparent_sensor)) : null
    const apparentString = this.localize('misc.feels-like')
    const aqiString = this.localize('misc.aqi')
    const uvString = this.localize('misc.uv')
    const daytime = this.getSun()?.state === 'below_horizon' ? 'night' : 'day'
    const todayForecast = this.mergeForecasts(1, false)
    const forecastPrecision = this.getConfiguredTemperaturePrecision(this.config.entity)
    const localizedLow = todayForecast[0] !== null ? this.toConfiguredTempWithoutUnit(tempUnit, todayForecast[0].templow).toFixed(forecastPrecision) : null
    const localizedHigh = todayForecast[0] !== null ? this.toConfiguredTempWithoutUnit(tempUnit, todayForecast[0].temperature).toFixed(forecastPrecision) : null
    let todayMainHtml: HTMLTemplateResult
    let topStrings = [
      this.config.hide_date ? undefined : this.date(),
      this.config.hide_clock || this.config.use_time_as_primary ? undefined : this.time(),
      this.config.use_time_as_primary ? `${localizedTemp} ${localizedUnit}` : undefined
    ]

    if (this.config?.show_low_high_on_primary && !this.config?.use_time_as_primary) {
      todayMainHtml = html`
        <div class="primary-temp-container" style="display: flex; align-items: center">
          <div class="temp-and-unit temp-low-high temp-low">
            <span>${localizedLow}</span>
          </div>
          <div class="temp-dot"></div>
          <div class="temp-and-unit temp-primary">
            <span>${localizedTemp}</span>
          </div>
          <div class="temp-dot"></div>
          <div class="temp-and-unit temp-low-high temp-high">
            <span>${localizedHigh}</span>
            <span class="bolder-weather-card-temp-unit bolder-weather-card-low-high-temp-unit">${localizedUnit}</span>
          </div>
        </div>`
    } else {
      todayMainHtml = html`
      <div class="primary-temp-container" style="display: flex; align-items: center">
        <div class="temp-and-unit temp-primary">
          <span>${localizedTemp}</span>
          <span class="bolder-weather-card-temp-unit bolder-weather-card-low-high-temp-unit">${localizedUnit}</span>
        </div>
      </div>`
    }

    topStrings = topStrings.filter(Boolean)

    const centerString = this.config.use_time_as_primary ? html`${this.time()}` : todayMainHtml

    const stateString = html`${weatherString}`
    const apparentHtml = html`${apparentString} ${localizedApparent} ${this.config.show_humidity || this.config.aqi_sensor ? html`` : html``}`

    const aqiHtml = html`${this.config.aqi_use_color ? html`<aqi-text class="${aqiColorClass ?? ''}">${aqi} ${aqiString}</aqi-text>` : html`${aqi} ${aqiString}`}${this.config.show_humidity || this.config.uv_sensor ? html`&nbsp;•&nbsp;` : html``}`
    const uvHtml = html`${this.config.uv_use_color ? html`<uv-text class="${uvColorClass ?? ''}">${uvString} ${uv}</uv-text>` : html`${uvString} ${uv}`}${this.config.show_humidity ? html`&nbsp;•&nbsp;` : html``}`
    const humidityHtml = html`${humidity}<ha-icon icon="mdi:water-percent" style="--mdc-icon-size: var(--bolder-weather-card-bottom-text-size_internal); margin-top: -2px;" />`
    const bottomString = html`${this.config.aqi_sensor ? aqiHtml : html``}${this.config.uv_sensor ? uvHtml : html``}${this.config.show_humidity ? humidityHtml : html``}`

    return html`
      <bolder-weather-card-today-left>
        <div class="grow-img-container"><img class="grow-img today-img-crop today-img-${state}-${daytime}" src=${icon} /></div>
      </bolder-weather-card-today-left>
      <bolder-weather-card-today-right>
        <bolder-weather-card-today-right-wrap>
          <bolder-weather-card-today-right-wrap-top>
            ${topStrings.join(' • ')}
          </bolder-weather-card-today-right-wrap-top>
          <bolder-weather-card-today-right-wrap-center>
            ${centerString}
          </bolder-weather-card-today-right-wrap-center>
          <bolder-weather-card-today-right-wrap-bottom>
            ${this.config.apparent_sensor ? apparentHtml : html``}
          </bolder-weather-card-today-right-wrap-bottom>
          <bolder-weather-card-today-right-wrap-bottom>
            ${bottomString}
          </bolder-weather-card-today-right-wrap-bottom>
          <bolder-weather-card-today-right-wrap-state>
            ${stateString}
          </bolder-weather-card-today-right-wrap-state>
        </bolder-weather-card-today-right-wrap>
      </bolder-weather-card-today-right>`
  }

  private renderForecast (): TemplateResult[] {
    const weather = this.getWeather()
    const currentTemp = roundIfNotNull(this.getCurrentTemperature())
    const maxRowsCount = this.config.forecast_rows
    const hourly = this.config.hourly_forecast
    const temperatureUnit = weather.attributes.temperature_unit

    const forecasts = this.mergeForecasts(maxRowsCount, hourly)

    const minTemps = forecasts.map((f) => f.templow)
    const maxTemps = forecasts.map((f) => f.temperature)
    if (currentTemp !== null) {
      minTemps.push(currentTemp)
      maxTemps.push(currentTemp)
    }
    const minTemp = Math.round(min(minTemps))
    const maxTemp = Math.round(max(maxTemps))

    const gradientRange = this.gradientRange(minTemp, maxTemp, temperatureUnit)

    const displayTexts = forecasts
      .map(f => f.datetime)
      .map(d => hourly ? this.time(d) : this.localize(`day.${d.weekday}`))
    const maxColOneChars = displayTexts.length ? max(displayTexts.map(t => t.length)) : 0

    return forecasts.map((forecast, i) => safeRender(() => this.renderForecastItem(forecast, gradientRange, minTemp, maxTemp, currentTemp, hourly, displayTexts[i], maxColOneChars)))
  }

  private renderForecastItem (forecast: MergedWeatherForecast, gradientRange: Rgb[], minTemp: number, maxTemp: number, currentTemp: number | null, hourly: boolean, displayText: string, maxColOneChars: number): TemplateResult {
    const weatherState = forecast.condition === 'pouring' ? 'raindrops' : forecast.condition === 'rainy' ? 'raindrop' : forecast.condition
    const weatherIcon = this.toIcon(weatherState, 'fill', true)
    const tempUnit = this.getWeather().attributes.temperature_unit
    const isNow = hourly ? DateTime.now().hour === forecast.datetime.hour : DateTime.now().day === forecast.datetime.day
    const minTempDay = isNow && currentTemp !== null ? Math.min(currentTemp, forecast.templow) : forecast.templow
    const maxTempDay = isNow && currentTemp !== null ? Math.max(currentTemp, forecast.temperature) : forecast.temperature
    const forecastPrecision = this.config.show_decimal ? this.getConfiguredTemperaturePrecision(this.config.entity) : 0

    return html`
      <bolder-weather-card-forecast-row style="--col-one-size: ${(maxColOneChars * 0.5)}rem;">
        ${this.renderText(displayText)}
        ${this.renderIcon(weatherIcon)}
        ${this.renderText(this.toConfiguredTempWithUnit(tempUnit, minTempDay, forecastPrecision), 'right')}
        ${this.renderForecastTemperatureBar(gradientRange, minTemp, maxTemp, minTempDay, maxTempDay, isNow, forecast.isdefault, currentTemp)}
        ${this.renderText(this.toConfiguredTempWithUnit(tempUnit, maxTempDay, forecastPrecision))}
      </bolder-weather-card-forecast-row>
    `
  }

  private renderText (text: string, textAlign: 'left' | 'center' | 'right' = 'left'): TemplateResult {
    return html`
      <forecast-text style="--text-align: ${textAlign};">
        ${text}
      </forecast-text>
    `
  }

  private renderIcon (src: string): TemplateResult {
    return html`
      <forecast-icon>
        <img class="grow-img" src=${src} />
      </forecast-icon>
    `
  }

  private renderForecastTemperatureBar (gradientRange: Rgb[], minTemp: number, maxTemp: number, minTempDay: number, maxTempDay: number, isNow: boolean, isDefault: boolean, currentTemp: number | null): TemplateResult {
    const { startPercent, endPercent } = this.calculateBarRangePercents(minTemp, maxTemp, minTempDay, maxTempDay)
    const moveRight = maxTemp === minTemp ? 0 : (minTempDay - minTemp) / (maxTemp - minTemp)
    const rangeStyle = `--move-right: ${moveRight}; --start-percent: ${startPercent}%; --end-percent: ${endPercent}%; --gradient: ${this.gradient(
            gradientRange,
            startPercent,
            endPercent
          )};`
    return html`
      <forecast-temperature-bar>
        <forecast-temperature-bar-background> </forecast-temperature-bar-background>
        <forecast-temperature-bar-range
          style="${isDefault ? '' : rangeStyle}"
        >
          ${isNow && !isDefault ? this.renderForecastCurrentTemp(minTempDay, maxTempDay, currentTemp) : ''}
        </forecast-temperature-bar-range>
      </forecast-temperature-bar>
    `
  }

  private renderForecastCurrentTemp (minTempDay: number, maxTempDay: number, currentTemp: number | null): TemplateResult {
    if (currentTemp == null) {
      return html``
    }
    const indicatorPosition = minTempDay === maxTempDay ? 0 : (100 / (maxTempDay - minTempDay)) * (currentTemp - minTempDay)
    const steps = maxTempDay - minTempDay
    const moveRight = maxTempDay === minTempDay ? 0 : (currentTemp - minTempDay) / steps
    return html`
      <forecast-temperature-bar-current-indicator style="--position: ${indicatorPosition}%;">
        <forecast-temperature-bar-current-indicator-dot style="--move-right: ${moveRight}">
        </forecast-temperature-bar-current-indicator-dot>
      </forecast-temperature-bar-current-indicator>
    `
  }

  // https://lit.dev/docs/components/styles/
  static get styles (): CSSResultGroup {
    return [css`${unsafeCSS(GetCss())}`]
  }

  private getGradientMap (temperatureUnit: TemperatureUnit): Map<number, Rgb> {
    if (this.config.gradient_stops && this.config.gradient_stops.length > 0) {
      const temps = this.config.gradient_stops.map((gradientStop) => this.toCelsius(temperatureUnit, gradientStop.temperature))
      const colors = this.config.gradient_stops.map((gradientStop) => new Rgb(gradientStop.rgb_color[0], gradientStop.rgb_color[1], gradientStop.rgb_color[2]))
      const gradientMap: Map<number, Rgb> = new Map<number, Rgb>()
      for (let i = 0; i < this.config.gradient_stops.length; i++) {
        if (i === 0) gradientMap.set(-200, colors[i])
        gradientMap.set(temps[i], colors[i])
        if (i === this.config.gradient_stops.length - 1) gradientMap.set(200, colors[i])
      }
      return gradientMap
    } else {
      const gradientMap = new Map()
        .set(-200, new Rgb(0, 60, 98)) // dark blue
        .set(-20, new Rgb(0, 60, 98)) // dark blue
        .set(-10, new Rgb(120, 162, 204)) // darker blue
        .set(0, new Rgb(164, 195, 210)) // light blue
        .set(10, new Rgb(121, 210, 179)) // turquoise
        .set(21, new Rgb(101, 209, 68)) // green
        .set(26, new Rgb(252, 245, 112)) // yellow
        .set(33, new Rgb(255, 150, 79)) // orange
        .set(40, new Rgb(255, 192, 159)) // red
        .set(200, new Rgb(255, 192, 159)) // red
      return gradientMap
    }
  }

  private gradientRange (minTemp: number, maxTemp: number, temperatureUnit: TemperatureUnit): Rgb[] {
    const minTempCelsius = this.toCelsius(temperatureUnit, minTemp)
    const maxTempCelsius = this.toCelsius(temperatureUnit, maxTemp)
    const gradientMap = this.getGradientMap(temperatureUnit)
    const minVal = Math.max(roundDown(minTempCelsius, 10), min([...gradientMap.keys()]))
    const maxVal = Math.min(roundUp(maxTempCelsius, 10), max([...gradientMap.keys()]))
    return Array.from(gradientMap.keys())
      .filter((temp) => temp >= minVal && temp <= maxVal)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((temp) => gradientMap.get(temp)!)
  }

  private gradient (rgbs: Rgb[], fromPercent: number, toPercent: number): string {
    if (rgbs.length <= 1) {
      const rgb = rgbs[0] ?? new Rgb(255, 255, 255)
      return [rgb, rgb]
        .map((rgb) => rgb.toRgbString())
        .join(',')
    }
    const [fromRgb, fromIndex] = this.calculateRgb(rgbs, fromPercent, 'left')
    const [toRgb, toIndex] = this.calculateRgb(rgbs, toPercent, 'right')
    const between = rgbs.slice(fromIndex + 1, toIndex)

    return [fromRgb, ...between, toRgb]
      .map((rgb) => rgb.toRgbString())
      .join(',')
  }

  private calculateRgb (rgbs: Rgb[], percent: number, pickIndex: 'left' | 'right'): [rgb: Rgb, index: number] {
    function valueAtPosition (start: number, end: number, percent: number): number {
      const abs = Math.abs(start - end)
      const value = (abs / 100) * percent
      if (start > end) {
        return round(start - value)
      } else {
        return round(start + value)
      }
    }

    function rgbAtPosition (startIndex: number, endIndex: number, percentToNextIndex: number, rgbs: Rgb[]): Rgb {
      const start = rgbs[startIndex]
      const end = rgbs[endIndex]
      const percent = percentToNextIndex < 0 ? 100 + percentToNextIndex : percentToNextIndex
      const left = percentToNextIndex < 0 ? end : start
      const right = percentToNextIndex < 0 ? start : end
      const r = valueAtPosition(left.r, right.r, percent)
      const g = valueAtPosition(left.g, right.g, percent)
      const b = valueAtPosition(left.b, right.b, percent)
      return new Rgb(r, g, b)
    }

    const steps = 100 / (rgbs.length - 1)
    const step = percent / steps
    const startIndex = Math.round(step)
    const percentToNextIndex = (100 / steps) * (percent - startIndex * steps)
    const endIndex = percentToNextIndex === 0 ? startIndex : percentToNextIndex < 0 ? startIndex - 1 : startIndex + 1
    const rgb = rgbAtPosition(startIndex, endIndex, percentToNextIndex, rgbs)
    const index = pickIndex === 'left' ? Math.min(startIndex, endIndex) : Math.max(startIndex, endIndex)
    return [rgb, index]
  }

  private handleAction (ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action)
    }
  }

  private mergeConfig (config: BolderWeatherCardConfig): MergedBolderWeatherCardConfig {
    return {
      ...config,
      sun_entity: config.sun_entity ?? 'sun.sun',
      temperature_sensor: config.temperature_sensor,
      humidity_sensor: config.humidity_sensor,
      forecast_rows: config.forecast_rows ?? 5,
      hourly_forecast: config.hourly_forecast ?? false,
      time_format: config.time_format?.toString() as '12' | '24' | undefined,
      time_pattern: config.time_pattern ?? undefined,
      show_humidity: config.show_humidity ?? false,
      hide_forecast_section: config.hide_forecast_section ?? false,
      hide_today_section: config.hide_today_section ?? false,
      hide_clock: config.hide_clock ?? false,
      hide_date: config.hide_date ?? false,
      date_pattern: config.date_pattern ?? 'D',
      use_browser_time: config.use_browser_time ?? false,
      time_zone: config.time_zone ?? undefined,
      show_decimal: config.show_decimal ?? false,
      apparent_sensor: config.apparent_sensor ?? undefined,
      aqi_sensor: config.aqi_sensor ?? undefined,
      aqi_use_color: config.aqi_use_color ?? true,
      uv_sensor: config.uv_sensor ?? undefined,
      uv_use_color: config.uv_use_color ?? true,
      use_day_night_colors: config.use_day_night_colors ?? true,
      use_time_as_primary: config.use_time_as_primary ?? false,
      show_low_high_on_primary: config.show_low_high_on_primary ?? false,
      show_dots_between_primary_elements: config.show_dots_between_primary_elements ?? false,
      gradient_stops: config.gradient_stops ?? [],
      styles: config.styles ?? []
    }
  }

  private toIcon (weatherState: string, type: 'fill' | 'crop', forceDay: boolean): string {
    const daytime = forceDay ? 'day' : this.getSun()?.state === 'below_horizon' ? 'night' : 'day'
    const iconMap = type === 'crop' ? cropIcons : staticIcons
    const icon = iconMap[type][weatherState]
    return icon?.[daytime] || icon
  }

  private getWeather (): Weather {
    const weather = this.hass.states[this.config.entity] as Weather | undefined
    if (!weather) {
      throw this.createError(`Weather entity "${this.config.entity}" could not be found.`)
    }
    return weather
  }

  private getCurrentTemperature (): number | null {
    if (this.config.temperature_sensor) {
      const temperatureSensor = this.hass.states[this.config.temperature_sensor] as TemperatureSensor | undefined
      const temp = temperatureSensor?.state ? parseFloat(temperatureSensor.state) : undefined
      const unit = temperatureSensor?.attributes.unit_of_measurement ?? this.getConfiguredTemperatureUnit()
      if (temp !== undefined && !isNaN(temp)) {
        return this.toConfiguredTempWithoutUnit(unit, temp)
      }
    }

    // return weather temperature if above code could not extract temperature from temperature_sensor
    return this.getWeather().attributes.temperature ?? null
  }

  private getCurrentHumidity (): number | null {
    if (this.config.humidity_sensor) {
      const humiditySensor = this.hass.states[this.config.humidity_sensor] as HumiditySensor | undefined
      const humid = humiditySensor?.state ? parseFloat(humiditySensor.state) : undefined
      if (humid !== undefined && !isNaN(humid)) {
        return humid
      }
    }

    // Return weather humidity if the code could not extract humidity from the humidity_sensor
    return this.getWeather().attributes.humidity ?? null
  }

  private getApparentTemperature (): number | null {
    if (this.config.apparent_sensor) {
      const apparentSensor = this.hass.states[this.config.apparent_sensor] as TemperatureSensor | undefined
      const temp = apparentSensor?.state ? parseFloat(apparentSensor.state) : undefined
      const unit = apparentSensor?.attributes.unit_of_measurement ?? this.getConfiguredTemperatureUnit()
      if (temp !== undefined && !isNaN(temp)) {
        return this.toConfiguredTempWithoutUnit(unit, temp)
      }
    }
    return null
  }

  private getAqi (): number | null {
    if (this.config.aqi_sensor) {
      const aqiSensor = this.hass.states[this.config.aqi_sensor] as HassEntity | undefined
      const aqi = aqiSensor?.state ? parseInt(aqiSensor.state) : undefined
      if (aqi !== undefined && !isNaN(aqi)) {
        return aqi
      }
    }
    return null
  }

  private getAqiColor (aqi: number | null): string | null {
    if (aqi == null) {
      return null
    }
    if (aqi <= 50) return 'aqi-green'
    if (aqi <= 100) return 'aqi-yellowgreen'
    if (aqi <= 150) return 'aqi-orange'
    if (aqi <= 200) return 'aqi-red'
    if (aqi <= 300) return 'aqi-purple'
    return 'aqi-maroon'
  }

  private getUv (): number | null {
    if (this.config.uv_sensor) {
      const uvSensor = this.hass.states[this.config.uv_sensor] as HassEntity | undefined
      const uv = uvSensor?.state ? parseInt(uvSensor.state) : undefined
      if (uv !== undefined && !isNaN(uv)) {
        return uv
      }
    }
    return null
  }

  private getUvColor (uv: number | null): string | null {
    if (uv == null) {
      return null
    }
    if (uv <= 2) return 'uv-green'
    if (uv <= 5) return 'uv-yellowgreen'
    if (uv <= 7) return 'uv-orange'
    if (uv <= 10) return 'uv-red'
    return 'uv-violet'
  }

  private getSun (): HassEntityBase | undefined {
    return this.hass.states[this.config.sun_entity]
  }

  private getLocale (): string {
    return this.config.locale ?? this.hass.locale?.language ?? 'en-US'
  }

  private date (): string {
    return this.toZonedDate(this.currentDate).toFormat(this.config.date_pattern)
  }

  private time (date: DateTime = this.currentDate): string {
    if (this.config.time_pattern) {
      return this.toZonedDate(date).toFormat(this.config.time_pattern)
    }

    if (this.config.time_format) {
      return this.toZonedDate(date)
        .toFormat(this.config.time_format === '24' ? 'HH:mm' : 'h:mm a')
    }
    if (this.hass.locale.time_format === TimeFormat.am_pm) {
      return this.toZonedDate(date).toFormat('h:mm a')
    }

    if (this.hass.locale.time_format === TimeFormat.twenty_four) {
      return this.toZonedDate(date).toFormat('HH:mm')
    }

    return this.toZonedDate(date).toFormat('t')
  }

  private toCelsius (temperatueUnit: TemperatureUnit, temperature: number): number {
    return temperatueUnit === '°C' ? temperature : (temperature - 32) * (5 / 9)
  }

  private toFahrenheit (temperatueUnit: TemperatureUnit, temperature: number): number {
    return temperatueUnit === '°F' ? temperature : (temperature * 9 / 5) + 32
  }

  private getConfiguredTemperatureUnit (): TemperatureUnit {
    return this.hass.config.unit_system.temperature as TemperatureUnit
  }

  private getMainTemperatureEntityName (): string {
    return this.config.temperature_sensor ?? this.config.entity
  }

  private getConfiguredTemperaturePrecision (entityName: string | undefined): number {
    if (!this.config.show_decimal) return 0
    if (entityName) {
      const temperatureEntity = (this.hass as any).entities[entityName]
      return temperatureEntity.display_precision ?? 0
    }
    return 0
  }

  private toConfiguredTempWithUnit (unit: TemperatureUnit, temp: number, precision: number): string {
    const convertedTemp = precision === 0 ? Math.round(this.toConfiguredTempWithoutUnit(unit, temp)) : this.toConfiguredTempWithoutUnit(unit, temp).toFixed(precision)
    return convertedTemp + this.getConfiguredTemperatureUnit()
  }

  private toConfiguredTempWithoutUnit (unit: TemperatureUnit, temp: number): number {
    const configuredUnit = this.getConfiguredTemperatureUnit()
    if (configuredUnit === unit) {
      return temp
    }

    return unit === '°C'
      ? this.toFahrenheit(unit, temp)
      : this.toCelsius(unit, temp)
  }

  private calculateBarRangePercents (minTemp: number, maxTemp: number, minTempDay: number, maxTempDay: number): { startPercent: number, endPercent: number } {
    if (maxTemp === minTemp) {
      // avoid division by 0
      return { startPercent: 0, endPercent: 100 }
    }
    const startPercent = (100 / (maxTemp - minTemp)) * (minTempDay - minTemp)
    const endPercent = (100 / (maxTemp - minTemp)) * (maxTempDay - minTemp)
    // fix floating point issue
    // (100 / (19 - 8)) * (19 - 8) = 100.00000000000001
    return {
      startPercent: Math.max(0, startPercent),
      endPercent: Math.min(100, endPercent)
    }
  }

  private localize (key: string): string {
    return localize(key, this.getLocale())
  }

  private getDefaultForecasts (maxRowsCount: number, hourly: boolean): WeatherForecast[] {
    const forecasts: WeatherForecast[] = []
    for (let i = 0; i < maxRowsCount; i++) {
      forecasts.push(this.getDefaultForecast(hourly, i))
    }
    return forecasts
  }

  private getDefaultForecast (hourly: boolean, index: number): WeatherForecast {
    let thisDate = this.currentDate
    if (hourly) {
      thisDate = thisDate.plus({ hours: index })
    } else {
      thisDate = thisDate.plus({ days: index })
    }
    const returnForecast: WeatherForecast = {
      datetime: thisDate.toString(),
      condition: 'loading',
      temperature: 0,
      templow: 0,
      precipitation: 0,
      precipitation_probability: 0,
      isdefault: true
    }
    return returnForecast
  }

  private mergeForecasts (maxRowsCount: number, hourly: boolean): MergedWeatherForecast[] {
    const forecasts = this.isLegacyWeather() ? this.getWeather().attributes.forecast ?? [] : this.forecasts ?? this.getDefaultForecasts(maxRowsCount, hourly)
    const agg = forecasts.reduce<Record<number, WeatherForecast[]>>((forecasts, forecast) => {
      const d = new Date(forecast.datetime)
      const unit = hourly ? `${d.getMonth()}-${d.getDate()}-${+d.getHours()}` : d.getDate()
      forecasts[unit] = forecasts[unit] || []
      forecasts[unit].push(forecast)
      return forecasts
    }, {})

    return Object.values(agg)
      .reduce((agg: MergedWeatherForecast[], forecasts) => {
        if (forecasts.length === 0) return agg
        const avg = this.calculateAverageForecast(forecasts)
        agg.push(avg)
        return agg
      }, [])
      .sort((a, b) => a.datetime.toMillis() - b.datetime.toMillis())
      .slice(0, maxRowsCount)
  }

  private toZonedDate (date: DateTime): DateTime {
    const localizedDate = date.setLocale(this.getLocale())
    if (this.config.use_browser_time) return localizedDate
    const timeZone = this.config.time_zone ?? this.hass?.config?.time_zone
    const withTimeZone = localizedDate.setZone(timeZone)
    if (withTimeZone.isValid) {
      return withTimeZone
    }
    console.error(`bolder-weather-card - Time Zone [${timeZone}] not supported. Falling back to browser time.`)
    return localizedDate
  }

  private calculateAverageForecast (forecasts: WeatherForecast[]): MergedWeatherForecast {
    const minTemps = forecasts.map((f) => f.templow ?? f.temperature ?? this.getCurrentTemperature() ?? 0)
    const minTemp = min(minTemps)

    const maxTemps = forecasts.map((f) => f.temperature ?? this.getCurrentTemperature() ?? 0)
    const maxTemp = max(maxTemps)

    const precipitationProbabilities = forecasts.map((f) => f.precipitation_probability ?? 0)
    const precipitationProbability = max(precipitationProbabilities)

    const precipitations = forecasts.map((f) => f.precipitation ?? 0)
    const precipitation = max(precipitations)

    const conditions = forecasts.map((f) => f.condition)
    const condition = extractMostOccuring(conditions)

    const isDefaults = forecasts.map((f) => f.isdefault)
    const isDefault = extractMostOccuring(isDefaults)

    return {
      temperature: maxTemp,
      templow: minTemp,
      datetime: this.parseDateTime(forecasts[0].datetime),
      condition,
      precipitation_probability: precipitationProbability,
      precipitation,
      isdefault: isDefault
    }
  }

  private async subscribeForecastEvents (): Promise<void> {
    if (this.forecastSubscriberLock) {
      return
    }
    this.forecastSubscriberLock = true
    await this.unsubscribeForecastEvents()
    if (this.isLegacyWeather()) {
      this.forecastSubscriber = async () => {}
      this.forecastSubscriberLock = false
      return
    }

    if (!this.isConnected || !this.config || !this.hass) {
      this.forecastSubscriberLock = false
      return
    }

    const forecastType = this.determineForecastType()
    if (forecastType === 'hourly_not_supported') {
      this.forecastSubscriber = async () => {}
      this.forecastSubscriberLock = false
      throw this.createError(`Weather entity [${this.config.entity}] does not support hourly forecast.`)
    }
    try {
      const callback = (event: WeatherForecastEvent): void => {
        this.forecasts = event.forecast
      }
      const options = { resubscribe: false }
      const message = {
        type: 'weather/subscribe_forecast',
        forecast_type: forecastType,
        entity_id: this.config.entity
      }
      this.forecastSubscriber = await this.hass.connection.subscribeMessage<WeatherForecastEvent>(callback, message, options)
    } catch (e: unknown) {
      console.error('bolder-weather-card - Error when subscribing to weather forecast', e)
    } finally {
      this.forecastSubscriberLock = false
    }
  }

  private async unsubscribeForecastEvents (): Promise<void> {
    if (this.forecastSubscriber) {
      try {
        await this.forecastSubscriber()
      } catch (e: unknown) {
        // swallow error, as this means that connection was closed already
      } finally {
        this.forecastSubscriber = undefined
      }
    }
  }

  private isLegacyWeather (): boolean {
    return !this.supportsFeature(WeatherEntityFeature.FORECAST_DAILY) && !this.supportsFeature(WeatherEntityFeature.FORECAST_HOURLY)
  }

  private supportsFeature (feature: WeatherEntityFeature): boolean {
    try {
      return (this.getWeather().attributes.supported_features & feature) !== 0
    } catch (e) {
      // might be that weather entity was not found
      return false
    }
  }

  private createError (errorString: string): Error {
    const error = new Error(errorString)
    const errorCard = document.createElement('hui-error-card')
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config
    })
    this.error = html`${errorCard}`
    return error
  }

  private determineForecastType (): 'hourly' | 'daily' | 'hourly_not_supported' {
    const supportsDaily = this.supportsFeature(WeatherEntityFeature.FORECAST_DAILY)
    const supportsHourly = this.supportsFeature(WeatherEntityFeature.FORECAST_HOURLY)
    const hourly = this.config.hourly_forecast
    if (supportsDaily && supportsHourly) {
      return hourly ? 'hourly' : 'daily'
    } else if (hourly && supportsHourly) {
      return 'hourly'
    } else if (!hourly && supportsDaily) {
      return 'daily'
    } else if (hourly && !supportsHourly) {
      return 'hourly_not_supported'
    } else {
      // !hourly && !supportsDaily
      console.warn(`bolder-weather-card - Weather entity [${this.config.entity}] does not support daily forecast. Falling back to hourly forecast.`)
      return 'hourly'
    }
  }

  private parseDateTime (date: string): DateTime {
    const fromIso = DateTime.fromISO(date)
    if (fromIso.isValid) {
      return fromIso
    }
    return DateTime.fromJSDate(new Date(date))
  }

  private getStyleOverrideFromConfig (styles: StyleItem[]): CSSResult {
    const styleLines: string[] = styles.map((s) => s.variable.startsWith('bolder-weather-card-') ? `--${s.variable}_internal: ${s.value} !important;` : `--bolder-weather-card-${s.variable}_internal: ${s.value} !important;`)
    const tempDotStyle: string = this.config.show_dots_between_primary_elements ? '' : '.temp-dot{ width: 0px !important; border: none !important; }'
    return css`:host { ${unsafeCSS(styleLines.join('\n'))} } ${unsafeCSS(tempDotStyle)}`
  }
}
