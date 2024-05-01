import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createArticleAPI, getArticleByIdAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    const [form] = Form.useForm();
    // 获取频道列表
    const { channelList } = useChannel()

    // 提交表单
    const onFinish = async (formData) => {
        // console.log(formData)
        // 校验封面类型是否和上传图片的数量一致
        if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
        // 1.按照接口文档的格式处理收集到的表单数据
        const reqData = {
            ...formData,
            cover: {
                type: imageType,
                images: imageList.map(item => item.response?.data?.url)
            }
        }
        // 2.调用接口提交
        await createArticleAPI(reqData)

        // 提交完成后表单重制
        form.resetFields();
    }

    // 上传图片
    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        // console.log('上传中', info)
        setImageList(info.fileList)
    }

    // 切换单图、三图
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        // console.log(e.target.value)
        setImageType(e.target.value)
    }

    // 通过id回到这个页面，编辑
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    useEffect(() => {
        // 获取id
        // console.log(articleId)
        // 根据id获取文章详情
        async function getArticleDetail() {
            const res = await getArticleByIdAPI(articleId)
            // 调用form实例方法，回填数据
            const { cover } = res.data
            form.setFieldsValue({
                ...res.data,
                type: cover.type,
            })
            // 回填封面类型
            setImageType(cover.type)
            // 回填图片数据
            setImageList(cover.images.map(url => {
                return { url }
            }))
        }

        articleId && getArticleDetail()
    }, [articleId, form])
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            name="image"
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onUploadChange}
                            maxCount={imageType}
                            fileList={imageList}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish