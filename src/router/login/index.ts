/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 08:36:13
 * @LastEditors: Yongxin Donald
 * @LastEditTime: 2024-03-16 17:20:40
 * @FilePath: \fontback\src\router\login\index.ts
 * @Description: 
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
import Koa, { Context } from 'koa' // @types/koa
import Router from 'koa-router'
import { queryUsers, RegisterUser, DeleteUser, newRegister } from '../../db'

const app: Koa = new Koa()
const router: Router = new Router()

app.use(async (ctx: Context, next: Koa.Next) => {
    ctx.body = '-'
    await next()
})

// 获取用户列表
router.get('/home', async (ctx: Context)=>{
    try {
        const query: any = ctx.query
        console.log('查询参数', query);
        
        const users = await queryUsers(query)
        ctx.body = users
    } catch (error) {
        console.error('err', error)
        ctx.body = 'Internal server error';
    }
})

// + 注册用户
router.post('/register', async (ctx: Context)=>{
    try {
        const params: any = ctx.request.body
        console.log('请求的', params);
        
        await RegisterUser(params, ctx)
    } catch (error) {
        console.error('err', error)
        ctx.body = 'Internal server error';
    }
})

// - 根据 用户 id 删除 用户
router.delete('/delete', async (ctx: Context)=>{
    try {
        const params: any = ctx.request.body
        console.log('请求的', params);
        
        await DeleteUser(params, ctx)
    } catch (error) {
        console.error('err', error)
        ctx.body = 'Internal server error';
    }
})

// 新注册接口
router.post('/newregister', async (ctx: Context)=>{
    try {
        const params: any = ctx.request.body
        console.log('注册的参数', params);
        
        await newRegister(params, ctx)
    } catch (error) {
        console.log('err', error);
        ctx.body = 'Internal server error'
    }
})

export default router
