/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 08:36:13
 * @LastEditors: Yongxin Donald
 * @LastEditTime: 2024-03-16 17:19:43
 * @FilePath: \fontback\src\app.ts
 * @Description: 
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */
import Koa, { Context } from 'koa' // @types/koa
import bodyParser from 'koa-bodyparser'
import router from './router'

const app: Koa = new Koa()

app.use(async (ctx: Context, next: Koa.Next) => {
    ctx.body = '-'
    await next()
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000, ()=>{
    console.log('This server is running on http://localhost:3000');
    
})