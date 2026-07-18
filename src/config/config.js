export const config = {
  port: 8080,

  algorithm: "round-robin",

  targets: [
    "http://localhost:5001",
    "http://localhost:5002"
  ],
  healthCheck: {
  interval: 5000,
  timeout: 2000,
}
};