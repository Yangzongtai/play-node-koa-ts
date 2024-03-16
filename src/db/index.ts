/*
 * @Author: Yongxin Donald
 * @Date: 2024-03-16 10:05:26
 * @LastEditors: Yongxin Donald
 * @LastEditTime: 2024-03-16 16:57:27
 * @FilePath: \fontback\db\index.ts
 * @Description: 
 * Copyright (c) 2024 by Donald/Yongxin, All Rights Reserved.
 */

import mysql, { Connection, RowDataPacket } from 'mysql2/promise'
import { Context } from 'koa'
import { validNull } from '../utils'

const connectionConfig = {
    host: 'localhost',
    user: 'superY',
    password: 'yang',
    database: 'testdb'
}

interface ReqParams{
    page:  string,
    pagesize:  string
    name?: string
}
// 分页查询+按 name 查询
export async function queryUsers(params: ReqParams):Promise<RowDataPacket[]> {
    const connection: Connection = await mysql.createConnection(connectionConfig)
    
    const  page  = parseInt(params.page) || 1
    const  pagesize  = parseInt(params.pagesize) || 10
    const name = params.name || ''
    const offset = (page - 1) * pagesize
    const [rows]: [ RowDataPacket[], unknown] = await connection.execute(`select * from users where name like ? limit ${pagesize} offset ${offset}`, [`%${name}%`])
    // console.log('*********', rows);
    
    await connection.end()

    return rows
}

interface User{
    name: string,
    age?: number
}
// 添加一条
export async function RegisterUser(params:User, ctx: Context):Promise<any> {
    const connection: Connection = await mysql.createConnection(connectionConfig)
    try {
        // 先查询是否已存在
        const [rows]: [ RowDataPacket[], unknown]= await connection.execute('select * from users where name=?', [params.name])
        console.log('查找到的', rows);
        
        if(rows && rows.length){
            ctx.body = {
                status: 'error',
                msg: '用户已存在!',
                code: 400
            }
            return
        }
        // 不存在就插入
        await connection.execute('insert into users (name, age) values (?, ?)', [params.name, params.age])
        const [user]: [ RowDataPacket[], unknown]= await connection.execute('select * from users where name=?', [params.name])
        ctx.body = {
            status: 'success',
            msg: '注册成功',
            data: user[0],
            code: 200
        }
    } catch (error: any) {
        ctx.body = {
            status: 'error',
            msg: error.message,
            code: error.errno || 400
        }
        return error
    } finally {
        await connection.end()
    }
    
}

// 根据id删除
export async function DeleteUser(params:{ id: number}, ctx: Context) {
    const connection: Connection = await mysql.createConnection(connectionConfig)
    try {
        // 查询是否存在
        const [rows]: [ RowDataPacket[], unknown]= await connection.execute('select * from users where id=?', [params.id])
        
        if(rows && rows.length){
            // 存在就删除
            await connection.execute('delete from users where id=?', [params.id])
            
            ctx.body = {
                status: 'success',
                msg: '删除成功',
                code: 200
            }
            return
        }
        
        ctx.body = {
            status: 'error',
            msg: '用户不存在!',
            code: 400
        }
    } catch (error: any) {
        ctx.body = {
            status: 'error',
            msg: error.message,
            code: error.errno || 400
        }
        return error
    } finally {
        await connection.end()
    }
}

interface UserInfo{
    username: string,
    password: string
    email: string
}
// 新注册的一个表--注册用户
export async function newRegister(params: UserInfo, ctx: Context) {
    // 创建数据库连接
    const connection: Connection = await mysql.createConnection(connectionConfig)
    try {
        // 获取传入的字段数据
        const { username, password, email } = params
        // 空字段存放
        let emptyKey: any[] = []
        emptyKey.push(validNull('username',username ),validNull('password',password ),validNull('email',email ))
        emptyKey =  emptyKey.filter(item=> item !== '')
        if(emptyKey.length){
            // 必填字段，不填报错
            ctx.body = {
                status: 'error',
                msg: `${emptyKey.join()} 为必填字段!`,
                code: 1003
            }
            return
        }

        // 查询是否存在
        const [rows]: [ RowDataPacket[], unknown] = await connection.execute('select * from uses where username like ?', [`%${params.username}%`])
        if(rows && rows.length){
            ctx.body = {
                status: 'error',
                msg: '不可重复注册!',
                code: 400
            }
            return
        }
        // 到这里就执行注册
        await connection.execute('insert into uses (username, password, email) values(?, ?, ?)', [username, password, email])
        ctx.body = {
            status: 'success',
            msg: '注册成功',
            code: 200
        }

    } catch (error) {
        
    }
}  
