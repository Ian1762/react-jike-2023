// 用户相关的请求

import { request } from '@/utils'

// 用户登录

export function loginAPI(data) {
    return request({
        method: 'POST',
        url: '/authorizations',
        data
    })
}

// 获取用户信息

export function getUserInfoAPI() {
    return request({
        method: 'GET',
        url: '/user/profile'
    })
}