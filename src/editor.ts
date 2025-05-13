import { LitElement, html, nothing } from 'lit'
import {
  type HomeAssistant,
  type LovelaceCardConfig,
  type LovelaceCardEditor,
  fireEvent
} from 'custom-card-helpers'
import localize from './localize/localize'
import { customElement, property, state } from 'lit/decorators.js'
import type { Template, BolderWeatherCardConfig } from './types'
// import styles from './editor.css'

@customElement('bolder-weather-card-editor')
export class BolderWeatherCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant

  @state() private config!: Partial<BolderWeatherCardConfig>

  setConfig (config: LovelaceCardConfig & BolderWeatherCardConfig): void {
    this.config = config

    if (!this.config.entity) {
      this.config.entity = this.getEntitiesByType('weather')[0] || ''
      fireEvent(this, 'config-changed', { config: this.config })
    }
  }

  private getEntitiesByType (type: string, deviceClass?: string): string[] {
    if (!this.hass) {
      return []
    }

    const entities = Object.keys(this.hass.states).filter((id) =>
      id.startsWith(type)
    )

    if (deviceClass) {
      return entities.filter(
        (id) => this.hass?.states[id]?.attributes?.device_class === deviceClass
      )
    }

    return entities
  }

  protected getLocale (): string {
    return this.config.locale ?? this.hass.locale.language ?? 'en-GB'
  }

  protected computeLabel (schema): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return localize('editor.' + schema.name, schema.locale)
  }

  protected render (): Template {
    if (!this.hass) {
      return nothing
    }

    return html`
      <ha-form
      .hass=${this.hass}
      .data=${this.config}
      .schema=${[
        {
          title: localize('editor.basic_settings', this.getLocale()),
          type: 'expandable' as const,
          flatten: true,
          expanded: true,
          locale: this.getLocale(),
          schema: [
            { name: 'entity', locale: this.getLocale(), selector: { entity: { domain: 'weather' } } },
            { name: 'title', locale: this.getLocale(), selector: { text: {} } },
            { name: 'sun_entity', locale: this.getLocale(), selector: { entity: { domain: 'sun' } } },
            { name: 'use_day_night_colors', locale: this.getLocale(), selector: { boolean: {} } }
          ]
        },
        {
          title: localize('editor.weather_sensor_settings', this.getLocale()),
          type: 'expandable' as const,
          flatten: false,
          expanded: false,
          locale: this.getLocale(),
          schema: [
            { name: 'temperature_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
            { name: 'humidity_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
            { name: 'apparent_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
            {
              title: localize('editor.aqi_settings', this.getLocale()),
              type: 'expandable' as const,
              flatten: false,
              expanded: true,
              locale: this.getLocale(),
              schema: [
                { name: 'aqi_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
                { name: 'aqi_use_color', locale: this.getLocale(), selector: { boolean: {} } }
              ]
            },
            {
              title: localize('editor.uv_settings', this.getLocale()),
              type: 'expandable' as const,
              flatten: false,
              expanded: true,
              locale: this.getLocale(),
              schema: [
                { name: 'uv_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
                { name: 'uv_use_color', locale: this.getLocale(), selector: { boolean: {} } }
              ]
            }
          ]
        },
        {
          title: localize('editor.time_and_date_settings', this.getLocale()),
          type: 'expandable' as const,
          flatten: false,
          expanded: false,
          locale: this.getLocale(),
          schema: [
            {
              name: 'time_format',
              locale: this.getLocale(),
              selector: {
                select: {
                  multiple: false,
                  options: [
                    { label: '24', value: '24' },
                    { label: '12', value: '12' }
                  ]
                }
              }
            },
            { name: 'time_zone', locale: this.getLocale(), selector: { text: {} } },
            { name: 'time_pattern', locale: this.getLocale(), selector: { text: {} } },
            { name: 'date_pattern', locale: this.getLocale(), selector: { text: {} } }
          ]
        },
        {
          title: localize('editor.hidden_item_settings', this.getLocale()),
          type: 'expandable' as const,
          flatten: false,
          expanded: false,
          locale: this.getLocale(),
          schema: [
            { name: 'hide_today_section', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'hide_forecast_section', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'hide_clock', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'hide_date', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'show_humidity', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'show_decimal', locale: this.getLocale(), selector: { boolean: {} } }
          ]
        },
        {
          title: localize('editor.forecast_settings', this.getLocale()),
          type: 'expandable' as const,
          flatten: false,
          expanded: false,
          locale: this.getLocale(),
          schema: [
            { name: 'hide_forecast_section', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'hourly_forecast', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'forecast_rows', locale: this.getLocale(), selector: { text: { type: 'number' } } }
          ]
        },
        {
          title: localize('editor.advanced_settings', this.getLocale()),
          type: 'expandable' as const,
          flatten: false,
          expanded: false,
          locale: this.getLocale(),
          schema: [
            { name: 'locale', locale: this.getLocale(), selector: { text: {} } },
            { name: 'use_time_as_primary', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'show_low_high_on_primary', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'show_dots_between_primary_elements', locale: this.getLocale(), selector: { boolean: {} } },
            { name: 'use_browser_time', locale: this.getLocale(), selector: { boolean: {} } }
          ]
        }
      ]}
      .computeLabel=${(schema) => this.computeLabel(schema)}
      @value-changed=${(event) => { this.valueChanged(event) }}
      ></ha-form>
    `
  }

  private valueChanged (event): void {
    if (!this.config || !this.hass) {
      return
    }
    const _config = Object.assign({}, this.config)
    _config.entity = event.detail.value.entity
    _config.apparent_sensor = event.detail.value.apparent_sensor
    _config.aqi_sensor = event.detail.value.aqi_sensor
    _config.aqi_use_color = event.detail.value.aqi_use_color
    _config.uv_sensor = event.detail.value.uv_sensor
    _config.uv_use_color = event.detail.value.uv_use_color
    _config.date_pattern = event.detail.value.date_pattern
    _config.forecast_rows = event.detail.value.forecast_rows
    _config.hide_clock = event.detail.value.hide_clock
    _config.use_time_as_primary = event.detail.value.use_time_as_primary
    _config.show_low_high_on_primary = event.detail.value.show_low_high_on_primary
    _config.show_dots_between_primary_elements = event.detail.value.show_dots_between_primary_elements
    _config.hide_date = event.detail.value.hide_date
    _config.hide_forecast_section = event.detail.value.hide_forecast_section
    _config.hide_today_section = event.detail.value.hide_today_section
    _config.hourly_forecast = event.detail.value.hourly_forecast
    _config.humidity_sensor = event.detail.value.humidity_sensor
    _config.index = event.detail.value.index
    _config.locale = event.detail.value.locale
    _config.show_decimal = event.detail.value.show_decimal
    _config.show_humidity = event.detail.value.show_humidity
    _config.sun_entity = event.detail.value.sun_entity
    _config.temperature_sensor = event.detail.value.temperature_sensor
    _config.time_format = event.detail.value.time_format
    _config.time_pattern = event.detail.value.time_pattern
    _config.time_zone = event.detail.value.time_zone
    _config.title = event.detail.value.title
    _config.type = event.detail.value.type
    _config.use_browser_time = event.detail.value.use_browser_time
    _config.use_day_night_colors = event.detail.value.use_day_night_colors
    _config.view_index = event.detail.value.view_index
    _config.gradient_stops = event.detail.value.gradient_stops
    _config.styles = event.detail.value.styles

    this.config = _config

    const ev = new CustomEvent('config-changed', {
      detail: { config: _config },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(ev)
  }
}
