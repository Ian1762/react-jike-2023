// 用户相关的请求

import { request } from '@/utils'

// 用户登录

export function loginAPI(data) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data
    })
}

// 获取用户信息

export function getUserInfoAPI() {
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}