// 封装文章相关的接口函数
import { request } from '@/utils'

// 1.获取所有频道
export function getChannelsAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}