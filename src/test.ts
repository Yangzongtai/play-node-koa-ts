/*
 * @Author: Yongxin Donald
 * @Date: 2024-10-22 14:07:43
 * @LastEditors: yzt
 * @LastEditTime: 2024-10-22 14:42:49
 * @FilePath: \fontback\src\test.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
const jwt = require("jsonwebtoken");

const params = {
  username: "admin",
  password: "123456",
};
const secretKey = "yang998";
let token = jwt.sign(params, secretKey, { expiresIn: "30s" });
console.log(token);

token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3Mjk1NzkyOTgsImV4cCI6MTcyOTU3OTMyOH0.L6PN12UbVRQvZUyrF93h2Mt0pI5knZvg3qO1zZbtqdM";

const decoded = jwt.verify(token, secretKey, (err: any) => {
  if (err) {
    console.log(err.message);
  }
  return err;
});
console.log(decoded);

// const decoded = jwt.decode(token, { complete: true });
