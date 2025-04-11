# Bolder Weather Card

A [Home Assistant Dashboard Card](https://www.home-assistant.io/dashboards/) available through the [Home Assistant Community Store](https://hacs.xyz)
showing the current date, time and a weather forecast in a bold style suitable for viewing from a distance.

![Bolder Weather Card](https://github.com/user-attachments/assets/030d0f77-f940-4818-bb01-969a96b34571)

Credits go to [pkissling](https://github.com/pkissling) for the initial [Clock Weather Card](https://github.com/pkissling/clock-weather-card) that this project is based on, and [basmilius](https://github.com/basmilius) for the awesome [weather icons](https://github.com/basmilius/weather-icons). Many icons were modified by me to better suit this card.


## FAQ

* [Why don't I see the current day in my weather forecast?](#why-dont-i-see-the-current-day-in-my-weather-forecast)
* [What does the card actually display?](#what-does-the-card-actually-display)

### Why don't I see the current day in my weather forecast?

Your weather provider may not provide today's weather as part of their weather forecast. You may consider switching to a different weather provider.
[OpenWeatherMap](https://www.home-assistant.io/integrations/openweathermap/) is one of the weather integrations providing today's weather.

### What does the card actually display?

![Bolder Weather Card](https://github.com/user-attachments/assets/030d0f77-f940-4818-bb01-969a96b34571)

The bars represent the temperature range for a given day.
In the above image, the 47° on Tuesday represents the low across all of the forecast days and the 85° represents the highs (i.e. all bars are from 47° to 85°).
The colored portion of the bar represents the range of temperatures that are forecast for that day (so 77° to 85° on Friday).
The circle represents the current temperature (85° or the maximum for Friday).

_Thanks to @deprecatedcoder for this text from [#143](https://github.com/pkissling/clock-weather-card/issues/143)_

The basic idea of the forecast bars is to be able to understand the weather trend for the upcoming days in a single glance.

## Installation

### Manual Installation

1. Download the [bolder-weather-card](https://www.github.com/clarinetJWD/bolder-weather-card/releases/latest/download/bolder-weather-card.js).
2. Place the file in your Home Assistant's `config/www` folder.
3. Add the configuration to your `ui-lovelace.yaml`.

   ```yaml
   resources:
     - url: /local/bolder-weather-card.js
       type: module
   ```

4. Add [configuration](#configuration) for the card in your `ui-lovelace.yaml`.

### Installation and tracking with `hacs`

1. Make sure the [HACS](https://github.com/custom-components/hacs) component is installed and working.
2. Add this repository as a custom repository `https://www.github.com/clarinetJWD/bolder-weather-card/`
3. Search for `bolder-weather-card` in HACS and install it.
4. Depening on whether you manage your Lovelace resources via YAML (4i) or UI (4ii), you have to add the corresponding resources.
   1. **YAML:** Add the configuration to your `ui-lovelace.yaml`.

      ```yaml
      resources:
        - url: /hacsfiles/bolder-weather-card/bolder-weather-card.js
          type: module
      ```

   2. **UI:** Add Lovelace resource [![My Home Assistant](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources).
      _(Alternatively go to Settings -> Dashboards -> Resources -> Add Resource)_

      ```yaml
      URL: /hacsfiles/bolder-weather-card/bolder-weather-card.js
      Type: JavaScript Module
      ```

5. Restart Home Assistant (if manual configuration was needed).
6. Add [configuration](#configuration) for the card in your `ui-lovelace.yaml` or via the UI.

## Configuration

### Minimal configuration

```yaml
type: custom:bolder-weather-card
entity: weather.home  # replace with your weather providers's entity id
```

### Full configuration

```yaml
type: custom:bolder-weather-card
entity: weather.home  # replace with your weather providers's entity id
title: Home
sun_entity: sun.sun
temperature_sensor: sensor.outdoor_temp
humidity_sensor: sensor.outdoor_humidity
forecast_rows: 5
locale: en-US
time_pattern: HH:mm
time_format: 24
date_pattern: ccc, d.MM.yy
hide_today_section: false
hide_forecast_section: false
show_humidity: false
hide_clock: false
hide_date: false
hourly_forecast: false
use_browser_time: false
time_zone: null
show_decimal: false
apparent_sensor: sensor.real_feel_temperature
aqi_sensor: sensor.air_quality_index
aqi_use_color: false
uv_sensor: sensor.uv_index
uv_use_color: false
use_day_night_colors: true
use_time_as_primary: false
```

### Options

| Name                  | Type             | Requirement  | Description                                                                                                                                                                                                                       | Default   |
| --------------------- | ---------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| type                  | string           | **Required** | `custom:clock-weather-card`                                                                                                                                                                                                       |           |
| entity                | string           | **Required** | ID of the weather entity                                                                                                                                                                                                          |           |
| title                 | string           | **Optional** | Title of the card                                                                                                                                                                                                                 | `''`      |
| sun_entity            | boolean          | **Optional** | ID of the sun entity. Used to determine whether to show a day or night icon. If sun integration is not enabled, day icon will be shown                                                                                            | `sun.sun` |
| temperature_sensor    | string           | **Optional** | ID of the temperature sensor entity. Used to show the current temperature based on a sensor value instead of the weather forecast                                                                                                 | `''`      |
| humidity_sensor       | string           | **Optional** | ID of the humidity sensor entity. Used to show the current humidity based on a sensor value, if `show_humidity` is set to `true`                                                                                                  | `''`      |
| forecast_rows         | number           | **Optional** | The amount of weather forecast rows to show. Depending on `hourly_forecast` each row either corresponds to a day or an hour                                                                                                       | `5`       |
| locale                | string[^2]       | **Optional** | Language to use for language specific text and date/time formatting. If not provided, falls back to the locale set in HA or, if not set in HA, to `en-GB`                                                                         | `en-GB`   |
| time_format           | `24` \| `12`     | **Optional** | Format used to display the time. If not provided, falls back to the default time format of the configured `locale`.  This option is ignored if `time_pattern` is set.                                                             | `24`      |
| time_pattern          | string           | **Optional** | Pattern to use for time formatting. See [luxon](https://moment.github.io/luxon/#/formatting?id=table-of-tokens) for valid tokens. If not provided, falls back to time_format option.                                              | `null`    |
| date_pattern          | string           | **Optional** | Pattern to use for date formatting. If not provided, falls back to a localized default date formatting. See [luxon](https://moment.github.io/luxon/#/formatting?id=table-of-tokens) for valid tokens                              | `D`       |
| show_humidity         | boolean          | **Optional** | Shows the humidity in the today section. Reads the value from `humidity_sensor`, if provided, otherwise from the `humidity` attribute of the configured weather `entity`                                                          | `false`   |
| hide_today_section    | boolean          | **Optional** | Hides the cards today section (upper section), containing the large weather icon, clock and current date                                                                                                                          | `false`   |
| hide_forecast_section | boolean          | **Optional** | Hides the cards forecast section (lower section),containing the weather forecast                                                                                                                                                  | `false`   |
| use_time_as_primary   | boolean          | **Optional** | Swaps the position of the time and temperature.                                                                                                                                                                                   | `false`   |
| hide_clock            | boolean          | **Optional** | Hides the clock from the today section and prominently displays the current temperature instead                                                                                                                                   | `false`   |
| hide_date             | boolean          | **Optional** | Hides the date from the today section                                                                                                                                                                                             | `false`   |
| hourly_forecast       | boolean          | **Optional** | Displays an hourly forecast instead of daily                                                                                                                                                                                      | `false`   |
| use_browser_time      | boolean          | **Optional** | Uses the time from your browser to indicate the current time. If not provided, uses the [time_zone](https://www.home-assistant.io/blog/2015/05/09/utc-time-zone-awareness/#setting-up-your-time-zone) configured in HA            | `false`   |
| time_zone             | string           | **Optional** | Uses the given [time zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) to indicate the current date and time. If not provided, uses the time zone configured in HA                                              | `null`    |
| show_decimal          | boolean          | **Optional** | Displays main temperature without rounding                                                                                                                                                                                        | `false`   |
| apparent_sensor       | string           | **Optional** | ID of the apparent temperature sensor entity. It is used to show the apparent temperature based on a sensor and will only show it if value is provided.                                                                           | `''`      |
| aqi_sensor            | string           | **Optional** | ID of the Air Quality Index sensor entity. It is used to show the AQI based on a sensor and will only show it if value is provided.                                                                                               | `''`      |
| aqi_use_color         | boolean          | **Optional** | When true, the AQI text is colored. When false, it uses the normal bottom text color.                                                                                                                                             | `true`    |
| uv_sensor             | string           | **Optional** | ID of the UV Index sensor entity. It is used to show the UV based on a sensor and will only show it if value is provided.                                                                                                         | `''`      |
| uv_use_color          | boolean          | **Optional** | When true, the UV text is colored. When false, it uses the normal bottom text color.                                                                                                                                              | `true`    |
| use_day_night_colors  | boolean          | **Optional** | When ture, the card uses day night colors (blue, dark blue) and text colors to match. When false, uses your theme's normal colors.                                                                                                | `true`    |

## Theme Variables
Almost every aspect of this card can be modified using theme variables (and without card-mod).

Just add a line to your theme's yaml file with the variable name and value to override the default:
```yaml
bolder-weather-card-background: red # makes the card red when use_day_night_colors is off.
```

Notes:
* Fallback 1, Fallback 2, and Default are the variables and values that it will use if that line's variable is not defined.
* Most "Color" variables have three varieties: a normal one, one ending in "-day", and one ending in "-night". The one without "day/night" is used when use_day_night_colors is off. When use_day_night_colorsis on, the "-day" version is used during the daytime, and the "-night" one is used at night, determined by your `sun` entity.

### Overall Card Variables
| Variable              | Description                                                    | Fallback 1   | Fallback 2   | Default   |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------ | ------------ | --------- |
| bolder-weather-card-today-height | The height of the Today section at the top of the card. ||| Auto-Size |
| bolder-weather-card-background | The background color of the card when `use_day_night_colors` is off. ||| --ha-card-background |
| bolder-weather-card-background-day | The background color of the card during daytime when `use_day_night_colors` is on. ||| rgb(47, 152, 234) |
| bolder-weather-card-background-night | The background color of the card during nighttime when `use_day_night_colors` is on. ||| rgb(15, 56, 118) |
||||||
| bolder-weather-card-border-color | The border color of the card when `use_day_night_colors` is off. | --ha-card-border-color | --divider-color | #e0e0e0 |
| bolder-weather-card-border-color-day | The border color of the card during daytime when `use_day_night_colors` is on. ||| rgba(0,0,0,0.03) |
| bolder-weather-card-border-color-night | The border color of the card during nighttime when `use_day_night_colors` is on. ||| rgba(255,255,255,0.03) |
| bolder-weather-card-border-style | The card's border style. | --ha-card-border-style || solid |
| bolder-weather-card-border-width | The card's border width | --ha-card-border-width || 4px |
||||||
| bolder-weather-card-border-radius | The card's rounded corner radius. | --ha-card-border-radius || 0px |
| bolder-weather-card-box-shadow | the drop shadow behind the card ||| --ha-card-box-shadow |
| bolder-weather-card-padding | The internal padding between the card border and the contents. ||| 16px |

### Today Section Variables
| Variable              | Description                                                    | Fallback 1   | Fallback 2   | Default   |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------ | ------------ | --------- |
| **Today Image** |||||
||||||
| bolder-weather-card-today-image-max-width | The maximum width of the Today image, relative to the card. ||| 70% |
| bolder-weather-card-today-image-max-height | The maximum height of the Today image, relative to the Today section ||| 100% |
||||||
| **Primary Text** | Values for the primary text (temperature). ||||
||||||
| bolder-weather-card-primary-text-color | The main text color (temperature) when `use_day_night_colors` is off. ||| --primary-text-color |
| bolder-weather-card-primary-text-color-day | The main daytime text color (temperature) when `use_day_night_colors` is on. ||| white |
| bolder-weather-card-primary-text-color-night | The main nighttime text color (temperature) when `use_day_night_colors` is on. ||| white |
| bolder-weather-card-primary-text-outline-color | The main text outline color (temperature) when `use_day_night_colors` is off. ||| --bolder-weather-card-background |
| bolder-weather-card-primary-text-outline-color-day | The main text daytime outline color (temperature) when `use_day_night_colors` is on. ||| --bolder-weather-card-background-day |
| bolder-weather-card-primary-text-outline-color-night | The main text nighttime outline color (temperature) when `use_day_night_colors` is on. ||| --bolder-weather-card-background-night |
| bolder-weather-card-primary-text-size | The size of the main text. ||| 75pt |
| bolder-weather-card-primary-text-space-above | The extra padding above the main text. ||| 0px |
| bolder-weather-card-primary-text-space-below | The extra padding below the main text. ||| 10px |
||||||
| **Primary Text (Temperature Unit)** | Values for the Unit after the primary text. ||||
||||||
| bolder-weather-card-primary-unit-text-color | The temperature unit text color when `use_day_night_colors` is off. ||| --bolder-weather-card-primary-text-color |
| bolder-weather-card-primary-unit-text-color-day | The temperature unit text daytime color when `use_day_night_colors` is on. ||| white |
| bolder-weather-card-primary-unit-text-color-night | The temperature unit text nighttime color when `use_day_night_colors` is on. ||| white |
| bolder-weather-card-primary-unit-text-outline-color | The temperature unit outline color when `use_day_night_colors` is off. ||| --bolder-weather-card-primary-text-outline-color |
| bolder-weather-card-primary-unit-text-outline-color-day | The temperature unit outline daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-outline-color-day |
| bolder-weather-card-primary-unit-text-outline-color-night | The temperature unit outline nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-outline-color-night |
| bolder-weather-card-primary-unit-text-size | The size of the temperature unit text. ||| 30pt |
| bolder-weather-card-primary-unit-text-space-above | The extra padding above the temperature unit text. ||| calc(-1 * var(--bolder-weather-card-primary-unit-text-size_internal) / 2)) |
| bolder-weather-card-primary-unit-text-space-below | The extra padding below the temperature unit text. ||| 0px |
||||||
| **Secondary Text** | Default values for the text above and below the primary text. ||||
||||||
| bolder-weather-card-secondary-text-color | The secondary (top/bottom) text color when `use_day_night_colors` is off. ||| --secondary-text-color |
| bolder-weather-card-secondary-text-color-day | The secondary (top/bottom) text daytime color when `use_day_night_colors` is on. ||| white |
| bolder-weather-card-secondary-text-color-night | The secondary (top/bottom) text nighttime color when `use_day_night_colors` is on. ||| rgb(222, 222, 222) |
| bolder-weather-card-secondary-text-outline-color | The secondary (top/bottom) text outline color when `use_day_night_colors` is off. ||| --bolder-weather-card-primary-text-outline-color |
| bolder-weather-card-secondary-text-outline-color-day | The secondary (top/bottom) text outline daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-outline-color-day |
| bolder-weather-card-secondary-text-outline-color-night | The secondary (top/bottom) text outline nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-outline-color-night |
| bolder-weather-card-secondary-text-size | The secondary (top/bottom) text size. ||| 1.2rem |
| bolder-weather-card-secondary-text-space-above | The extra padding above the secondary (top/bottom) text. ||| 0px |
| bolder-weather-card-secondary-text-space-below | The extra padding below the secondary (top/bottom) text. ||| 0px |
||||||
| **Top Text** | Default values for the text above the primary text. ||||
||||||
| bolder-weather-card-top-text-color | The top text color when `use_day_night_colors` is off. ||| --bolder-weather-card-secondary-text-color |
| bolder-weather-card-top-text-color-day | The top text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-color-day |
| bolder-weather-card-top-text-color-night | The top text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-color-night |
| bolder-weather-card-top-text-outline-color | The top text outline color when `use_day_night_colors` is off. ||| --bolder-weather-card-secondary-text-outline-color |
| bolder-weather-card-top-text-outline-color-day | The top text outline daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-outline-color-day |
| bolder-weather-card-top-text-outline-color-night | The top text outline nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-outline-color-night |
| bolder-weather-card-top-text-size | The top text size. ||| --bolder-weather-card-secondary-text-size |
| bolder-weather-card-top-text-space-above | The extra padding above the top text. ||| --bolder-weather-card-secondary-text-space-above |
| bolder-weather-card-top-text-space-below | The extra padding below the top text. ||| --bolder-weather-card-secondary-text-space-below |
||||||
| **Bottom Text** | Default values for the text below the primary text. ||||
||||||
| bolder-weather-card-bottom-text-color | The bottom text color when `use_day_night_colors` is off. ||| --bolder-weather-card-secondary-text-color |
| bolder-weather-card-bottom-text-color-day | The bottom text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-color-day |
| bolder-weather-card-bottom-text-color-night | The bottom text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-color-night |
| bolder-weather-card-bottom-text-outline-color | The bottom text outline color when `use_day_night_colors` is off. ||| --bolder-weather-card-secondary-text-outline-color |
| bolder-weather-card-bottom-text-outline-color-day | The bottom text outline daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-outline-color-day |
| bolder-weather-card-bottom-text-outline-color-night | The bottom text outline nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-outline-color-night |
| bolder-weather-card-bottom-text-size | The bottom text size. ||| --bolder-weather-card-secondary-text-size |
| bolder-weather-card-bottom-text-space-above | The extra padding above the bottom text. ||| --bolder-weather-card-secondary-text-space-above |
| bolder-weather-card-bottom-text-space-below | The extra padding below the bottom text. ||| --bolder-weather-card-secondary-text-space-below |
||||||
| **State Text** | Default values for the state text below the bottom text. ||||
||||||
| bolder-weather-card-state-text-color | The state text color when `use_day_night_colors` is off. ||| --bolder-weather-card-secondary-text-color |
| bolder-weather-card-state-text-color-day | The state text daytime color when `use_day_night_colors` is on. ||| rgb(16, 56, 118) |
| bolder-weather-card-state-text-color-night | The state text nighttime color when `use_day_night_colors` is on. ||| rgb(222, 222, 222) |
| bolder-weather-card-state-text-outline-color | The state text outline color when `use_day_night_colors` is off. ||| --bolder-weather-card-secondary-text-outline-color |
| bolder-weather-card-state-text-outline-color-day | The state text outline daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-outline-color-day |
| bolder-weather-card-state-text-outline-color-night | The state text outline nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-secondary-text-outline-color-night |
| bolder-weather-card-state-text-size | The state text size. ||| 24pt |
| bolder-weather-card-state-text-space-above | The extra padding above the state text. ||| 0px |
| bolder-weather-card-state-text-space-below | The extra padding below the state text. ||| 10px |
||||||
| **AQI (Air Quality Index) Text** | Default values for the AQI text ||||
||||||
| bolder-weather-card-aqi-green-text-color | AQI Green text color when `use_day_night_colors` is off. ||| green |
| bolder-weather-card-aqi-green-text-color-day | AQI Green text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-green-text-color |
| bolder-weather-card-aqi-green-text-color-night | AQI Green text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-green-text-color |
| bolder-weather-card-aqi-yellowgreen-text-color | AQI YellowGreen text color when `use_day_night_colors` is off. ||| yellowgreen |
| bolder-weather-card-aqi-yellowgreen-text-color-day | AQI YellowGreen text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-yellowgreen-text-color |
| bolder-weather-card-aqi-yellowgreen-text-color-night | AQI YellowGreen text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-yellowgreen-text-color |
| bolder-weather-card-aqi-orange-text-color | AQI Orange text color when `use_day_night_colors` is off. ||| orange |
| bolder-weather-card-aqi-orange-text-color-day | AQI Orange text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-orange-text-color |
| bolder-weather-card-aqi-orange-text-color-night | AQI Orange text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-orange-text-color |
| bolder-weather-card-aqi-red-text-color | AQI Red text color when `use_day_night_colors` is off. ||| red |
| bolder-weather-card-aqi-red-text-color-day | AQI Red text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-red-text-color |
| bolder-weather-card-aqi-red-text-color-night | AQI  text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-red-text-color |
| bolder-weather-card-aqi-purple-text-color | AQI Purple text color when `use_day_night_colors` is off. ||| purple |
| bolder-weather-card-aqi-purple-text-color-day | AQI Purple text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-purple-text-color |
| bolder-weather-card-aqi-purple-text-color-night | AQI Purple text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-purple-text-color |
| bolder-weather-card-aqi-maroon-text-color | AQI Maroon text color when `use_day_night_colors` is off. ||| maroon |
| bolder-weather-card-aqi-maroon-text-color-day | AQI Maroon text daytime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-maroon-text-color |
| bolder-weather-card-aqi-maroon-text-color-night | AQI  text nighttime color when `use_day_night_colors` is on. ||| --bolder-weather-card-aqi-maroon-text-color |

### Title/Caption Section Variables
| Variable              | Description                                                    | Fallback 1   | Fallback 2   | Default   |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------ | ------------ | --------- |
| bolder-weather-card-title-text-color | The color of the Caption text when `use_day_night_colors` is off. ||| --bolder-weather-card-primary-text-color |
| bolder-weather-card-title-text-color-day | The daytime color of the Caption text when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-color-day |
| bolder-weather-card-title-text-color-night | The nighttime color of the Caption text when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-color-night |
| bolder-weather-card-title-text-outline-color | The outline color of the Caption text when `use_day_night_colors` is off. ||| --bolder-weather-card-primary-text-outline-color |
| bolder-weather-card-title-text-outline-color-day | The daytime outline color of the Caption text when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-outline-color-day |
| bolder-weather-card-title-text-outline-color-night | The nighttime outline color of the Caption text when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-outline-color-night |
| bolder-weather-card-title-text-size | The title text font size. ||| --ha-card-header-font-size |  ||| 24px |
| bolder-weather-card-title-text-font-weight | The title text font weight. ||| 400 |
| bolder-weather-card-title-padding | The padding around the title text (between Today and Forecast sections). ||| 12px 16px 16px |

### Forecast Section Variables
| Variable              | Description                                                    | Fallback 1   | Fallback 2   | Default   |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------ | ------------ | --------- |
| **Main** |||||
||||||
| bolder-weather-card-forecast-background-color | The background color of the Forecast section when `use_day_night_colors` is off. ||| transparent |
| bolder-weather-card-forecast-background-color-day | The daytime background color of the Forecast section when `use_day_night_colors` is on. ||| --bolder-weather-card-forecast-background-color |
| bolder-weather-card-forecast-background-color-night | The nighttime background color of the Forecast section when `use_day_night_colors` is on. ||| --bolder-weather-card-forecast-background-color |
||||||
| bolder-weather-card-forecast-space-inside | The padding between the forecast section border and its inner contents. ||| --bolder-weather-card-padding |
| bolder-weather-card-forecast-space-outside | The padding between the outside of the forecast section and the card border.  ||| 0px |
| bolder-weather-card-forecast-border-radius | The rounded corner radius of the Forecast section. ||| calc(--bolder-weather-card-border-radius_internal) / 2) |
||||||
| **Layout** |||||
||||||
| bolder-weather-card-forecast-col-day-size | The width of the "Day" (or "Hour" in hourly mode) column. ||| 2.1rem |
| bolder-weather-card-forecast-col-icon-size | The width of the state icon column. ||| 2rem |
| bolder-weather-card-forecast-col-temp-low-size | The width of the temperature column for "Low". ||| 2.1rem |
| bolder-weather-card-forecast-col-temp-high-size | The width of the temperature column for "High". ||| 2.1rem |
| bolder-weather-card-forecast-grid-gap | The gap between lines. ||| 0.5rem |
||||||
| **Bar** |||||
||||||
| bolder-weather-card-forecast-bar-height | The height of the forecast temperature bars. ||| 1.5rem |
| bolder-weather-card-forecast-bar-background-color | The background color of the forcast temperature bars. ||| --bolder-weather-card-primary-text-color |
| bolder-weather-card-forecast-bar-background-opacity | The background opacity of the forecast temperature bars. ||| 0.1 |
| bolder-weather-card-forecast-bar-dot-border-width | The border width of the current temperature dot on the forecast bar. ||| 2px |
| bolder-weather-card-forecast-bar-dot-border-color | The border color of the current temperature dot on the forecast bar when `use_day_night_colors` is off. ||| --bolder-weather-card-background |
| bolder-weather-card-forecast-bar-dot-border-color-day | The nighttime border color of the current temperature dot on the forecast bar when `use_day_night_colors` is on. ||| --bolder-weather-card-background-day |
| bolder-weather-card-forecast-bar-dot-border-color-night | The daytime border color of the current temperature dot on the forecast bar when `use_day_night_colors` is on. ||| --bolder-weather-card-background-night |
| bolder-weather-card-forecast-bar-dot-background-color | The background color of the current temperature dot when `use_day_night_colors` is off. ||| --bolder-weather-card-primary-text-color |
| bolder-weather-card-forecast-bar-dot-background-color-day | The daytime background color of the current temperature dot when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-color-day |
| bolder-weather-card-forecast-bar-dot-background-color-night | The nighttime background color of the current temperature dot when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-color-night |
| bolder-weather-card-forecast-bar-dot-opacity | The opacity of the current temperature dot. ||| 0.75 |
||||||
| **Text** |||||
||||||
| bolder-weather-card-forecast-text-color | The text color for the labels in the Forecast section when `use_day_night_colors` is off. ||| --bolder-weather-card-primary-text-color |
| bolder-weather-card-forecast-text-color-day | The daytime text color for the labels in the Forecast section when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-color-day |
| bolder-weather-card-forecast-text-color-night | The nighttime text color for the labels in the Forecast section when `use_day_night_colors` is on. ||| --bolder-weather-card-primary-text-color-night |
| bolder-weather-card-forecast-text-outline-color | The text outline color for the labels in the Forecast section when `use_day_night_colors` is off. ||| --bolder-weather-card-background |
| bolder-weather-card-forecast-text-outline-color-day | The daytime text outline color for the labels in the Forecast section when `use_day_night_colors` is on. ||| --bolder-weather-card-background-day |
| bolder-weather-card-forecast-text-outline-color-night | The nighttime text outline color for the labels in the Forecast section when `use_day_night_colors` is on. ||| --bolder-weather-card-background-night |
    
## Footnotes

[^2]: Supported languages: `ar`, `bg`, `ca`, `cs`, `cy`, `da`, `de`, `el`,`en`, `es`, `et`, `fi`, `fr`, `he`, `hu`, `hr`, `id`, `is`, `it`, `ko`, `lb`, `lt`, `nb`, `nl`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sk`, `sl`, `sr`, `sr-Latn`, `sv`, `th`, `tr`, `uk`, `ur`, `vi`, `zh-CN`, `zh-TW`
