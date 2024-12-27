type AppConfig = {
  apiBaseUrl: string;
};

const productionConfig: AppConfig = {
  apiBaseUrl: "https://statuspageapplication.onrender.com",
};

const stagingConfig: AppConfig = {
  apiBaseUrl: "http://localhost:3000",
};

function getConfig(): AppConfig {
  // @ts-ignore
  const environment = import.meta.env.VITE_ENV || "test";

  switch (environment) {
    case "production":
      return productionConfig;
    case "test":
      return stagingConfig;
    default:
      return stagingConfig;
  }
}

export const appConfig: AppConfig = getConfig();
