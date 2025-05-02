import { app } from "./src/app.js";
import { PORT } from "./src/constant.js";
import { dbConnect } from "./src/db/index.js";
// import serverless from 'serverless-http'

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  dbConnect();
});
