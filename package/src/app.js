import http from "node:http";
import { requestHandler } from "./core/requestHandler.js";

const app = http.createServer(requestHandler);

export default app;