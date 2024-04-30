import { useState, useEffect } from "react"
import { getChannelsAPI } from '@/apis/article'

// 封装频道列表的hooks
const useChannel = () => {
    // 获取频道列表
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        // 1.封装函数 在函数内调用接口
        const getChannelList = async () => {
            const res = await getChannelsAPI()
            setChannelList(res.data.channels)
        }
        // 2.调用函数
        getChannelList()
    }, [])

    return {
        channelList
    }
}

export { useChannel }