#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const start_1 = require("./commands/start");
const reload_1 = require("./commands/reload");
commander_1.program
    .name("autoreload")
    .description("Simple, universal auto-reload development server")
    .version("1.0.0");
commander_1.program
    .command("start <port> <child_process>")
    .description("start the development server on <port> with <child_process>")
    .option("-d, --debounce [milliseconds]", "duration since the previous reload to prevent reload of the child process", "1000")
    .action(start_1.start);
commander_1.program
    .command("reload <port>")
    .description("reload the child process on the development server listening on <port>")
    .action(reload_1.reload);
commander_1.program.parse();
