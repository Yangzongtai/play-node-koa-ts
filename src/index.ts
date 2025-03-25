/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 08:36:13
 * @LastEditors: yzt
 * @LastEditTime: 2025-03-12 21:34:29
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
import koaStatic from "koa-static";
const app: Koa = new Koa();

// 提供静态文件访问
app.use(koaStatic(path.resolve(__dirname, "../public")));
// 前端使用的静态地址是http://localhost:8888/public/uploads/images/

// token 拦截校验
app.use(async (ctx: Context, next: Koa.Next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "*");
  // ctx.body = '-'
  console.log("目标", ctx.url);
  const excludeUrl = ["/login/newregister", "/login/login", "/", "/upload/file",'/^/public/uploads/'];
  if (excludeUrl.includes(ctx.url)) return await next();
  const { status } = verifyToken(ctx.req, ctx.res, next, ctx);
  console.log("stats", status);

  if (status == "err") {
    ctx.body = {
      status: "error",
      msg: "Token is invalid",
      code: 401,
    };
    return;
  }
  ctx.body = {
    status: "success",
    msg: "Token is success",
    code: 200,
  };
  console.log("ctx.body", ctx.body);
  await next();
});

// 上传的
app.use(
  koaBody({
    multipart: true,
    patchKoa: true,
    formidable: {
      keepExtensions: true, // 保留文件后缀
      uploadDir: path.resolve(__dirname, "../public/uploads/"),
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

// 返回上传的文件地址
app.use(async (ctx: Context, next: Koa.Next) => {
  if (ctx.method === 'POST' && ctx.url === '/upload/file') {
    
    const file = ctx.request.files?.file as any;
    const filename = path.basename(file.filepath);
    const protocol = ctx.request.protocol;
    const host = ctx.request.host;
    
    ctx.body = {
      url: `${protocol}://${host}/uploads/images/${filename}`,
    };
    // await next();
  } else {
    await next();
  }
});
// 后端解决跨域
app.use(
  KoaCors({
    origin: "*",
    credentials: false,
    allowMethods: ["GET", "POST"],
  })
); // 也可以设置 ctx.set({Access-Control-Allow-Origin: "*" })
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
  console.log("This server is running on http://localhost:8888");
});
