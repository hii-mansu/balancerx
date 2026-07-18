import app from "./src/app.js";
import { checkAllTargets } from "./src/health/healthChecker.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`BalancerX running on PORT ${PORT}`);

  await checkAllTargets();

  setInterval(checkAllTargets, 5000);
});