import Elysia from "elysia";
import { argv } from "process";

const app = new Elysia();
let args = argv.slice(2);
console.log("args: ", args);

app.get("/", instance => {
  let port = instance.server!.port;

  return "You requested: " + port;
});

enum Result {
  Ok,
  Err
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
