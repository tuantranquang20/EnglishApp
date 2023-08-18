import { ApisauceInstance, create } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { APP_API_CONFIG, AppApiConfig } from "./app-api-config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LessonType } from "~app/constants/constants"
import { Alert } from "react-native"
import { navigationRef } from "~app/navigators"
import { StackActions } from "@react-navigation/native"
import { AppStacks, RouteName } from "~app/navigators/constants"
import { showConfirm } from "~app/components/alert/Alert"

export class AppApi {
  apisauce: ApisauceInstance
  config: AppApiConfig
  constructor(config: AppApiConfig = APP_API_CONFIG) {
    this.config = config
    this.setup()
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        accept: "application/json",
      },
    })

    this.apisauce.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem("TOKEN")
        config.headers.Authorization = `Bearer ${token}`
        return config
      },
      (error) => {
        Promise.reject(error)
      },
    )
    this.apisauce.addAsyncResponseTransform(async (response) => {
      if (response.data.statusCode === 401) {
        showConfirm("You must login again", "Login now", () => {
          AsyncStorage.setItem("TOKEN", "", () => {
            navigationRef.dispatch(
              StackActions.replace(
                AppStacks.AuthStack as never,
                {
                  screen: RouteName.LoginScreen,
                } as never,
              ),
            )
          })
        })
      }
    })
  }

  async login(data: { email: string; password: string }) {
    const response = await this.apisauce.post(`${this.config.url}/auth/login`, { ...data })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response?.data?.data?.token) {
      await AsyncStorage.setItem("TOKEN", response?.data.data.token)
    }
    try {
      return { kind: "ok", ...response?.data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async signUp(data: { email: string; password: string; username: string }) {
    const response = await this.apisauce.post(`${this.config.url}/auth/register`, { ...data })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", ...response?.data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getLesson(type: LessonType) {
    try {
      const response = await this.apisauce.get(`${this.config.url}/lesson?type=${type}`)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", ...response?.data?.data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getGrammar(lessonId: string) {
    try {
      const response = await this.apisauce.get(`${this.config.url}/grammar`, {
        lessonId,
        page: 1,
        limit: 1000,
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", ...response?.data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getReading(lessonId: string) {
    try {
      const response = await this.apisauce.get(`${this.config.url}/reading`, {
        lessonId,
        page: 1,
        limit: 1000,
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", ...response?.data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getListening(lessonId: string) {
    try {
      const response = await this.apisauce.get(`${this.config.url}/listening`, {
        lessonId,
        page: 1,
        limit: 1000,
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", ...response?.data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async createOrUpdateUserLearning(data) {
    try {
      const response = await this.apisauce.post(`${this.config.url}/user-learning`, data)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", ...response?.data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getUser(id) {
    try {
      const response = await this.apisauce.get(`${this.config.url}/user/${id}`)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", ...response?.data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async updateUser(id, body) {
    try {
      const response = await this.apisauce.patch(`${this.config.url}/user/${id}`, body)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem)
          return {
            ...problem,
            message: response.data?.errors?.[0]?.message || "Something went wrong!",
          }
      }

      return { kind: "ok", ...response?.data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
  
  async createUserHistory(data) {
    try {
      const response = await this.apisauce.post(`${this.config.url}/user-history`, data)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem)
          return {
            ...problem,
            message: response.data?.errors?.[0]?.message || "Something went wrong!",
          }
      }

      return { kind: "ok", ...response?.data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
}
