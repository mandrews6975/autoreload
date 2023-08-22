#!/usr/bin/env node

import { program } from "commander";
import { start } from "./commands/start";
import { reload } from "./commands/reload";

program
  .name("autoreload")
  .description("Simple, universal auto-reload development server")
  .version("1.0.0");

program
  .command("start <port> <child_process>")
  .description("start the development server on <port> with <child_process>")
  .option(
    "-d, --debounce [milliseconds]",
    "duration since the previous reload to prevent reload of the child process",
    "1000"
  )
  .action(start);

program
  .command("reload <port>")
  .description(
    "reload the child process on the development server listening on <port>"
  )
  .action(reload);

program.parse();
