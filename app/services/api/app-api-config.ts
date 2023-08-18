const API_URL = "http://192.168.10.173:3000"

export interface AppApiConfig {
  url: string
  timeout: number
}
export const APP_API_CONFIG: AppApiConfig = {
  url: API_URL,
  timeout: 10000,
}
