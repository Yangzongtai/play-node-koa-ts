/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-15 09:16:23
 * @LastEditors: Yongxin Donald
 * @LastEditTime: 2024-03-16 16:54:56
 * @FilePath: \fontback\router\index.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
// const Router = require('koa-router')
import Router from "koa-router";
import { Context } from "vm";
const router: Router = new Router();
import login from "./login";
import upload from "./upload";
import admin from "./admin";

router.get("/", async (ctx: Context) => {
  ctx.body = "//";
});
router.use("/login", login.routes());
router.use("/upload", upload.routes());
router.use("/admin", admin.routes());

// module.exports = router
export default router;
