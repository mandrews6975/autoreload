import http from "http";
import { validateInt } from "../utils/utils";

export async function reload(port: any) {
  // Validate port number
  if (validateInt(port, "port") != null) {
    return;
  }

  console.log(`Requesting reload on port ${port}`);

  http
    .get(`http://localhost:${port}/reload`, (res) => {
      res.on("data", (data) => console.log(data.toString()));
    })
    .on("error", console.log);
}
