"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const child_process_1 = __importDefault(require("child_process"));
const http_1 = __importDefault(require("http"));
const tree_kill_1 = __importDefault(require("tree-kill"));
const utils_1 = require("../utils/utils");
const startedMessage = "✅ Child process started\n";
const alreadyQueuedMessage = "🕒 Child process reload already queued\n";
const reloadQueuedMessage = "🕒 Child process reload queued\n";
const reloadedMessage = "✅ Child process reloaded\n";
function start(port, command, options) {
    let debouncing = false;
    let delayedCall;
    // Validate port number
    if ((0, utils_1.validateInt)(port, "port") != null) {
        return;
    }
    // Validate debounce duration
    if (options == null) {
        console.log("debounce duration is null");
        return;
    }
    let { debounce } = options;
    if ((0, utils_1.validateInt)(debounce, "debounce") != null) {
        return;
    }
    // Start the child process
    let childProcess = execCommand(command, () => console.log(startedMessage));
    // Create the server to listen for reload requests
    const server = http_1.default.createServer(async (_, res) => {
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
    server.listen(port, () => console.log(`✅ Development server listening on port ${port}`));
}
exports.start = start;
function execCommand(command, callback) {
    return child_process_1.default.exec(command, (error, stdout, stderr) => {
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
async function reload(command, childProcess, res) {
    (0, tree_kill_1.default)(childProcess.pid, (error) => {
        if (error) {
            console.log(error);
            return null;
        }
        childProcess = execCommand(command, () => console.log(reloadedMessage));
        res.end(reloadedMessage);
    });
    return childProcess;
}
