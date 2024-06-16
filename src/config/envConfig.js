const envConfig = {
  publicApi: import.meta.env.VITE_PUBLIC_API || "http://localhost:5000",
};

export default envConfig;
