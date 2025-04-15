/*
 * @Descripttion: test
 * @version: 0.0.1
 * @Author: Yangzongtai
 * @Date: 2025-03-14 20:41:29
 * @LastEditors: yzt
 * @LastEditTime: 2025-04-14 21:56:48
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

// 查询当前用户的支出 和收入列表
export async function IncomeList(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  console.log("params", params);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const page = params.page ? params.page * 1 : 1;
  try {
    let income_sql = "select *,date_format(create_time,'%Y-%m-%d') as create_time from income where user_id = ? order by create_time desc limit ?,10";
    let params = [user_id || null, (page - 1) * 10];
    const [income_rows]: [RowDataPacket[], unknown] = await connection.execute(income_sql, params);
    const [total]: [RowDataPacket[], unknown] = await connection.execute("select count(*) as total from income where user_id = ?", [user_id]);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: {
        income: income_rows || [],
        total: total[0].total,
      },
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
export async function ExpenseList(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  console.log("params", params);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const page = params.page ? params.page * 1 : 1;
  try {
    let expense_sql = "select *,date_format(create_time,'%Y-%m-%d') as create_time from expenses where user_id = ? order by create_time desc limit ?,10";
    let params = [user_id || null, (page - 1) * 10];
    const [total]: [RowDataPacket[], unknown] = await connection.execute(
      "select count(*) as total from expenses where user_id = ?",
      [user_id]
    );
    const [expense_rows]: [RowDataPacket[], unknown] = await connection.execute(expense_sql, params);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: {
        expense: expense_rows || [],
        total: total[0].total,
      },
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

// 添加一条 支出，收入，负债
export async function addIncomeAndExpenseAndLiability(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  console.log("params", params);
  const user_id = params.user_id ? params.user_id * 1 : null;
  const amount = params.amount ? params.amount * 1 : null;
  const money_type = params.money_type ? params.money_type : 'other'; // 货币类型
  const type = params.type ? params.type : null; // 类型
  const title = params.title ? params.title : null; // 标题
  const photo = params.photo ? params.photo : null; // 图片
  const remark = params.remark ? params.remark : null; // 备注
  // 负债独有
  const month_amount = params.month_amount ? params.month_amount * 1 : null;
  const residue_amount = params.amount ? params.amount * 1 : null;
  const status = params.status ? params.status : 1;
  try {
    let rows: [RowDataPacket[], unknown] = [[], undefined];
    if (type === "income") {
      // 收入
      let sql = "insert into income (user_id, amount, income_method, title, photo, note) values (?, ?, ?, ?, ?, ?)";
      let params = [user_id, amount, money_type, title, photo, remark];
      rows = await connection.execute(sql, params);

    } else if (type === "expense") {
      // 支出
      let sql = "insert into expenses (user_id, amount, payment_method, title, photo, note) values (?, ?, ?, ?, ?, ?)";
      let params = [user_id, amount, money_type, title, photo, remark];
      rows = await connection.execute(sql, params);
    } else if (type === "liability") {
      // 负债
      let sql = "insert into liability (user_id, residue_amount, month_amount, title, status, note) values (?, ?, ?, ?, ?, ?)";
      let params = [user_id, residue_amount, month_amount, title, status, remark];
      rows = await connection.execute(sql, params);
    } else if (type === "petals") {
      let sql = "insert into petals (user_id, amount, title, note) values (?, ?, ?, ?)";
      let params = [user_id, amount, title, remark];
      rows = await connection.execute(sql, params);
    } else {
      let sql = "insert into property (user_id, amount, m_title, note) values (?, ?, ?, ?)";
      let params = [user_id, amount, title, remark];
      rows = await connection.execute(sql, params);
    }
    console.log('*********', rows);

    ctx.body = {
      status: "success",
      message: "添加成功",
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

// 统计当前用户 当月 的支出的 金额
export async function expenseByMonth(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  try {
    // 查询当月支出
    let sql = `SELECT 
    SUM(amount) AS total_amount
    FROM
    expenses
    WHERE
    user_id = ? AND
    YEAR(create_time) = YEAR(CURRENT_DATE())
    AND MONTH(create_time) = MONTH(CURRENT_DATE());`;
    let query_params = [user_id];
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, query_params);
    console.log("rows***", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows[0].total_amount * 1 || 0,
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

// 统计当前用户 当月 的收入的 金额
export async function incomeByMonths(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  try {
    // 查询当月支出
    let sql = `SELECT 
    SUM(amount) AS total_amount
    FROM
    income
    WHERE
    user_id = ? AND
    YEAR(create_time) = YEAR(CURRENT_DATE())
    AND MONTH(create_time) = MONTH(CURRENT_DATE());`;
    let query_params = [user_id];
    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql, query_params);
    console.log("rows***66", rows);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: rows[0].total_amount * 1 || 0,
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

// 修改用户信息
export async function updateUserInfo(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.id ? params.id * 1 : null;
  const nickname = params.nickname ? params.nickname : null;
  const email = params.email ? params.email : null;
  const avatar = params.avatarUrl ? params.avatarUrl : null;
  const gender = params.sex !== undefined ? params.sex : null;
  const phone = params.phone ? params.phone : null;
  const address = params.address ? params.address : null;
  try {
    let sql = "update users set nickname = ?, email = ?, avatarUrl = ?, sex = ?, phone = ?, address = ? where id = ?";
    let params = [nickname, email, avatar, gender, phone, address, user_id];
    await connection.execute(sql, params);
    // 返回用户的信息
    let user_sql = "select * from users where id = ?";
    let user_params = [user_id];
    const [user_rows]: [RowDataPacket[], unknown] = await connection.execute(user_sql, user_params);
    ctx.body = {
      status: "success",
      message: "修改成功",
      code: 200,
      data: user_rows[0],
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
export async function ExpenseAndIncomeByMonth(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
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
      WHERE create_time >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) AND user_id = ${user_id}
      GROUP BY DATE_FORMAT(create_time, '%Y-%m')
    ) i ON m.month = i.month
    LEFT JOIN (
      -- 统计支出
      SELECT
        DATE_FORMAT(create_time, '%Y-%m') AS month,
        SUM(amount) AS expense_total
      FROM expenses
      WHERE create_time >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) AND user_id = ${user_id}
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

// 统计当月的支出、收入、负债、余额
export async function ExpenseAndIncomeByMonth2(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  try {
    // 统计当月的支出
    let sql1 = `SELECT SUM(amount) AS total_amount FROM expenses WHERE DATE_FORMAT(create_time, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') AND user_id = ${user_id};`
    let sql2 = `SELECT SUM(amount) AS total_amount FROM income WHERE DATE_FORMAT(create_time, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') AND user_id = ${user_id};`
    let sql3 = `SELECT SUM(month_amount) AS total_amount FROM liability WHERE DATE_FORMAT(create_time, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') AND user_id = ${user_id};`
    let sql4 = `SELECT SUM(amount) AS total_amount FROM property WHERE DATE_FORMAT(create_time, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') AND user_id = ${user_id};`
    const [rows1]: [RowDataPacket[], unknown] = await connection.execute(sql1);
    const [rows2]: [RowDataPacket[], unknown] = await connection.execute(sql2);
    const [rows3]: [RowDataPacket[], unknown] = await connection.execute(sql3);
    const [rows4]: [RowDataPacket[], unknown] = await connection.execute(sql4);


    console.log("rows***--*", rows1);
    ctx.body = {
      status: "success",
      message: "统计成功",
      code: 200,
      data: {
        income: rows2[0].total_amount || 0,
        expense: rows1[0].total_amount || 0,
        liability: rows3[0].total_amount || 0,
        property: rows4[0].total_amount || 0,
      }
    }
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

// 查询 本月支出最多的 前三笔
export async function ExpenseTop3(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  try {
    let sql = `
      SELECT
      *,
      date_format(create_time,'%Y-%m-%d %H:%i:%s') as create_time
      FROM expenses
      WHERE DATE_FORMAT(create_time, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') AND user_id = ${user_id}
      ORDER BY amount DESC
      LIMIT 3;`

    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql);

    console.log("rows***--*", rows);
    ctx.body = {
      status: "success",
      message: "查询成功",
      code: 200,
      data: rows,
    }
  }
  catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    };
  }
  finally {
    await connection.end();
  }
}

// 查询本月的 收入和支出列表，按时间倒叙
export async function ExpenseAndIncomeByMonthData(params: any, ctx: Context): Promise<any> {
  const connection: Connection = await mysql.createConnection(connectionConfig);
  const user_id = params.user_id ? params.user_id * 1 : null;
  try {
    let sql = `
    SELECT
    *,'income' AS type,
		date_format(create_time,'%m-%d %H:%i:%s') as c_times
FROM
    income
WHERE
    user_id = ${user_id}  -- 替换为当前用户ID
    AND DATE_FORMAT(create_time, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
UNION ALL
SELECT
		*,
    'expenses' AS type,
		date_format(create_time,'%m-%d %H:%i:%s') as create_time
FROM
    expenses
WHERE
    user_id = ${user_id}  -- 替换为当前用户ID
    AND DATE_FORMAT(create_time, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
ORDER BY create_time DESC;`

    const [rows]: [RowDataPacket[], unknown] = await connection.execute(sql);
    console.log("rows***--*", rows);
    ctx.body = {
      status: "success",
      message: "查询成功",
      code: 200,
      data: rows,
    }
  }
  catch (error: any) {
    console.log("error****", error);
    ctx.body = {
      status: "error",
      message: error.message,
      code: 400,
    }
  }
  finally {
    await connection.end();
  }
}
