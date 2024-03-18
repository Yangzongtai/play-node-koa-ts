/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 08:36:13
 * @LastEditors: Yongxin Donald
 * @LastEditTime: 2024-03-18 15:21:22
 * @FilePath: \fontback\src\index.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
import Koa, { Context } from "koa"; // @types/koa
import bodyParser from "koa-bodyparser";
import koaCors from 'koa-cors'
import router from "./router";
import verifyToken from "./utils/verifyToken";
import koaBody from "koa-body";
import path from "path";
import fs from "fs";

const app: Koa = new Koa();

app.use(async (ctx: Context, next: Koa.Next) => {
  // ctx.body = '-'
  console.log("目标", ctx.url);
  const excludeUrl = ["/login/newregister", "/login/login"];
  if (excludeUrl.includes(ctx.url)) return await next();
  const { status } = verifyToken(ctx.req, ctx.res, next, ctx);
  console.log("stats", status);

  if (status == "err") {
    ctx.body = {
      status: "error",
      msg: "Token is invalid",
      code: 1001,
    };
    return;
  }
  ctx.body = {
    status: "success",
    msg: "Token is success",
    code: 200,
  };
  await next();
});

// 上传的
app.use(
  koaBody({
    multipart: true,
    patchKoa: true,
    formidable: {
      keepExtensions: true, // 保留文件后缀
      uploadDir: path.resolve(__dirname, "../public/uploads"),
      maxFieldsSize: 10 * 1024 * 1024, // 文件大小
      onFileBegin: (name, file) => {
        //要保存到哪里
        const dir = path.resolve(__dirname, `../public/uploads/${name}`);
        // 是否存在文件夹
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        // if(name == 'img'){
        //     file.filepath = `${dir}/${file.newFilename}`
        // }else if(name == 'video'){
        //     file.filepath =
        // }
        file.filepath = `${dir}/${file.newFilename}`;
      },
    },
  })
);

app.use(koaCors())
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("This server is running on http://localhost:3000");
});
