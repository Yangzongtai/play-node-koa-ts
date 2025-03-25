/*
 * @Descripttion: test
 * @version: 0.0.1
 * @Author: Yangzongtai
 * @Date: 2025-03-14 20:41:29
 * @LastEditors: yzt
 * @LastEditTime: 2025-03-17 22:18:17
 */
import mysql, { Connection, RowDataPacket } from "mysql2/promise";
import { Context } from "koa";

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "yang",
  database: "testdb",
};

// 添加一条资产
export async function addProperty(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    Object.entries(params).map(([key, value]) => [key, value === undefined ? null : value])
    // 不存在就插入
    await connection.execute("insert into property (user_id, amount, m_title, note) values (?, ?, ?, ?)", [
      params.user_id,
      params.amount,
      params.m_title,
      params.note || ''
    ]);
    ctx.body = {
      status: "success",
      message: "新增成功",
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

// 根据id删除
export async function DeleteProperty(params: { id: number }, ctx: Context) {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    // 查询是否存在
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(
      "select * from property where id=?",
      [params.id]
    );
    console.log("查到的", rows);
    if (rows && rows.length) {
      // 存在就删除
      await connection.execute("delete from property where id=?", [params.id]);

      ctx.body = {
        status: "success",
        message: "删除成功",
        code: 200,
      };
      return;
    }

    ctx.body = {
      status: "error",
      message: "数据不存在!",
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

// 修改资产
export async function updateProperty(params: any, ctx: Context) {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    // 查询是否存在
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(
      "select * from property where id=?",
      [params.id]
    );
    if (rows && rows.length) {
      // 存在就修改
      await connection.execute("update property set amount=?, m_title=?, note=? where id=?", [
        params.amount,
        params.m_title,
        params.note,
        params.id
      ]);
      ctx.body = {
        status: "success",
        message: "修改成功",
        code: 200,
      };
      return;
    }
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
// 查询资产列表
export async function propertyList(params: any, ctx: Context) {
  console.log("参数-----", params);
  // 获取传入的字段数据
  const page = params.pageNum || 1;
  const pagesize = params.pageSize || 10;
  const user_id = params.user_id || null;
  const m_title = params.m_title || "";
  const offset = (page - 1) * pagesize;
  // 创建连接
  const connection: Connection = await mysql.createConnection(connectionConfig);

  // 根据 user_id 查询 ,返回users的用户名
  const [rows]: [RowDataPacket[], unknown] = await connection.execute(
    `select property.*,users.nickname AS nickname,DATE_FORMAT(property.create_time, '%Y-%m-%d %H:%i:%s') as create_time from property left join users on property.user_id = users.id where (property.user_id = ? OR ? IS NULL) and property.m_title like ? order by property.create_time desc limit ${pagesize} offset ${offset} `,
    [user_id, user_id, `%${m_title}%`]
  );
  const [total]: [RowDataPacket[], unknown] = await connection.execute(
    "select count(*) as total from property where (user_id = ? OR ? IS NULL) and m_title like ?",
    [user_id, user_id, `%${m_title}%`]
  );
  console.log("查到的支出明细", rows);
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
