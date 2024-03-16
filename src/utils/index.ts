// 判断字段是否为空
export const validNull = (key: string, data: any)=>{
    if(!data || data == '') return key
    return ''
}