const API_TRANSLATE =
  "https://libretranslate.de/translate?api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

export interface TranslateApiConfig {
  url: string
  timeout: number
}
export const TRANSLATE_API_CONFIG: TranslateApiConfig = {
  url: API_TRANSLATE,
  timeout: 10000,
}
