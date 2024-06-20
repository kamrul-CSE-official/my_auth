const envConfig = {
  publicApi: import.meta.env.VITE_PUBLIC_API || "http://localhost:5000/api/v1",
};

export default envConfig;
