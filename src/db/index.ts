/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 10:05:26
 * @LastEditors: yzt
 * @LastEditTime: 2025-03-24 22:11:42
 * @FilePath: \fontback\src\db\index.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */

import mysql, { Connection, RowDataPacket } from "mysql2/promise";
import { Context } from "koa";
import { validNull } from "../utils";
import jwt = require("jsonwebtoken");

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "yang",
  database: "testdb",
};

interface ReqParams {
  page: string;
  pagesize: string;
  name?: string;
}
// 分页查询+按 name 查询
export async function queryUsers(params: ReqParams): Promise<RowDataPacket[]> {
  const connection: Connection = await mysql.createConnection(connectionConfig);

  const page = parseInt(params.page) || 1;
  const pagesize = parseInt(params.pagesize) || 10;
  const name = params.name || "";
  const offset = (page - 1) * pagesize;
  const [rows]: [RowDataPacket[], unknown] = await connection.execute(
    `select * from users where name like ? limit ${pagesize} offset ${offset}`,
    [`%${name}%`]
  );
  // console.log('*********', rows);

  await connection.end();

  return rows;
}

// 添加一条
export async function RegisterUser(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    // 先查询是否已存在, 查看手机号是否已存在
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(
      "select * from users where username=? or phone=?",
      [params.username || '', params.phone || '']
    );
    console.log("查找到的", rows);

    if (rows && rows.length) {
      ctx.body = {
        status: "error",
        message: "用户已存在!",
        code: 400,
      };
      return;
    }
    Object.entries(params).map(([key, value]) => [key, value === undefined ? null : value])
    // 不存在就插入
    await connection.execute("insert into users (username, avatarUrl, sex, password, email, phone, nickname, role, address) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      params.username,
      params.avatarUrl || '',
      params.sex,
      params.password || '123456',
      params.email || '',
      params.phone || '',
      params.nickname || '',
      params.role || '',
      params.address || ''
    ]);
    const [user]: [RowDataPacket[], unknown] = await connection.execute(
      "select * from users where username=?",
      [params.username]
    );
    ctx.body = {
      status: "success",
      message: "新增成功",
      data: user[0],
      code: 200,
    };
  } catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: error.errno || 400,
    };
    return error;
  } finally {
    await connection.end();
  }
}
// 编辑用户
export async function EditUser(params: any, ctx: Context) {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    // 查询是否存在
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(
      "select * from users where id=?",
      [params.id]
    );
    console.log("查到的", rows);
    if (rows && rows.length) {
      // 存在就更新
      await connection.execute("update users set username=?, avatarUrl=?, sex=?, password=?, email=?, phone=?, nickname=?, role=?, address=? where id=?", [
        params.username,
        params.avatarUrl,
        params.sex,
        params.password,
        params.email,
        params.phone,
        params.nickname,
        params.role,
        params.address,
        params.id
      ]);
      ctx.body = {
        status: "success",
        message: "更新成功",
        code: 200,
      };
    }
  } catch (error: any) {
    console.log("error***", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: error.errno || 400,
    };
  } finally {
    await connection.end();
  }
}

// 根据id删除
export async function DeleteUser(params: { id: number }, ctx: Context) {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    // 查询是否存在
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(
      "select * from users where id=?",
      [params.id]
    );
    console.log("查到的", rows);
    if (rows && rows.length) {
      // 存在就删除
      await connection.execute("delete from users where id=?", [params.id]);

      ctx.body = {
        status: "success",
        message: "删除成功",
        code: 200,
      };
      return;
    }

    ctx.body = {
      status: "error",
      message: "用户不存在!",
      code: 400,
    };
  } catch (error: any) {
    console.log("error***", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: error.errno || 400,
    };
    return error;
  } finally {
    await connection.end();
  }
}

interface UserInfo {
  username: string;
  password: string;
  email: string;
}
// 新注册的一个表--注册用户
export async function newRegister(params: UserInfo, ctx: Context) {
  // 创建数据库连接
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    // 获取传入的字段数据
    const { username, password, email } = params;
    // 空字段存放
    let emptyKey: any[] = [];
    emptyKey.push(
      validNull("username", username),
      validNull("password", password),
      validNull("email", email)
    );
    emptyKey = emptyKey.filter((item) => item !== "");
    if (emptyKey.length) {
      // 必填字段，不填报错
      ctx.body = {
        status: "error",
        message: `${emptyKey.join()} 为必填字段!`,
        code: 1003,
      };
      return;
    }

    // 查询是否存在
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(
      "select * from users where username like ?",
      [`%${params.username}%`]
    );
    if (rows && rows.length) {
      ctx.body = {
        status: "error",
        message: "不可重复注册!",
        code: 400,
      };
      return;
    }
    // 到这里就执行注册
    await connection.execute(
      "insert into users (username, password, email) values(?, ?, ?)",
      [username, password, email]
    );
    ctx.body = {
      status: "success",
      message: "注册成功",
      code: 200,
    };
  } catch (error) {
  } finally {
    await connection.end();
  }
}

