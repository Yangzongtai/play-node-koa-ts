/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-18 14:39:04
 * @LastEditors: yzt
 * @LastEditTime: 2025-03-11 21:22:33
 * @FilePath: \fontback\src\router\upload\index.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
import Router from "koa-router";
import { Context } from "koa";
import koaBody from "koa-body";
import path from "path";
import fs from "fs";

const router: Router = new Router();

// 上传接口
router.post("/file", async (ctx: Context) => {
  console.log("上传的----", ctx.request.files);
  ctx.response.body = ctx.request.files;
   koaBody({
    multipart: true,
    patchKoa: true,
    formidable: {
      keepExtensions: true, // 保留文件后缀
      uploadDir: path.resolve(__dirname, "../../../public/uploads/"),
      maxFieldsSize: 10 * 1024 * 1024, // 文件大小
      onFileBegin: (name, file) => {
        console.log("上传的", name, file);

        //要保存到哪里
        const dir = path.resolve(__dirname, `../../../public/uploads/images/`);
        const dir2 = path.resolve(__dirname, `../../../public/uploads/flies/`);
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
        // 返回文件路径
        ctx.body = {
          status: "success",
          msg: "文件上传成功",
          code: 200,
          data: `http://localhost:8888/public/uploads/images/${file.newFilename}`,
        };
      },
    },
  })
});
// 文件查看
router.get("/file/", async (ctx: Context) => {
  console.log("查看的----", ctx.request.files);
  ctx.response.body = ctx.request.files;
});


export default router;
