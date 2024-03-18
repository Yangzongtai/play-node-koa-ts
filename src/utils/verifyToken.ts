/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-18 09:16:45
 * @LastEditors: Yongxin Donald
 * @LastEditTime: 2024-03-18 11:03:41
 * @FilePath: \fontback\src\utils\verifyToken.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'
import Koa, { Context } from "koa"; // @types/koa

const secretKey = "yang998";
function verifyToken(req: any, res: any, next: Koa.Next, ctx: Context) {
  const token = req.headers.authorization;
  if (!token) {
    return {
      status: "err",
      msg: "Token is missing",
      code: 401,
    };
  }
  const verify = jwt.verify(token, secretKey, (err: any) => {
    if (err) {
      return {
        status: "err",
        msg: "Token is invalid",
        code: 1003,
      };
    }
    return {
      status: "success",
      msg: "Token is success",
      code: 200,
    };
  });
  return verify
}

export default verifyToken;