interface LoginParams {
  username: string;
  password: string;
  email?: string;
}
const secretKey = "yang998"; // token的秘钥
export async function UserLogin(params: LoginParams, ctx: Context) {
  console.log("登录的参数", params);
  // 获取传入的字段数据
  const { username, password } = params;
  // 空字段存放
  let emptyKey: any[] = [];
  emptyKey.push(
    validNull("username", username),
    validNull("password", password)
  );
  emptyKey = emptyKey.filter((item) => item !== "");
  if (emptyKey.length) {
    // 必填字段，不填报错
    ctx.body = {
      status: "error",
      message: `${emptyKey.join()} 为必填字段!`,
      code: 1003,
    };
    return;
  }

  // 创建连接
  const connection: Connection = await mysql.createConnection(connectionConfig);
  //先查找用户存在
  const [rows]: [RowDataPacket[], unknown] = await connection.execute(
    // "select id,username,password,email,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time from users where username like ?",
    // [`%${params.username}%`]
    // 取出所有字段，格式化时间
    "select *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time,DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s') as login_time from users where username like ?",
    [`%${params.username}%`]
  );
  console.log("查到的用户", rows);
  if (!rows || !rows.length) {
    return (ctx.body = {
      status: "error",
      message: "该用户不存在!",
      code: 1001,
    });
  }
  if (rows[0].password !== password) {
    return (ctx.body = {
      status: "error",
      message: "用户密码错误!",
      code: 1003,
    });
  }
  const userId = rows[0].id;
  const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: "1h" });
  console.log("生成的token", token);
  delete rows[0].password;
  ctx.body = {
    status: "success",
    message: "登录成功",
    data: {
      ...rows[0],
      token,
    },
    code: 200,
  };
  // 更新用户登录时间
  await connection.execute(
    "update users set login_time = now() where id = ?",
    [userId]
  )

  await connection.end();
}

// 查所有用户
export async function UserLists(params: any, ctx: Context) {
  console.log("参数", params);
  // 获取传入的字段数据
  const page = params.page || 1;
  const pagesize = params.pagesize || 10;
  const offset = (page - 1) * pagesize;
  // 创建连接
  const connection: Connection = await mysql.createConnection(connectionConfig);
  //先查找用户存在
  const [rows]: [RowDataPacket[], unknown] = await connection.execute(
    `select id,username,email,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time from users limit ${pagesize} offset ${offset}`
  );
  console.log("查到的用户", rows);
  ctx.body = {
    status: "success",
    message: "查询成功",
    data: rows,
    code: 200,
  };

  await connection.end();
}

// 查所有用户
export async function UserInfo(params: any, ctx: Context) {
  console.log("参数", params);
  // 获取传入的字段数据
  const page = params.pageNum || 1;
  const pagesize = params.pageSize || 10;
  const nickname = params.nickname || "";
  const phone = params.phone || "";
  const offset = (page - 1) * pagesize;
  // 创建连接
  const connection: Connection = await mysql.createConnection(connectionConfig);
  //先查找用户存在
  // const [rows]: [RowDataPacket[], unknown] = await connection.execute(
  //   `select *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time,DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s') as login_time from users limit ${pagesize} offset ${offset}`
  // );

  const [rows]: [RowDataPacket[], unknown] = await connection.execute(
    `select *,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time,DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time,DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s') as login_time from users where username like ? and phone like ? limit ${pagesize} offset ${offset}`,
    [`%${nickname}%`, `%${phone}%`]
  );
  const [total]: [RowDataPacket[], unknown] = await connection.execute(
    "select count(*) as total from users where username like ? and phone like ?",
    [`%${nickname}%`, `%${phone}%`]
  );
  // 去除密码password字段
  rows.forEach((item: any) => {
    delete item.password;
  });
  console.log("查到的用户", rows);
  console.log("总条数", total);
  ctx.body = {
    status: "success",
    message: "查询成功",
    data: {
      data: rows,
      total: total[0].total,
    },
    code: 200,
  };

  await connection.end();
}
