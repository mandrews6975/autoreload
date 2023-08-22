import child_process from "child_process";
import http from "http";
import kill from "tree-kill";
import { validateInt } from "../utils/utils";

const startedMessage = "✅ Child process started\n";
const alreadyQueuedMessage = "🕒 Child process reload already queued\n";
const reloadQueuedMessage = "🕒 Child process reload queued\n";
const reloadedMessage = "✅ Child process reloaded\n";

export function start(port: any, command: string, options: any) {
  let debouncing = false;
  let delayedCall: Function | null;

  // Validate port number
  if (validateInt(port, "port") != null) {
    return;
  }

  // Validate debounce duration
  if (options == null) {
    console.log("debounce duration is null");
    return;
  }

  let { debounce } = options;
  if (validateInt(debounce, "debounce") != null) {
    return;
  }

  // Start the child process
  let childProcess = execCommand(command, () => console.log(startedMessage));

  // Create the server to listen for reload requests
  const server = http.createServer(async (_, res) => {
    // Don't queue up another reload if one is already requested
    if (delayedCall != null) {
      console.log(alreadyQueuedMessage);
      res.end(alreadyQueuedMessage);
      return;
    }

    // Queue up a reload if we are debouncing from the last reload
    if (debouncing) {
      delayedCall = async () => {
        childProcess = await reload(command, childProcess, res);
      };

      console.log(reloadQueuedMessage);
      res.end(reloadQueuedMessage);
      return;
    }

    // Reload the child process
    childProcess = await reload(command, childProcess, res);

    // Begin debouncing
    debouncing = true;
    setTimeout(() => {
      if (delayedCall != null) {
        delayedCall();
        delayedCall = null;
      }
      debouncing = false;
    }, debounce);
  });

  server.listen(port, () =>
    console.log(`✅ Development server listening on port ${port}`)
  );
}

function execCommand(
  command: string,
  callback: Function | undefined
): child_process.ChildProcess {
  return child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    console.log(stdout);
    console.log(stderr);

    if (callback != undefined) {
      callback();
    }
  });
}

async function reload(
  command: string,
  childProcess: child_process.ChildProcess,
  res: http.ServerResponse
): Promise<child_process.ChildProcess> {
  kill(childProcess.pid as number, (error) => {
    if (error) {
      console.log(error);
      return null;
    }

    childProcess = execCommand(command, () => console.log(reloadedMessage));
    res.end(reloadedMessage);
  });

  return childProcess;
}
