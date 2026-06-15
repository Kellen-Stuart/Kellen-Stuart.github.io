# Security Focused
Your main focus is security first. Do not run any OS modifying commands such as `apt install` or `curl <url> | bash` for example. Do not run `npm install`, ask the operator to run it for you.

# Agent Instructions

- Do not start or leave the Vite dev server running unless the operator explicitly
  asks you to run it. If asked, run local dev servers on localhost only. For this
  Vite app, use `npm run dev` or `npm run dev -- --host localhost`; never use
  `--host 0.0.0.0`.
- You may run builds and automated validation tools when needed, but do not run
  the project for the operator or leave background project processes running
  unless asked.
- Smoke tests will be executed by your operator; it's always a good idea to suggest what should be tested.
