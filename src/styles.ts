export function GetCss (myVar: boolean): string {
  return `
${myVar ? ':host{}' : ':host{}'}
    :host {
      /*** Card Variables */
      --bolder-weather-card-today-height_internal: var(--bolder-weather-card-today-height, calc(var(--bolder-weather-card-primary-text-size_internal) + var(--bolder-weather-card-top-text-size_internal) + var(--bolder-weather-card-state-text-size_internal) + var(--bolder-weather-card-bottom-text-size_internal) + var(--bolder-weather-card-primary-text-space-above_internal) + var(--bolder-weather-card-primary-text-space-below_internal) + var(--bolder-weather-card-top-text-space-above_internal) + var(--bolder-weather-card-top-text-space-below_internal) + var(--bolder-weather-card-bottom-text-space-above_internal) + var(--bolder-weather-card-bottom-text-space-below_internal) + var(--bolder-weather-card-padding_internal) + var(--bolder-weather-card-padding_internal)));

      --bolder-weather-card-background_internal: var(--bolder-weather-card-background, var(--ha-card-background));
      --bolder-weather-card-background-day_internal: var(--bolder-weather-card-background-day, rgb(47, 152, 234));
      --bolder-weather-card-background-night_internal: var(--bolder-weather-card-background-night, rgb(15, 56, 118));

      --bolder-weather-card-border-color_internal: var(--bolder-weather-card-border-color, var(--ha-card-border-color, var(--divider-color, #e0e0e0)));
      --bolder-weather-card-border-color-day_internal: var(--bolder-weather-card-border-color-day, rgba(0,0,0,0.03));
      --bolder-weather-card-border-color-night_internal: var(--bolder-weather-card-border-color-night, rgba(255,255,255,0.03));
      --bolder-weather-card-border-style_internal: var(--bolder-weather-card-border-style, var(--ha-card-border-style, solid));
      --bolder-weather-card-border-width_internal: var(--bolder-weather-card-border-width, var(--ha-card-border-width, 4px));

      --bolder-weather-card-border-radius_internal: var(--bolder-weather-card-border-radius, var(--ha-card-border-radius, 0px));
      --bolder-weather-card-box-shadow_internal: var(--bolder-weather-card-box-shadow, var(--ha-card-box-shadow));
      --bolder-weather-card-padding_internal: var(--bolder-weather-card-padding, 16px);

      /*** Today Section Variables */
      /***     Today Image */
      --bolder-weather-card-today-image-max-width_internal: var(--bolder-weather-card-today-image-max-width, 70%);
      --bolder-weather-card-today-image-max-height_internal: var(--bolder-weather-card-today-image-max-height, 100%);

      /***     Primary Text */
      --bolder-weather-card-primary-text-color_internal: var(--bolder-weather-card-primary-text-color, var(--primary-text-color));
      --bolder-weather-card-primary-text-color-day_internal: var(--bolder-weather-card-primary-text-color-day, white);
      --bolder-weather-card-primary-text-color-night_internal: var(--bolder-weather-card-primary-text-color-night, white);
      --bolder-weather-card-primary-text-outline-color_internal: var(--bolder-weather-card-primary-text-outline-color, var(--bolder-weather-card-background_internal));
      --bolder-weather-card-primary-text-outline-color-day_internal: var(--bolder-weather-card-primary-text-outline-color-day, var(--bolder-weather-card-background-day_internal));
      --bolder-weather-card-primary-text-outline-color-night_internal: var(--bolder-weather-card-primary-text-outline-color-night, var(--bolder-weather-card-background-night_internal));
      --bolder-weather-card-primary-text-size_internal: var(--bolder-weather-card-primary-text-size, 75pt);
      --bolder-weather-card-primary-text-space-above_internal: var(--bolder-weather-card-primary-text-space-above, 0px);
      --bolder-weather-card-primary-text-space-below_internal: var(--bolder-weather-card-primary-text-space-below, 10px);
      --bolder-weather-card-primary-unit-text-color_internal: var(--bolder-weather-card-primary-unit-text-color, var(--bolder-weather-card-primary-text-color_internal));

      /***     Primary Text (Temperature Unit) */
      --bolder-weather-card-primary-unit-text-color-day_internal: var(--bolder-weather-card-primary-unit-text-color-day, white);
      --bolder-weather-card-primary-unit-text-color-night_internal: var(--bolder-weather-card-primary-unit-text-color-night, white);
      --bolder-weather-card-primary-unit-text-outline-color_internal: var(--bolder-weather-card-primary-unit-text-outline-color, var(--bolder-weather-card-primary-text-outline-color_internal));
      --bolder-weather-card-primary-unit-text-outline-color-day_internal: var(--bolder-weather-card-primary-unit-text-outline-color-day, var(--bolder-weather-card-primary-text-outline-color-day_internal));
      --bolder-weather-card-primary-unit-text-outline-color-night_internal: var(--bolder-weather-card-primary-unit-text-outline-color-night, var(--bolder-weather-card-primary-text-outline-color-night_internal));
      --bolder-weather-card-primary-unit-text-size_internal: var(--bolder-weather-card-primary-unit-text-size, 30pt);
      --bolder-weather-card-primary-unit-text-space-above_internal: var(--bolder-weather-card-primary-unit-text-space-above, calc(-1 * var(--bolder-weather-card-primary-unit-text-size_internal) / 2));
      --bolder-weather-card-primary-unit-text-space-below_internal: var(--bolder-weather-card-primary-unit-text-space-below, 0px);

      /***     Secondary Text (Top and Bottom Default) */
      --bolder-weather-card-secondary-text-color_internal: var(--bolder-weather-card-secondary-text-color, var(--secondary-text-color));
      --bolder-weather-card-secondary-text-color-day_internal: var(--bolder-weather-card-secondary-text-color-day, white);
      --bolder-weather-card-secondary-text-color-night_internal: var(--bolder-weather-card-secondary-text-color-night, rgb(222, 222, 222));
      --bolder-weather-card-secondary-text-outline-color_internal: var(--bolder-weather-card-secondary-text-outline-color, var(--bolder-weather-card-primary-text-outline-color_internal));
      --bolder-weather-card-secondary-text-outline-color-day_internal: var(--bolder-weather-card-secondary-text-outline-color-day, var(--bolder-weather-card-primary-text-outline-color-day_internal));
      --bolder-weather-card-secondary-text-outline-color-night_internal: var(--bolder-weather-card-secondary-text-outline-color-night, var(--bolder-weather-card-primary-text-outline-color-night_internal));
      --bolder-weather-card-secondary-text-size_internal: var(--bolder-weather-card-secondary-text-size, 1.2rem);
      --bolder-weather-card-secondary-text-space-above_internal: var(--bolder-weather-card-secondary-text-space-above, 0px);
      --bolder-weather-card-secondary-text-space-below_internal: var(--bolder-weather-card-secondary-text-space-below, 0px);

      /***     Top Text */
      --bolder-weather-card-top-text-color_internal: var(--bolder-weather-card-top-text-color, var(--bolder-weather-card-secondary-text-color_internal));
      --bolder-weather-card-top-text-color-day_internal: var(--bolder-weather-card-top-text-color-day, var(--bolder-weather-card-secondary-text-color-day_internal));
      --bolder-weather-card-top-text-color-night_internal: var(--bolder-weather-card-top-text-color-night, var(--bolder-weather-card-secondary-text-color-night_internal));
      --bolder-weather-card-top-text-outline-color_internal: var(--bolder-weather-card-top-text-outline-color, var(--bolder-weather-card-secondary-text-outline-color_internal));
      --bolder-weather-card-top-text-outline-color-day_internal: var(--bolder-weather-card-top-text-outline-color-day, var(--bolder-weather-card-secondary-text-outline-color-day_internal));
      --bolder-weather-card-top-text-outline-color-night_internal: var(--bolder-weather-card-top-text-outline-color-night, var(--bolder-weather-card-secondary-text-outline-color-night_internal));
      --bolder-weather-card-top-text-size_internal: var(--bolder-weather-card-top-text-size, var(--bolder-weather-card-secondary-text-size_internal));
      --bolder-weather-card-top-text-space-above_internal: var(--bolder-weather-card-top-text-space-above, var(--bolder-weather-card-secondary-text-space-above_internal));
      --bolder-weather-card-top-text-space-below_internal: var(--bolder-weather-card-top-text-space-below, var(--bolder-weather-card-secondary-text-space-below_internal));

      /***     Bottom Text */
      --bolder-weather-card-bottom-text-color_internal: var(--bolder-weather-card-bottom-text-color, var(--bolder-weather-card-secondary-text-color_internal));
      --bolder-weather-card-bottom-text-color-day_internal: var(--bolder-weather-card-bottom-text-color-day, var(--bolder-weather-card-secondary-text-color-day_internal));
      --bolder-weather-card-bottom-text-color-night_internal: var(--bolder-weather-card-bottom-text-color-night, var(--bolder-weather-card-secondary-text-color-night_internal));
      --bolder-weather-card-bottom-text-outline-color_internal: var(--bolder-weather-card-bottom-text-outline-color, var(--bolder-weather-card-secondary-text-outline-color_internal));
      --bolder-weather-card-bottom-text-outline-color-day_internal: var(--bolder-weather-card-bottom-text-outline-color-day, var(--bolder-weather-card-secondary-text-outline-color-day_internal));
      --bolder-weather-card-bottom-text-outline-color-night_internal: var(--bolder-weather-card-bottom-text-outline-color-night, var(--bolder-weather-card-secondary-text-outline-color-night_internal));
      --bolder-weather-card-bottom-text-size_internal: var(--bolder-weather-card-bottom-text-size, var(--bolder-weather-card-secondary-text-size_internal));
      --bolder-weather-card-bottom-text-space-above_internal: var(--bolder-weather-card-bottom-text-space-above, var(--bolder-weather-card-secondary-text-space-above_internal));
      --bolder-weather-card-bottom-text-space-below_internal: var(--bolder-weather-card-bottom-text-space-below, var(--bolder-weather-card-secondary-text-space-below_internal));

      /***     State Text */
      --bolder-weather-card-state-text-color_internal: var(--bolder-weather-card-state-text-color, var(--bolder-weather-card-secondary-text-color_internal));
      --bolder-weather-card-state-text-color-day_internal: var(--bolder-weather-card-state-text-color-day, rgb(16, 56, 118));
      --bolder-weather-card-state-text-color-night_internal: var(--bolder-weather-card-state-text-color-night, rgb(222, 222, 222));
      --bolder-weather-card-state-text-outline-color_internal: var(--bolder-weather-card-state-text-outline-color, var(--bolder-weather-card-secondary-text-outline-color_internal));
      --bolder-weather-card-state-text-outline-color-day_internal: var(--bolder-weather-card-state-text-outline-color-day, var(--bolder-weather-card-secondary-text-outline-color-day_internal));
      --bolder-weather-card-state-text-outline-color-night_internal: var(--bolder-weather-card-state-text-outline-color-night, var(--bolder-weather-card-secondary-text-outline-color-night_internal));
      --bolder-weather-card-state-text-size_internal: var(--bolder-weather-card-state-text-size, 24pt);
      --bolder-weather-card-state-text-space-above_internal: var(--bolder-weather-card-state-text-space-above, 0px);
      --bolder-weather-card-state-text-space-below_internal: var(--bolder-weather-card-state-text-space-below, 10px);

      /***     Colored Text */
      --bolder-weather-card-green-text-color_internal: var(--bolder-weather-card-green-text-color, green);
      --bolder-weather-card-green-text-color-day_internal: var(--bolder-weather-card-green-text-color-day, var(--bolder-weather-card-green-text-color_internal));
      --bolder-weather-card-green-text-color-night_internal: var(--bolder-weather-card-green-text-color-night, var(--bolder-weather-card-green-text-color_internal));
      --bolder-weather-card-yellowgreen-text-color_internal: var(--bolder-weather-card-yellowgreen-text-color, yellowgreen);
      --bolder-weather-card-yellowgreen-text-color-day_internal: var(--bolder-weather-card-yellowgreen-text-color-day, var(--bolder-weather-card-yellowgreen-text-color_internal));
      --bolder-weather-card-yellowgreen-text-color-night_internal: var(--bolder-weather-card-yellowgreen-text-color-night, var(--bolder-weather-card-yellowgreen-text-color_internal));
      --bolder-weather-card-orange-text-color_internal: var(--bolder-weather-card-orange-text-color, orange);
      --bolder-weather-card-orange-text-color-day_internal: var(--bolder-weather-card-orange-text-color-day, var(--bolder-weather-card-orange-text-color_internal));
      --bolder-weather-card-orange-text-color-night_internal: var(--bolder-weather-card-orange-text-color-night, var(--bolder-weather-card-orange-text-color_internal));
      --bolder-weather-card-red-text-color_internal: var(--bolder-weather-card-red-text-color, red);
      --bolder-weather-card-red-text-color-day_internal: var(--bolder-weather-card-red-text-color-day, var(--bolder-weather-card-red-text-color_internal));
      --bolder-weather-card-red-text-color-night_internal: var(--bolder-weather-card-red-text-color-night, var(--bolder-weather-card-red-text-color_internal));
      --bolder-weather-card-purple-text-color_internal: var(--bolder-weather-card-purple-text-color, purple);
      --bolder-weather-card-purple-text-color-day_internal: var(--bolder-weather-card-purple-text-color-day, var(--bolder-weather-card-purple-text-color_internal));
      --bolder-weather-card-purple-text-color-night_internal: var(--bolder-weather-card-purple-text-color-night, var(--bolder-weather-card-purple-text-color_internal));
      --bolder-weather-card-maroon-text-color_internal: var(--bolder-weather-card-maroon-text-color, maroon);
      --bolder-weather-card-maroon-text-color-day_internal: var(--bolder-weather-card-maroon-text-color-day, var(--bolder-weather-card-maroon-text-color_internal));
      --bolder-weather-card-maroon-text-color-night_internal: var(--bolder-weather-card-maroon-text-color-night, var(--bolder-weather-card-maroon-text-color_internal));



      /*** Title Variables */
      --bolder-weather-card-title-text-color_internal: var(--bolder-weather-card-title-text-color, var(--bolder-weather-card-primary-text-color_internal));
      --bolder-weather-card-title-text-color-day_internal: var(--bolder-weather-card-title-text-color-day, var(--bolder-weather-card-primary-text-color-day_internal));
      --bolder-weather-card-title-text-color-night_internal: var(--bolder-weather-card-title-text-color-night, var(--bolder-weather-card-primary-text-color-night_internal));
      --bolder-weather-card-title-text-outline-color_internal: var(--bolder-weather-card-title-text-outline-color, var(--bolder-weather-card-primary-text-outline-color_internal));
      --bolder-weather-card-title-text-outline-color-day_internal: var(--bolder-weather-card-title-text-outline-color-day, var(--bolder-weather-card-primary-text-outline-color-day_internal));
      --bolder-weather-card-title-text-outline-color-night_internal: var(--bolder-weather-card-title-text-outline-color-night, var(--bolder-weather-card-primary-text-outline-color-night_internal));
      --bolder-weather-card-title-text-size_internal: var(--bolder-weather-card-title-text-size, var(--ha-card-header-font-size, 24px));
      --bolder-weather-card-title-text-font-weight_internal: var(--bolder-weather-card-title-text-font-weight, 400);
      --bolder-weather-card-title-padding_internal: var(--bolder-weather-card-title-padding, 12px 16px 16px);



      /*** Forecast Section Variables */
      /***     Main */
      --bolder-weather-card-forecast-background-color_internal: var(--bolder-weather-card-forecast-background-color, transparent);
      --bolder-weather-card-forecast-background-color-day_internal: var(--bolder-weather-card-forecast-background-color-day, var(--bolder-weather-card-forecast-background-color_internal));
      --bolder-weather-card-forecast-background-color-night_internal: var(--bolder-weather-card-forecast-background-color-night, var(--bolder-weather-card-forecast-background-color_internal));

      --bolder-weather-card-forecast-space-inside_internal: var(--bolder-weather-card-forecast-space-inside, var(--bolder-weather-card-padding_internal));
      --bolder-weather-card-forecast-space-outside_internal: var(--bolder-weather-card-forecast-space-outside, 0px);
      --bolder-weather-card-forecast-border-radius_internal: var(--bolder-weather-card-forecast-border-radius, calc(var(--bolder-weather-card-border-radius_internal) / 2));

      /***     Layout */
      --bolder-weather-card-forecast-col-day-size_internal: var(--bolder-weather-card-forecast-col-day-size, 2.1rem);
      --bolder-weather-card-forecast-col-icon-size_internal: var(--bolder-weather-card-forecast-col-icon-size, 2rem);
      --bolder-weather-card-forecast-col-temp-low-size_internal: var(--bolder-weather-card-forecast-col-temp-low-size, 2.1rem);
      --bolder-weather-card-forecast-col-temp-high-size_internal: var(--bolder-weather-card-forecast-col-temp-high-size, 2.1rem);
      --bolder-weather-card-forecast-grid-gap_internal: var(--bolder-weather-card-forecast-grid-gap, 0.5rem);

      /***     Bar */
      --bolder-weather-card-forecast-bar-background-opacity_internal: var(--bolder-weather-card-forecast-bar-background-opacity, 0.1);
      --bolder-weather-card-forecast-bar-height_internal: var(--bolder-weather-card-forecast-bar-height, 1.5rem);
      --bolder-weather-card-forecast-bar-background-color_internal: var(--bolder-weather-card-forecast-bar-background-color, var(--bolder-weather-card-primary-text-color_internal));
      --bolder-weather-card-forecast-bar-dot-border-width_internal: var(--bolder-weather-card-forecast-bar-dot-border-width, 2px);
      --bolder-weather-card-forecast-bar-dot-border-color_internal: var(--bolder-weather-card-forecast-bar-dot-border-color, var(--bolder-weather-card-background_internal));
      --bolder-weather-card-forecast-bar-dot-border-color-day_internal: var(--bolder-weather-card-forecast-bar-dot-border-color-day, var(--bolder-weather-card-background-day_internal));
      --bolder-weather-card-forecast-bar-dot-border-color-night_internal: var(--bolder-weather-card-forecast-bar-dot-border-color-night, var(--bolder-weather-card-background-night_internal));
      --bolder-weather-card-forecast-bar-dot-background-color_internal: var(--bolder-weather-card-forecast-bar-dot-background-color, var(--bolder-weather-card-primary-text-color_internal));
      --bolder-weather-card-forecast-bar-dot-background-color-day_internal: var(--bolder-weather-card-forecast-bar-dot-background-color-day, var(--bolder-weather-card-primary-text-color-day_internal));
      --bolder-weather-card-forecast-bar-dot-background-color-night_internal: var(--bolder-weather-card-forecast-bar-dot-background-color-night, var(--bolder-weather-card-primary-text-color-night_internal));
      --bolder-weather-card-forecast-bar-dot-opacity_internal: var(--bolder-weather-card-forecast-bar-dot-opacity, 0.75);

      /***     Text */
      --bolder-weather-card-forecast-text-color_internal: var(--bolder-weather-card-forecast-text-color, var(--bolder-weather-card-primary-text-color_internal));
      --bolder-weather-card-forecast-text-color-day_internal: var(--bolder-weather-card-forecast-text-color-day, var(--bolder-weather-card-primary-text-color-day_internal));
      --bolder-weather-card-forecast-text-color-night_internal: var(--bolder-weather-card-forecast-text-color-night, var(--bolder-weather-card-primary-text-color-night_internal));
      --bolder-weather-card-forecast-text-outline-color_internal: var(--bolder-weather-card-forecast-text-outline-color, var(--bolder-weather-card-background_internal));
      --bolder-weather-card-forecast-text-outline-color-day_internal: var(--bolder-weather-card-forecast-text-outline-color-day, var(--bolder-weather-card-background-day_internal));
      --bolder-weather-card-forecast-text-outline-color-night_internal: var(--bolder-weather-card-forecast-text-outline-color-night, var(--bolder-weather-card-background-night_internal));
    }

    .bolder-weather-card-day {
      --bolder-weather-card-background_internal: var(--bolder-weather-card-background-day_internal); 
      --bolder-weather-card-forecast-background-color_internal: var(--bolder-weather-card-forecast-background-color-day_internal);
      --bolder-weather-card-border-color_internal: var(--bolder-weather-card-border-color-day_internal);

      --bolder-weather-card-primary-text-color_internal: var(--bolder-weather-card-primary-text-color-day_internal);
      --bolder-weather-card-primary-text-outline-color_internal: var(--bolder-weather-card-primary-text-outline-color-day_internal);

      --bolder-weather-card-primary-unit-text-color_internal: var(--bolder-weather-card-primary-unit-text-color-day_internal);
      --bolder-weather-card-primary-unit-text-outline-color_internal: var(--bolder-weather-card-primary-unit-text-outline-color-day_internal);

      --bolder-weather-card-secondary-text-color_internal: var(--bolder-weather-card-secondary-text-color-day_internal);
      --bolder-weather-card-secondary-text-outline-color_internal: var(--bolder-weather-card-secondary-text-outline-color-day_internal);

      --bolder-weather-card-top-text-color_internal: var(--bolder-weather-card-top-text-color-day_internal);
      --bolder-weather-card-top-text-outline-color_internal: var(--bolder-weather-card-top-text-outline-color-day_internal);

      --bolder-weather-card-state-text-color_internal: var(--bolder-weather-card-state-text-color-day_internal);
      --bolder-weather-card-state-text-outline-color_internal: var(--bolder-weather-card-state-text-outline-color-day_internal);

      --bolder-weather-card-bottom-text-color_internal: var(--bolder-weather-card-bottom-text-color-day_internal);
      --bolder-weather-card-bottom-text-outline-color_internal: var(--bolder-weather-card-bottom-text-outline-color-day_internal);

      --bolder-weather-card-forecast-text-color_internal: var(--bolder-weather-card-forecast-text-color-day_internal);
      --bolder-weather-card-forecast-text-outline-color_internal: var(--bolder-weather-card-forecast-text-outline-color-day_internal);

      --bolder-weather-card-green-text-color_internal: var(--bolder-weather-card-green-text-color-day_internal);
      --bolder-weather-card-yellowgreen-text-color_internal: var(--bolder-weather-card-yellowgreen-text-color-day_internal);
      --bolder-weather-card-orange-text-color_internal: var(--bolder-weather-card-orange-text-color-day_internal);
      --bolder-weather-card-red-text-color_internal: var(--bolder-weather-card-red-text-color-day_internal);
      --bolder-weather-card-purple-text-color_internal: var(--bolder-weather-card-purple-text-color-day_internal);
      --bolder-weather-card-maroon-text-color_internal: var(--bolder-weather-card-maroon-text-color-day_internal);

      --bolder-weather-card-title-text-color_internal: var(--bolder-weather-card-title-text-color-day_internal);
      --bolder-weather-card-title-text-outline-color_internal: var(--bolder-weather-card-title-text-outline-color-day_internal);

      --bolder-weather-card-forecast-bar-dot-border-color_internal: var(--bolder-weather-card-forecast-bar-dot-border-color-day_internal, var(--bolder-weather-card-background-day_internal));
      --bolder-weather-card-forecast-bar-dot-background-color_internal: var(--bolder-weather-card-forecast-bar-dot-background-color-day_internal, var(--bolder-weather-card-primary-text-color-day_internal));
    }

    .bolder-weather-card-night {
      --bolder-weather-card-background_internal: var(--bolder-weather-card-background-night_internal);
      --bolder-weather-card-forecast-background-color_internal: var(--bolder-weather-card-forecast-background-color-night_internal);
      --bolder-weather-card-border-color_internal: var(--bolder-weather-card-border-color-night_internal);

      --bolder-weather-card-primary-text-color_internal: var(--bolder-weather-card-primary-text-color-night_internal);
      --bolder-weather-card-primary-text-outline-color_internal: var(--bolder-weather-card-primary-text-outline-color-night_internal);

      --bolder-weather-card-primary-unit-text-color_internal: var(--bolder-weather-card-primary-unit-text-color-night_internal);
      --bolder-weather-card-primary-unit-text-outline-color_internal: var(--bolder-weather-card-primary-unit-text-outline-color-night_internal);

      --bolder-weather-card-secondary-text-color_internal: var(--bolder-weather-card-secondary-text-color-night_internal);
      --bolder-weather-card-secondary-text-outline-color_internal: var(--bolder-weather-card-secondary-text-outline-color-night_internal);

      --bolder-weather-card-top-text-color_internal: var(--bolder-weather-card-top-text-color-night_internal);
      --bolder-weather-card-top-text-outline-color_internal: var(--bolder-weather-card-top-text-outline-color-night_internal);

      --bolder-weather-card-state-text-color_internal: var(--bolder-weather-card-state-text-color-night_internal);
      --bolder-weather-card-state-text-outline-color_internal: var(--bolder-weather-card-state-text-outline-color-night_internal);

      --bolder-weather-card-bottom-text-color_internal: var(--bolder-weather-card-bottom-text-color-night_internal);
      --bolder-weather-card-bottom-text-outline-color_internal: var(--bolder-weather-card-bottom-text-outline-color-night_internal);

      --bolder-weather-card-forecast-text-color_internal: var(--bolder-weather-card-forecast-text-color-night_internal);
      --bolder-weather-card-forecast-text-outline-color_internal: var(--bolder-weather-card-forecast-text-outline-color-night_internal);

      --bolder-weather-card-green-text-color_internal: var(--bolder-weather-card-green-text-color-night_internal);
      --bolder-weather-card-yellowgreen-text-color_internal: var(--bolder-weather-card-yellowgreen-text-color-night_internal);
      --bolder-weather-card-orange-text-color_internal: var(--bolder-weather-card-orange-text-color-night_internal);
      --bolder-weather-card-red-text-color_internal: var(--bolder-weather-card-red-text-color-night_internal);
      --bolder-weather-card-purple-text-color_internal: var(--bolder-weather-card-purple-text-color-night_internal);
      --bolder-weather-card-maroon-text-color_internal: var(--bolder-weather-card-maroon-text-color-night_internal);

      --bolder-weather-card-title-text-color_internal: var(--bolder-weather-card-title-text-color-night_internal);
      --bolder-weather-card-title-text-outline-color_internal: var(--bolder-weather-card-title-text-outline-color-night_internal);

      --bolder-weather-card-forecast-bar-dot-border-color_internal: var(--bolder-weather-card-forecast-bar-dot-border-color-night_internal, var(--bolder-weather-card-background-night_internal));
      --bolder-weather-card-forecast-bar-dot-background-color_internal: var(--bolder-weather-card-forecast-bar-dot-background-color-night_internal, var(--bolder-weather-card-primary-text-color-night_internal));
    }

    ha-card {
      height: 100%;
      box-shadow: var(--bolder-weather-card-box-shadow_internal);
      border-radius: var(--bolder-weather-card-border-radius_internal);
      background: var(--bolder-weather-card-background_internal);
      border-color: var(--bolder-weather-card-border-color_internal);
      border-style: var(--bolder-weather-card-border-style_internal);
      border-width: var(--bolder-weather-card-border-width_internal);
    }
    .card-header {
      z-index: 1;
      color: var(--bolder-weather-card-title-text-color_internal);
      text-shadow: -1px -1px 0 var(--bolder-weather-card-title-text-outline-color_internal), 1px -1px 0 var(--bolder-weather-card-title-text-outline-color_internal), 1px 1px 0 var(--bolder-weather-card-title-text-outline-color_internal), -1px 1px 0 var(--bolder-weather-card-title-text-outline-color_internal);
      font-size: var(--bolder-weather-card-title-text-size_internal);
      line-height: calc(1.2 * var(--bolder-weather-card-title-text-size_internal));
      padding: var(--bolder-weather-card-title-padding_internal);
      font-weight: var(--bolder-weather-card-title-text-font-weight_internal);
    }
    .card-content {
      padding: 0;
      margin: 0;
    }

    .bolder-weather-card-temp-unit{
      font-size: var(--bolder-weather-card-primary-unit-text-size_internal);
      margin: var(--bolder-weather-card-primary-unit-text-space-above_internal) 0 var(--bolder-weather-card-primary-unit-text-space-below_internal) 0;
      color: var(--bolder-weather-card-primary-unit-text-color_internal);
      text-shadow: -1px -1px 0 var(--bolder-weather-card-primary-unit-text-outline-color_internal), 1px -1px 0 var(--bolder-weather-card-primary-unit-text-outline-color_internal), 1px 1px 0 var(--bolder-weather-card-primary-unit-text-outline-color_internal), -1px 1px 0 var(--bolder-weather-card-primary-unit-text-outline-color_internal);
    }

    bolder-weather-card-today {
      display: flex;
      height: var(--bolder-weather-card-today-height_internal);
      position: relative;
    }

    bolder-weather-card-today-left {
      display: flex;
      width: 100%;
      height: var(--bolder-weather-card-today-height_internal);
      align-items: flex-start;
      justify-content: flex-start;
      position: absolute;
      top: 0px;
      left: 0px;
    }

    .grow-img-container {
      max-width: 100%;
      max-height: 100%;
      overflow: visible;
      position: relative;
      display: contents;
    }

    .today-img-crop {
      max-width: calc(var(--bolder-weather-card-today-image-max-width_internal) + var(--bolder-weather-card-border-width_internal));
      max-height: calc(var(--bolder-weather-card-today-image-max-height_internal) + var(--bolder-weather-card-border-width_internal));
      margin-left: calc(-1 * var(--bolder-weather-card-border-width_internal));
      margin-top: calc(-1 * var(--bolder-weather-card-border-width_internal));
      border-radius:  var(--bolder-weather-card-border-radius_internal);
    }

    bolder-weather-card-today-right {
      display: flex;
      width: calc(100% - var(--bolder-weather-card-padding_internal) - var(--bolder-weather-card-padding_internal));
      justify-content: center;
      height: calc(100% - var(--bolder-weather-card-padding_internal) - var(--bolder-weather-card-padding_internal));
      flex-direction: column;
      position: relative;
      margin: var(--bolder-weather-card-padding_internal);
    }

    bolder-weather-card-today-right-wrap {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    bolder-weather-card-today-right-wrap-top {
      width: 100%;
      text-align: end;
      display: block;
      font-size: var(--bolder-weather-card-top-text-size_internal);
      line-height: var(--bolder-weather-card-top-text-size_internal);
      margin: var(--bolder-weather-card-top-text-space-above_internal) 0 var(--bolder-weather-card-top-text-space-below_internal) 0;
      color: var(--bolder-weather-card-top-text-color_internal);
      text-shadow: -1px -1px 0 var(--bolder-weather-card-top-text-outline-color_internal), 1px -1px 0 var(--bolder-weather-card-top-text-outline-color_internal), 1px 1px 0 var(--bolder-weather-card-top-text-outline-color_internal), -1px 1px 0 var(--bolder-weather-card-top-text-outline-color_internal);
      flex: 0 0 0;
    }

    bolder-weather-card-today-right-wrap-center {
      display: flex;
      font-size: var(--bolder-weather-card-primary-text-size_internal);
      line-height: var(--bolder-weather-card-primary-text-size_internal);
      white-space: nowrap;
      align-items: center;
      justify-content: end;
      margin: var(--bolder-weather-card-primary-text-space-above_internal) 0 var(--bolder-weather-card-primary-text-space-above_internal) 0 var(--bolder-weather-card-primary-text-space-below_internal);
      color: var(--bolder-weather-card-primary-text-color_internal);
      text-shadow: -1px -1px 0 var(--bolder-weather-card-primary-text-outline-color_internal), 1px -1px 0 var(--bolder-weather-card-primary-text-outline-color_internal), 1px 1px 0 var(--bolder-weather-card-primary-text-outline-color_internal), -1px 1px 0 var(--bolder-weather-card-primary-text-outline-color_internal);
      flex: 1 0 0;
    }

    bolder-weather-card-today-right-wrap-state {
      display: flex;
      justify-content: end;
      font-size: var(--bolder-weather-card-state-text-size_internal);
      line-height: var(--bolder-weather-card-state-text-size_internal);
      margin: var(--bolder-weather-card-state-text-space-above_internal) 0 var(--bolder-weather-card-state-text-space-below_internal) 0;
      color: var(--bolder-weather-card-state-text-color_internal);
      text-shadow: -1px -1px 0 var(--bolder-weather-card-state-text-outline-color_internal), 1px -1px 0 var(--bolder-weather-card-state-text-outline-color_internal), 1px 1px 0 var(--bolder-weather-card-state-text-outline-color_internal), -1px 1px 0 var(--bolder-weather-card-state-text-outline-color_internal);
      flex: 0 0 0;
    }

    bolder-weather-card-today-right-wrap-bottom {
      display: flex;
      justify-content: end;
      font-size: var(--bolder-weather-card-bottom-text-size_internal);
      line-height: calc(1.2 * var(--bolder-weather-card-bottom-text-size_internal));
      margin: var(--bolder-weather-card-bottom-text-space-above_internal) 0 var(--bolder-weather-card-bottom-text-space-below_internal) 0;
      color: var(--bolder-weather-card-bottom-text-color_internal);
      text-shadow: -1px -1px 0 var(--bolder-weather-card-bottom-text-outline-color_internal), 1px -1px 0 var(--bolder-weather-card-bottom-text-outline-color_internal), 1px 1px 0 var(--bolder-weather-card-bottom-text-outline-color_internal), -1px 1px 0 var(--bolder-weather-card-bottom-text-outline-color_internal);
      flex: 0 0 0;
    }

    bolder-weather-card-forecast {
      display: block;
      background: var(--bolder-weather-card-forecast-background-color_internal);
      border-radius: var(--bolder-weather-card-forecast-border-radius_internal);
      margin: var(--bolder-weather-card-forecast-space-outside_internal);
      padding: var(--bolder-weather-card-forecast-space-inside_internal);
      position: relative;
      color: var(--bolder-weather-card-forecast-text-color_internal);
    }

    bolder-weather-card-forecast-row {
      display: grid;
      grid-template-columns: minmax(var(--bolder-weather-card-forecast-col-day-size_internal),min-content) minmax(var(--bolder-weather-card-forecast-col-icon-size_internal),min-content) minmax(var(--bolder-weather-card-forecast-col-temp-low-size_internal),min-content) auto minmax(var(--bolder-weather-card-forecast-col-temp-high-size_internal),min-content);
      align-items: center;
      grid-gap: var(--bolder-weather-card-forecast-grid-gap_internal);
    }

    forecast-text {
      text-align: var(--bolder-weather-card-forecast-text-align);
      white-space: nowrap;
      text-overflow: clip;
    }

    forecast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
    }

    .grow-img {
      max-width: 100%;
      max-height: 100%;
    }

    forecast-temperature-bar {
      position: relative;
      width: 100%;
      height: var(--bolder-weather-card-forecast-bar-height_internal);
      border-radius: calc(var(--bolder-weather-card-forecast-bar-height_internal) / 2);
      overflow: hidden;
    }

    forecast-temperature-bar-background {
      left: 0%;
      right: 100%;
      width: 100%;
      opacity: var(--bolder-weather-card-forecast-bar-background-opacity_internal);
      background: var(--bolder-weather-card-forecast-bar-background-color_internal);
    }

    forecast-temperature-bar-current-indicator-dot {
      background-color: var(--bolder-weather-card-forecast-bar-dot-background-color_internal);
      border-radius: 50%;
      width: var(--bolder-weather-card-forecast-bar-height_internal);
      box-shadow: inset 0 0 0 var(--bolder-weather-card-forecast-bar-dot-border-width_internal) var(--bolder-weather-card-forecast-bar-dot-border-color_internal);
      margin-left: calc(var(--move-right) * -1 * var(--bolder-weather-card-forecast-bar-height_internal));
    }

    forecast-temperature-bar-range {
      border-radius: calc(var(--bolder-weather-card-forecast-bar-height_internal) / 2);
      left: var(--start-percent);
      right: calc(100% - var(--end-percent));
      background: linear-gradient(to right, var(--gradient));
      overflow: hidden;
      min-width: var(--bolder-weather-card-forecast-bar-height_internal);
      margin-left: calc(var(--move-right) * -1 * var(--bolder-weather-card-forecast-bar-height_internal));
    }

    forecast-temperature-bar-current-indicator {
      opacity: var(--bolder-weather-card-forecast-bar-dot-opacity_internal);
      left: var(--position);
    }

    forecast-temperature-bar-current-indicator,
    forecast-temperature-bar-current-indicator-dot,
    forecast-temperature-bar-background,
    forecast-temperature-bar-range {
      height: 100%;
      position: absolute;
    }

    aqi {
      padding: 2px;
      border-radius: 5px;
    }
    .aqi-green {
      color: var(--bolder-weather-card-aqi-green-text-color, var(--bolder-weather-card-green-text-color_internal));
    }
    .aqi-yellowgreen {
      color: var(--bolder-weather-card-aqi-yellowgreen-text-color, var(--bolder-weather-card-yellowgreen-text-color_internal));
    }
    .aqi-orange {
      color: var(--bolder-weather-card-aqi-orange-text-color, var(--bolder-weather-card-orange-text-color_internal));
    }
    .aqi-red {
      color: var(--bolder-weather-card-aqi-red-text-color, var(--bolder-weather-card-red-text-color_internal));
    }
    .aqi-purple {
      color: var(--bolder-weather-card-aqi-purple-text-color, var(--bolder-weather-card-purple-text-color_internal));
    }
    .aqi-maroon {
      color: var(--bolder-weather-card-aqi-maroon-text-color, var(--bolder-weather-card-maroon-text-color_internal));
    }
    uv {
      padding: 2px;
      border-radius: 5px;
    }
    .uv-green {
      color: var(--bolder-weather-card-uv-green-text-color, var(--bolder-weather-card-green-text-color_internal));
    }
    .uv-yellowgreen {
      color: var(--bolder-weather-card-uv-yellowgreen-text-color, var(--bolder-weather-card-yellowgreen-text-color_internal));
    }
    .uv-orange {
      color: var(--bolder-weather-card-uv-orange-text-color, var(--bolder-weather-card-orange-text-color_internal));
    }
    .uv-red {
      color: var(--bolder-weather-card-uv-red-text-color, var(--bolder-weather-card-red-text-color_internal));
    }
    .uv-violet {
      color: var(--bolder-weather-card-uv-maroon-text-color, var(--bolder-weather-card-maroon-text-color_internal));
    }
  `
}
