import Elysia from "elysia";
import { argv } from "process";

const app = new Elysia();
let args = argv.slice(2);
console.log("args: ", args);

app.get("/", instance => {
  let port = instance.server!.port;
  let client = instance.request.headers.get("host");
  console.log("requested port:", port);
  console.log("Client ID:", client);
  return "You requested: " + port;
});

enum Result {
  Ok = "Success",
  Err = "Failure"
}

function startServer(args: String[]): Result {
  for (let port of args) {
    let portNum = Number(port);
    if ([undefined, NaN].includes(portNum) || typeof portNum != 'number') {
      console.error("Recieved Invalid port: ", port);
      return Result.Err;
    }
    app.listen(portNum, () => {
      console.log("Server started in port: ", portNum);
    })
  }
  return Result.Ok;
}

let res = startServer(args);
console.log("Response: ", res);
