import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { TranslateApiConfig, TRANSLATE_API_CONFIG } from "./translate-api-config"
import { ITranslateApi } from "./interface"

/**
 * Manages all requests to the API.
 */
export class TranslateApi {
  apisauce: ApisauceInstance
  config: TranslateApiConfig
  constructor(config: TranslateApiConfig = TRANSLATE_API_CONFIG) {
    this.config = config
    this.setup()
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  }

  async getTranslateText(data: ITranslateApi) {
    const { source = "es", target = "vi", text } = data
    const response = await this.apisauce.post(
      `${this.config.url}&q=${text}&source=${source}&target=${target}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", data: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
