import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

if (!extra) {
  throw new Error("Missing configuration in app.config.ts");
}

export const config = {
  STRAPI_URL: extra.STRAPI_URL as string,
  API_TOKEN: extra.API_TOKEN as string
};
