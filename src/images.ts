import staticFillPartlyCloudyNightRain from './icons/fill/svg-static/partly-cloudy-night-rain.svg'
import staticCropPartlyCloudyNightRain from './icons/fill/svg-static-crop/partly-cloudy-night-rain.svg'
import staticFillPartlyCloudyDayRain from './icons/fill/svg-static/partly-cloudy-day-rain.svg'
import staticCropPartlyCloudyDayRain from './icons/fill/svg-static-crop/partly-cloudy-day-rain.svg'
import staticFillPartlyCloudyNight from './icons/fill/svg-static/partly-cloudy-night.svg'
import staticCropPartlyCloudyNight from './icons/fill/svg-static-crop/partly-cloudy-night.svg'
import staticFillPartlyCloudyDay from './icons/fill/svg-static/partly-cloudy-day.svg'
import staticCropPartlyCloudyDay from './icons/fill/svg-static-crop/partly-cloudy-day.svg'
import staticFillCloudy from './icons/fill/svg-static/cloudy.svg'
import staticCropCloudyNight from './icons/fill/svg-static-crop/cloudy-night.svg'
import staticCropCloudyDay from './icons/fill/svg-static-crop/cloudy-day.svg'
import staticFillClearNight from './icons/fill/svg-static/clear-night.svg'
import staticCropClearNight from './icons/fill/svg-static-crop/clear-night.svg'
import staticFillFogNight from './icons/fill/svg-static/fog-night.svg'
import staticCropFogNight from './icons/fill/svg-static-crop/fog-night.svg'
import staticFillFogDay from './icons/fill/svg-static/fog-day.svg'
import staticCropFogDay from './icons/fill/svg-static-crop/fog-day.svg'
import staticFillHail from './icons/fill/svg-static/hail.svg'
import staticCropHailNight from './icons/fill/svg-static-crop/hail-night.svg'
import staticCropHailDay from './icons/fill/svg-static-crop/hail-day.svg'
import staticFillThunderstormsNight from './icons/fill/svg-static/thunderstorms-night.svg'
import staticCropThunderstormsNight from './icons/fill/svg-static-crop/thunderstorms-night.svg'
import staticFillThunderstormsDay from './icons/fill/svg-static/thunderstorms-day.svg'
import staticCropThunderstormsDay from './icons/fill/svg-static-crop/thunderstorms-day.svg'
import staticFillThunderstormsRainNight from './icons/fill/svg-static/thunderstorms-night-rain.svg'
import staticCropThunderstormsRainNight from './icons/fill/svg-static-crop/thunderstorms-night-rain.svg'
import staticFillThunderstormsRainDay from './icons/fill/svg-static/thunderstorms-day-rain.svg'
import staticCropThunderstormsRainDay from './icons/fill/svg-static-crop/thunderstorms-day-rain.svg'
import staticFillRain from './icons/fill/svg-static/rain.svg'
import staticCropRainNight from './icons/fill/svg-static-crop/rain-night.svg'
import staticCropRainDay from './icons/fill/svg-static-crop/rain-day.svg'
import staticFillSnow from './icons/fill/svg-static/snow.svg'
import staticCropSnowNight from './icons/fill/svg-static-crop/snow-night.svg'
import staticCropSnowDay from './icons/fill/svg-static-crop/snow-day.svg'
import staticFillSleet from './icons/fill/svg-static/sleet.svg'
import staticCropSleetNight from './icons/fill/svg-static-crop/sleet-night.svg'
import staticCropSleetDay from './icons/fill/svg-static-crop/sleet-day.svg'
import staticFillClearDay from './icons/fill/svg-static/clear-day.svg'
import staticCropClearDay from './icons/fill/svg-static-crop/clear-day.svg'
import staticFillWindsock from './icons/fill/svg-static/windsock.svg'
import staticCropWindsock from './icons/fill/svg-static-crop/windsock.svg'
import staticFillHurricane from './icons/fill/svg-static/hurricane.svg'
import staticCropHurricane from './icons/fill/svg-static-crop/hurricane.svg'
import staticFillRaindrops from './icons/fill/svg-static/raindrops.svg'
import staticCropRaindrops from './icons/fill/svg-static-crop/raindrops.svg'
import staticFillRaindrop from './icons/fill/svg-static/raindrop.svg'
import staticCropRaindrop from './icons/fill/svg-static-crop/raindrop.svg'
import staticFillHumidity from './icons/fill/svg-static/humidity.svg'
import staticCropHumidity from './icons/fill/svg-static-crop/humidity.svg'

export const staticIcons = {
  fill: {
    rainy: {
      day: staticFillPartlyCloudyDayRain,
      night: staticFillPartlyCloudyNightRain
    },
    partlycloudy: {
      day: staticFillPartlyCloudyDay,
      night: staticFillPartlyCloudyNight
    },
    cloudy: staticFillCloudy,
    'clear-night': {
      day: staticFillClearDay,
      night: staticFillClearNight
    },
    fog: {
      day: staticFillFogDay,
      night: staticFillFogNight
    },
    hail: staticFillHail,
    lightning: {
      day: staticFillThunderstormsDay,
      night: staticFillThunderstormsNight
    },
    'lightning-rainy': {
      day: staticFillThunderstormsRainDay,
      night: staticFillThunderstormsRainNight
    },
    pouring: staticFillRain,
    raindrop: staticFillRaindrop,
    raindrops: staticFillRaindrops,
    snowy: staticFillSnow,
    'snowy-rainy': staticFillSleet,
    sunny: {
      day: staticFillClearDay,
      night: staticFillClearNight
    },
    windy: staticFillWindsock,
    'windy-exceptional': staticFillWindsock,
    exceptional: staticFillHurricane,
    humidity: staticFillHumidity
  }
}
export const cropIcons = {
  crop: {
    rainy: {
      day: staticCropPartlyCloudyDayRain,
      night: staticCropPartlyCloudyNightRain
    },
    partlycloudy: {
      day: staticCropPartlyCloudyDay,
      night: staticCropPartlyCloudyNight
    },
    cloudy: {
      day: staticCropCloudyDay,
      night: staticCropCloudyNight
    },
    'clear-night': {
      day: staticCropClearDay,
      night: staticCropClearNight
    },
    fog: {
      day: staticCropFogDay,
      night: staticCropFogNight
    },
    hail: {
      day: staticCropHailDay,
      night: staticCropHailNight
    },
    lightning: {
      day: staticCropThunderstormsDay,
      night: staticCropThunderstormsNight
    },
    'lightning-rainy': {
      day: staticCropThunderstormsRainDay,
      night: staticCropThunderstormsRainNight
    },
    pouring: {
      day: staticCropRainDay,
      night: staticCropRainNight
    },
    raindrop: staticCropRaindrop,
    raindrops: staticCropRaindrops,
    snowy: {
      day: staticCropSnowDay,
      night: staticCropSnowNight
    },
    'snowy-rainy': {
      day: staticCropSleetDay,
      night: staticCropSleetNight
    },
    sunny: {
      day: staticCropClearDay,
      night: staticCropClearNight
    },
    windy: staticCropWindsock,
    'windy-exceptional': staticCropWindsock,
    exceptional: staticCropHurricane,
    humidity: staticCropHumidity
  }
}