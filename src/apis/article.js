// 封装文章相关的接口函数
import { request } from '@/utils'

// 1.获取所有频道
export function getChannelsAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

// 2.提交文章表单
export function createArticleAPI(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data,
    })
}

// 编辑文章表单
export function updateArticleAPI(data) {
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'PUT',
        data,
    })
}

// 获取文章列表  
export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params,
    })
}

// 删除文章
export function deleteArticleAPI(articleId) {
    return request({
        url: `/mp/articles/${articleId}`,
        method: 'DELETE',
    })
}

// 获取指定文章
export function getArticleByIdAPI(articleId) {
    return request({
        url: `/mp/articles/${articleId}`,
        method: 'GET',
    })
}