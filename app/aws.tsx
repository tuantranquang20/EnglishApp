import AWS from "aws-sdk/dist/aws-sdk-react-native"
import { Platform } from "react-native"

export const createARNAsync = (params) =>
  new Promise((resolve, reject) => {
    const sns = new AWS.SNS()
    sns.createPlatformEndpoint(params, (err, data) => {
      console.log("created endpoint", err, data)
      if (err || !data.EndpointArn) {
        return err ? reject(err) : reject("arn is missing")
      }
      resolve(data.EndpointArn)
    })
  })

export const getAttributesAsync = (params) =>
  new Promise((resolve, reject) => {
    const sns = new AWS.SNS()
    sns.getEndpointAttributes(params, (err, data) => {
      console.log("got attrs:", err, data)
      if (err || !data.Attributes) {
        return err ? reject(err) : reject("attributes are missing in the response")
      }
      resolve(data.Attributes)
    })
  })

export const onRegistrationAWS = async ({ deviceToken }) => {
  try {
    const endpointParams = {
      PlatformApplicationArn:
        Platform.OS === "android"
          ? "arn:aws:sns:ap-northeast-1:417403094756:app/GCM/android_dev"
          : "arn:aws:sns:ap-northeast-1:417403094756:app/APNS_SANDBOX/ios_dev",
      Token: deviceToken,
    }
    AWS.config = new AWS.Config()
    AWS.config.accessKeyId = "AKIAWCLZJY3SND3ZNLE3"
    AWS.config.secretAccessKey = "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"
    AWS.config.region = "ap-northeast-1"
    const endpointARN = await createARNAsync(endpointParams)
    console.log('endpointARN', endpointARN)
    if (!endpointARN) {
      throw new Error("error creating endpointARN")
    }
    const attributes = (await getAttributesAsync({
      EndpointArn: endpointARN,
    })) as any
    console.log("attributes:", attributes)

    if (attributes && !attributes.Enabled) {
      throw new Error("endpoint error")
    }
  } catch (e) {
    // create the endpoint again and store it
    // return 0;
  }
}
