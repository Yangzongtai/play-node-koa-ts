/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 08:36:13
 * @LastEditors: yzt
 * @LastEditTime: 2024-07-02 17:45:52
 * @FilePath: \fontback\src\index.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
import Koa, { Context } from "koa"; // @types/koa
import bodyParser from "koa-bodyparser";
import KoaCors from "koa2-cors";
import router from "./router";
import verifyToken from "./utils/verifyToken";
import koaBody from "koa-body";
import path from "path";
import fs from "fs";

const app: Koa = new Koa();

// token 拦截校验
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
        console.log("上传的", name, file);

        //要保存到哪里
        const dir = path.resolve(__dirname, `../public/uploads/images`);
        const dir2 = path.resolve(__dirname, `../public/uploads/flies`);
        // 是否存在文件夹
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        if (!fs.existsSync(dir2)) {
          fs.mkdirSync(dir2);
        }
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
          file.filepath = `${dir}/${file.newFilename}`;
        } else {
          file.filepath = `${dir2}/${
            file.originalFilename || file.newFilename
          }`;
        }
      },
    },
  })
);

// 后端解决跨域
app.use(KoaCors()); // 也可以设置 ctx.set({Access-Control-Allow-Origin: "*" })
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("This server is running on http://localhost:3000");
});
