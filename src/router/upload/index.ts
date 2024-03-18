import Router from "koa-router";
import { Context } from "koa";

const router: Router = new Router();

// 上传接口
router.post("/upload", async (ctx: Context) => {
  console.log("上传的", ctx.request.files);
  ctx.response.body = ctx.request.files;
});

export default router;
