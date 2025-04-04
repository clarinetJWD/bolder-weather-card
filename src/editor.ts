import { LitElement, html, nothing } from 'lit';
import {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
  fireEvent,
} from 'custom-card-helpers';
import localize from './localize/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { Template, BolderWeatherCardConfig } from './types';
//import styles from './editor.css';

type ConfigElement = HTMLInputElement & {
  configValue?: keyof BolderWeatherCardConfig;
};

@customElement('bolder-weather-card-editor')
export class BolderWeatherCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: Partial<BolderWeatherCardConfig>;

  @state() private show_humidity = false;
  @state() private show_name = true;
  @state() private show_status = true;
  @state() private show_toolbar = true;
  @state() private animated = true;

  setConfig(config: LovelaceCardConfig & BolderWeatherCardConfig): void {
    this.config = config;

    if (!this.config.entity) {
      this.config.entity = this.getEntitiesByType('weather')[0] || '';
      fireEvent(this, 'config-changed', { config: this.config });
    }
  }

  private getEntitiesByType(type: string, deviceClass?: string): string[] {
    if (!this.hass) {
      return [];
    }

    const entities = Object.keys(this.hass.states).filter((id) =>
      id.startsWith(type),
    );

    if (deviceClass) {
      return entities.filter(
        (id) => this.hass?.states[id]?.attributes?.device_class === deviceClass,
      );
    }

    return entities;
  }

  protected getLocale (): string {
    return this.config.locale ?? this.hass.locale.language ?? 'en-GB'
  }

  private renderDropdownMenu(
    configValue: string,
    selectedEntity: string | undefined,
    entities: string[],
  ) {
    return html`
      <div class="option">
        <ha-select
          .label=${localize('editor.' + configValue, this.getLocale())}
          @selected=${this.valueChanged}
          .configValue=${configValue}
          .value=${selectedEntity}
          @closed=${(e: Event) => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
        ><mwc-list-item .value=''></mwc-list-item>
          ${entities.map(
            (entity) =>
              html` <mwc-list-item .value=${entity}>${entity}</mwc-list-item>`,
          )}
        </ha-select>
      </div>
    `;
  }

  protected computeLabel(schema) {
    return localize("editor." + schema.name, schema.locale);
  }


  protected render(): Template {
    if (!this.hass) {
      return nothing;
    }

    const weatherEntities = this.getEntitiesByType('weather');
    const sunEntities = this.getEntitiesByType('sun');
    const sensorEntities = this.getEntitiesByType('sensor');

    return html`
      <ha-form
      .hass=${this.hass}
      .data=${this.config}
      .schema=${[
        { name: 'entity', locale: this.getLocale(), selector: { entity: { domain: 'weather' } } },
        { name: 'title', locale: this.getLocale(), selector: { text: {} } },
        { name: 'use_day_night_colors', locale: this.getLocale(), selector: { boolean: {} } },
        { name: 'sun_entity', locale: this.getLocale(), selector: { entity: { domain: 'sun' } } },
        { name: 'temperature_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
        { name: 'humidity_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
        { name: 'apparent_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
        { name: 'aqi_sensor', locale: this.getLocale(), selector: { entity: { domain: 'sensor' } } },
        { name: 'forecast_rows', locale: this.getLocale(), selector: { text: { type: 'number' } } },
        { name: 'locale', locale: this.getLocale(), selector: { text: {} } },
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
        { name: 'time_zone', locale: this.getLocale(), selector: { text: {} }},
        { name: 'time_pattern', locale: this.getLocale(), selector: { text: {} }},
        { name: 'date_pattern', locale: this.getLocale(), selector: { text: {} }},
        { name: 'hide_today_section', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'hide_forecast_section', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'show_humidity', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'hourly_forecast', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'hide_clock', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'hide_date', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'use_browser_time', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'show_decimal', locale: this.getLocale(), selector: { boolean: {} }},
        { name: 'aqi_use_color', locale: this.getLocale(), selector: { boolean: {} }}
      ]}
      .computeLabel=${this.computeLabel}
      @value-changed=${this.valueChanged} 
      ></ha-form>
    `;
  }

  private valueChanged(event): void {
    if (!this.config || !this.hass) {
        return;
      }
      const _config = Object.assign({}, this.config);
      _config.entity = event.detail.value.entity;
      _config.apparent_sensor = event.detail.value.apparent_sensor;
      _config.aqi_sensor = event.detail.value.aqi_sensor;
      _config.aqi_use_color = event.detail.value.aqi_use_color;
      _config.date_pattern = event.detail.value.date_pattern;
      _config.forecast_rows = event.detail.value.forecast_rows;
      _config.hide_clock = event.detail.value.hide_clock;
      _config.hide_date = event.detail.value.hide_date;
      _config.hide_forecast_section = event.detail.value.hide_forecast_section;
      _config.hide_today_section = event.detail.value.hide_today_section;
      _config.hourly_forecast = event.detail.value.hourly_forecast;
      _config.humidity_sensor = event.detail.value.humidity_sensor;
      _config.index = event.detail.value.index;
      _config.locale = event.detail.value.locale;
      _config.show_decimal = event.detail.value.show_decimal;
      _config.show_humidity = event.detail.value.show_humidity;
      _config.sun_entity = event.detail.value.sun_entity;
      _config.temperature_sensor = event.detail.value.temperature_sensor;
      _config.time_format = event.detail.value.time_format;
      _config.time_pattern = event.detail.value.time_pattern;
      _config.time_zone = event.detail.value.time_zone;
      _config.title = event.detail.value.title;
      _config.type = event.detail.value.type;
      _config.use_browser_time = event.detail.value.use_browser_time;
      _config.use_day_night_colors = event.detail.value.use_day_night_colors;
      _config.view_index = event.detail.value.view_index;

      this.config = _config;

      const ev = new CustomEvent('config-changed', {
        detail: { config: _config },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(ev);

  }

}
