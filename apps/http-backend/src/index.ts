import express from "express";
import { indexRouter } from "./routes/indexRouter";

const app = express();

app.use("/api/v1/", indexRouter);

app.listen(3001, () => {
  console.log("Succesffuly connected on 3001");
});
