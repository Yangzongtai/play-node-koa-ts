/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-18 14:39:04
 * @LastEditors: yzt
 * @LastEditTime: 2024-07-02 17:22:41
 * @FilePath: \fontback\src\router\upload\index.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
import Router from "koa-router";
import { Context } from "koa";

const router: Router = new Router();

// 上传接口
router.post("/upload", async (ctx: Context) => {
  console.log("上传的----", ctx.request.files);
  ctx.response.body = ctx.request.files;
});

export default router;
