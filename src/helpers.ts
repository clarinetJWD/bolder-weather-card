import { html, type TemplateResult } from 'lit'

export function safeRender<T> (renderFn: () => T): T | TemplateResult {
  try {
    return renderFn()
  } catch (e) {
    console.error('bolder-weather-card - Error while rendering bolder-weather-card component:', e)
    return html``
  }
}
