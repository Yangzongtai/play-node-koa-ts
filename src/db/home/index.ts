/*
 * @Descripttion: test
 * @version: 0.0.1
 * @Author: Yangzongtai
 * @Date: 2025-03-14 20:41:29
 * @LastEditors: yzt
 * @LastEditTime: 2025-03-23 16:32:28
 */
import mysql, { Connection, RowDataPacket } from "mysql2/promise";
import { Context } from "koa";

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "yang",
  database: "testdb",
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,  // 允许执行多个 SQL 语句
};
const pool = mysql.createPool(connectionConfig);
// 统计总收入-- 可以根据时间段查询
export async function totalIncome(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const start_time = params.start_time ? params.start_time : null;
  const end_time = params.end_time ? params.end_time : null;
  try {
    let sql = "select sum(amount) as total_amount from income where (user_id = ? OR ? IS NULL)";
    let params = [user_id || null, user_id || null];
    if (start_time && end_time) {
      sql += " and (date_format(create_time, '%Y-%m-%d') between ? and ?)";
      params.push(start_time, end_time);
    }
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, params);
    // console.log("rows***", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows[0].total_amount || 0,
    };
  } catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    };
  } finally {
    await connection.end();
  }
}

// 统计总支出-- 可以根据时间段查询
export async function totalExpense(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const start_time = params.start_time ? params.start_time : null;
  const end_time = params.end_time ? params.end_time : null;
  try {
    let sql = "select sum(amount) as total_amount from expenses where (user_id = ? OR ? IS NULL)";
    let params = [user_id || null, user_id || null];
    if (start_time && end_time) {
      sql += " and (date_format(create_time, '%Y-%m-%d') between ? and ?)";
      params.push(start_time, end_time);
    }
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, params);
    // console.log("rows***", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows[0].total_amount || 0,
    };
  } catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    };
  } finally {
    await connection.end();
  }
}

// 统计总余额-- 可以根据时间段查询
export async function totalProperty(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const start_time = params.start_time ? params.start_time : null;
  const end_time = params.end_time ? params.end_time : null;
  try {
    let sql = "select sum(amount) as total_amount from property where (user_id = ? OR ? IS NULL)";
    let params = [user_id || null, user_id || null];
    if (start_time && end_time) {
      sql += " and (date_format(create_time, '%Y-%m-%d') between ? and ?)";
      params.push(start_time, end_time);
    }
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, params);
    // console.log("rows***", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows[0].total_amount || 0,
    };
  } catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    };
  } finally {
    await connection.end();
  }
}

// 统计总负债-- 可以根据时间段查询
export async function totalLiability(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const start_time = params.start_time ? params.start_time : null;
  const end_time = params.end_time ? params.end_time : null;
  try {
    let sql = "select sum(residue_amount) as total_amount from liability where (user_id = ? OR ? IS NULL)";
    let params = [user_id || null, user_id || null];
    if (start_time && end_time) {
      sql += " and (date_format(create_time, '%Y-%m-%d') between ? and ?)";
      params.push(start_time, end_time);
    }
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, params);
    // console.log("rows***", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows[0].total_amount || 0,
    };
  } catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    };
  } finally {
    await connection.end();
  }
}

// 统计最近一年的收入和支出，按月份分别统计最近12个月的数据
export async function incomeAndExpenseByMonth(params: any, ctx: Context): Promise<any> {
  // const connection: Connection = await mysql.createConnection(connectionConfig);
  // const user_id = params.user_id ? params.user_id * 1 : null;
  // const start_time = params.start_time ? params.start_time : null;
  // const end_time = params.end_time ? params.end_time : null;
  // try {
  //   let sql = "select date_format(create_time, '%Y-%m') as month, sum(amount) as total_amount from income where (user_id = ? OR ? IS NULL)";
  //   let params = [user_id || null, user_id || null];
  //   if (start_time && end_time) {
  //     sql += " and (date_format(create_time, '%Y-%m-%d') between ? and ?)";
  //     params.push(start_time, end_time);
  //   }
  //   const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, params);
  //   // console.log("rows***", rows);
  //   ctx.body = {
  //     status: "success",
  //     message: "统计成功",
  //     code: 200,
  //     data: rows,
  //   };
  // } catch (error: any) {
  //   console.log("error****", error);
  //   ctx.body = {
  //     status: "error",
  //     message: error.message,
  //     code: 400,
  //   };
  // } finally {
  //   await connection.end();
  // }
}

// 统计
// [
//   {
//     data:'2024-08',
//     income:1000,
//     expense:500,
//   },
//   {
//     data:'2024-09',
//     income:1000,
//     expense:500,
//   }
// ]

export async function incomeAndExpenseByMonthLine(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const start_time = params.start_time ? params.start_time : null;
  const end_time = params.end_time ? params.end_time : null;
  try {
    let sql = "select date_format(create_time, '%Y-%m') as month, sum(amount) as total_amount from income where (user_id = ? OR ? IS NULL)";
    let params = [user_id || null, user_id || null];
    if (start_time && end_time) {
      sql += " and (date_format(create_time, '%Y-%m-%d') between ? and ?)";
      params.push(start_time, end_time);
    }
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, params);
    // console.log("rows***", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows,
    };
  } catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    };
  } finally {
    await connection.end();
  }
}

// 直接统计最近12个月的收入数组
export async function incomeByMonth(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  try {
    let sql2 = `
    SELECT
  m.month AS data,
  IFNULL(i.income_total, 0) AS income,
  IFNULL(e.expense_total, 0) AS expense,
  IFNULL(i.income_total, 0) - IFNULL(e.expense_total, 0) AS net
FROM (
  -- 生成最近12个月的月份序列
  SELECT
    DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS month
  FROM (
    SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
    UNION SELECT 9 UNION SELECT 10 UNION SELECT 11
  ) AS numbers
) m
LEFT JOIN (
  -- 统计收入
  SELECT
    DATE_FORMAT(create_time, '%Y-%m') AS month,
    SUM(amount) AS income_total
  FROM income
  WHERE create_time >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
  GROUP BY DATE_FORMAT(create_time, '%Y-%m')
) i ON m.month = i.month
LEFT JOIN (
  -- 统计支出
  SELECT
    DATE_FORMAT(create_time, '%Y-%m') AS month,
    SUM(amount) AS expense_total
  FROM expenses
  WHERE create_time >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
  GROUP BY DATE_FORMAT(create_time, '%Y-%m')
) e ON m.month = e.month
ORDER BY m.month;`

    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql2);


    // console.log("rows***", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows,
    };
  } catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    };
  } finally {
    await connection.end();
  }
}
