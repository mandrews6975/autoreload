"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reload = void 0;
const http_1 = __importDefault(require("http"));
const utils_1 = require("../utils/utils");
async function reload(port) {
    // Validate port number
    if ((0, utils_1.validateInt)(port, "port") != null) {
        return;
    }
    console.log(`Requesting reload on port ${port}`);
    http_1.default
        .get(`http://localhost:${port}/reload`, (res) => {
        res.on("data", (data) => console.log(data.toString()));
    })
        .on("error", console.log);
}
exports.reload = reload;
