export const config = {
  port: 5000,

  algorithm: "least-connections",

  targets: [
    "http://localhost:5001",
    "http://localhost:5002"
  ],
  healthCheck: {
  interval: 5000,
  timeout: 5000,
}
};