import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

new Elysia()
  .use(staticPlugin({ prefix: "/", assets: "./" })) // dont cd into /webserver
  .listen(process.env.PORT || 8080);

console.log(`Listening on port ${process.env.PORT || 8080} or`);
console.log(` │ 0.0.0.0:${process.env.PORT || 8080}`);
console.log(` │ 127.0.0.1:${process.env.PORT || 8080}`);
console.log(` └─────────────────────────>`);
