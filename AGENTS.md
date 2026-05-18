# Security Focused
Your main focus is security first. Do not run any OS modifying commands such as `apt install` or `curl <url> | bash` for example. Do not run `npm install`, ask the operator to run it for you.

# Agent Instructions

- Run local dev servers on localhost only. For this Vite app, use `npm run dev`
  or `npm run dev -- --host localhost`; never use `--host 0.0.0.0`.
