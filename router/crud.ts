import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

const router = new Router();
router.use(bodyParser());

// 兼容REST

export default (server: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  server.use(async (ctx: Koa.Context, next: Koa.Next) => {
    router.post("/createOne", async (ctx: Koa.Context, next: Koa.Next) => {
      // console.log(ctx.request.body);
      // const res = await createOne();
      // ctx.body = res;
    });
    server.use(router.routes()).use(router.allowedMethods());

    await next();
  });
};
