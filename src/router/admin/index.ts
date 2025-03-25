/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 08:36:13
 * @LastEditors: yzt
 * @LastEditTime: 2025-03-23 15:15:32
 * @FilePath: \fontback\src\router\login\index.ts
 * @Description:
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
import Koa, { Context } from "koa"; // @types/koa
import Router from "koa-router";
import {
  DeleteUser,
  EditUser,
  RegisterUser,
  UserInfo,
} from "../../db";
import { addExpenses, DeleteExpenses, payOutList } from "../../db/pay";
import { addIncome, DeleteIncome, incomeList } from "../../db/income";
import { addPetals, DeletePetals, petalsList, updatePetals } from "../../db/petals";
import { addProperty, DeleteProperty, propertyList, updateProperty } from "../../db/property";
import { addLiability, DeleteLiability, liabilityList, updateLiability } from "../../db/liability";
import { incomeAndExpenseByMonth, incomeAndExpenseByMonthLine, incomeByMonth, totalExpense, totalIncome, totalLiability, totalProperty } from "../../db/home";
const app: Koa = new Koa();
const router: Router = new Router();

app.use(async (ctx: Context, next: Koa.Next) => {
  ctx.body = "-";
  await next();
});

// 新增用户// + 注册用户
router.post("/user/register", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await RegisterUser(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 编辑用户
router.post("/user/edit", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await EditUser(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 获取用户列表
router.get("/user/page", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数", query);

    await UserInfo(query, ctx);
    // ctx.body = users;
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 删除用户
router.post("/user/delete", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await DeleteUser(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// ----------------------------管理员支出明细--------------------------------
// 支出列表
router.get("/pay/page", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await payOutList(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 新增支出
router.post("/pay/add", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;

    await addExpenses(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 删除支出
router.post("/pay/delete", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await DeleteExpenses(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});
// ----------------------------管理员收入明细--------------------------------
// 支出列表
router.get("/income/page", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await incomeList(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 新增收入
router.post("/income/add", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;

    await addIncome(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 删除收入
router.post("/income/delete", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await DeleteIncome(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// ----------------------------管理员零花钱管理--------------------------------
// 零花钱列表
router.get("/petals/page", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await petalsList(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 新增零花钱
router.post("/petals/add", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;

    await addPetals(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 删除零花钱
router.post("/petals/delete", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await DeletePetals(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 修改零花钱
router.post("/petals/update", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await updatePetals(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// ----------------------------管理员资产管理--------------------------------
// 资产列表
router.get("/property/page", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await propertyList(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 新增资产
router.post("/property/add", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;

    await addProperty(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 删除资产
router.post("/property/delete", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await DeleteProperty(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 修改资产
router.post("/property/update", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await updateProperty(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// ----------------------------管理员负债管理--------------------------------
// 负债列表
router.get("/liability/page", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await liabilityList(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 新增负债
router.post("/liability/add", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;

    await addLiability(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 删除负债
router.post("/liability/delete", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await DeleteLiability(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 修改负债
router.post("/liability/update", async (ctx: Context) => {
  try {
    const params: any = ctx.request.body;
    console.log("请求的", params);

    await updateLiability(params, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// ----------------------------管理员首页--------------------------------
// 统计总收入
router.get("/income/total-money", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await totalIncome(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 统计总支出
router.get("/pay/total-money", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await totalExpense(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 统计总余额
router.get("/property/total-money", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await totalProperty(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 统计总负债
router.get("/liabilities/liabilities-total", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    await totalLiability(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

// 统计最近一年的收入和支出，按月份分别统计最近12个月的数据
router.get("/income/income-expense-by-month", async (ctx: Context) => {
  try {
    const query: any = ctx.query;
    console.log("查询参数**", query);

    // await incomeAndExpenseByMonth(query, ctx);
    await incomeByMonth(query, ctx);
  } catch (error) {
    console.error("err", error);
    ctx.body = "Internal server error";
  }
});

export default router;
