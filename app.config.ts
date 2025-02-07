import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "glipitio-expo",
  slug: "glipitio-expo",
  extra: {
    STRAPI_URL: "http://172.20.10.4:1337",
    API_TOKEN:
      "e44b0fca02e30c26c85519cd37ce424be7f639e6dc4ed64908a599b4c838abf1f110d193e82a56920352b9d6ce5695ab80cd7f96e11fd261ce9d76abc973afcb910463285ba3bd240f8b4038a9ab4fc7752827837d361ae51af75231295fa2777084a94bc8a1bd6315c19929ffdd03ca9a71068a738bf62aa1d27df274112e03"
  }
});
