'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import Layout from '@components/shared/layout';
import Editor from '@components/shared/editor';
import {
    Form,
    Input,
    Select,
    Button,
    Card,
    Checkbox,
    List,
    Upload,
    Modal
} from 'antd';

import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
const {Option} = Select;


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const New = ()=>{
    const [editorLoading, setEditorLoading] = useState(true);
    const [editorValue, setEditorValue] = useState('');
    const categories = [
        {
            name: 'Frontend'
        },
        {
            name: 'Backend'
        },
        {
            name: 'Fullstack'
        }
    ]

    // Start upload code
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    // end upload code

    useEffect(()=>{
        setEditorLoading(false)
    },[])

    const onFinish = (values)=>{
        values.description = editorValue;
        console.log(values)
    }

    const UploadButton = ()=>{
        return (
            <div>
            <PlusOutlined />
            <div
                style={{
                marginTop: 8,
                }}
            >
                Upload
            </div>
            </div>
        )
    }

    return (
        <Layout
            title="New Course"
            subtitle="Create a course to start your new journey"
        >
            <div className='flex gap-6'>
                <div className='w-9/12'>
                    <Card title="Course Information">
                        <Form onFinish={onFinish} layout='vertical'>
                            <div className='flex gap-x-6'>
                                <Form.Item
                                    className='w-full'
                                    label="Course Title"
                                    name="title"
                                    rules={[{required: true, message: 'Course title is required'}]}
                                >
                                    <Input 
                                        placeholder='Reactjs course'
                                        size="large"
                                        style={{borderRadius: 0}}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Duration"
                                    name="duration"
                                    rules={[{required: true, message: 'Duration is required'}]}
                                >
                                    <Input
                                        type="number" 
                                        placeholder='3'
                                        size="large"
                                        style={{borderRadius: 0}}
                                        addonAfter={
                                            <Form.Item name="durationIn">
                                                <Select 
                                                    style={{minWidth: 100}} 
                                                    placeholder='Select'
                                                    size="large"
                                                >
                                                    <Option value="months">Months</Option>
                                                    <Option value="days">Days</Option>
                                                    <Option value="years">Years</Option>
                                                    <Option value="hours">Hours</Option>
                                                </Select>
                                            </Form.Item>
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='flex gap-x-6'>
                                <Form.Item
                                    className='w-full'
                                    label="Category"
                                    name="category"
                                    rules={[{required: true, message: 'Category is required'}]}
                                >
                                    <Select placeholder="Category" size="large">
                                        {
                                            categories.map((item,index)=>(
                                                <Option key={index} value={item.name.toLowerCase()}>
                                                    {item.name}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className='w-full'
                                    label="Price"
                                    name="price"
                                    rules={[{required: true, message: 'Price is required'}]}
                                >
                                    <Input 
                                        size="large"
                                        placeholder='00.00'
                                    />
                                </Form.Item>

                                <Form.Item
                                    className='w-full'
                                    label="Discount"
                                    name="discount"
                                    rules={[{required: true, message: 'Discount is required'}]}
                                >
                                    <Input 
                                        size="large"
                                        placeholder='25'
                                        addonAfter={<span className='font-semibold'>%</span>}
                                    />
                                </Form.Item>
                            </div>

                                <Form.Item
                                    className='w-full'
                                    label="Description"
                                    name="description"
                                >
                                    <Editor 
                                        loading={editorLoading}
                                        getValue={(value)=>setEditorValue(value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className='w-full'
                                    label="Thumbnail (1280 * 720)"
                                    name="thumbnail"
                                    rules={[{required: true, message: 'Thumbnail is required'}]}
                                >
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                    >
                                        {fileList.length === 0 && <UploadButton />}
                                    </Upload>
                                </Form.Item>

                                <div className='flex gap-x-6'>
                                    <Form.Item name="free" valuePropName="checked">
                                        <Checkbox>is Free ?</Checkbox>
                                    </Form.Item>

                                    <Form.Item name="live" valuePropName="checked">
                                        <Checkbox>is Live ?</Checkbox>
                                    </Form.Item>
                                </div>
                                
                                <Form.Item>
                                        <Button type="primary" className='bg-violet-600' size="large" htmlType='submit'>Create</Button>
                                </Form.Item>
                        </Form>
                    </Card>
                </div>
                <div className='w-3/12'>
                    <Card title="Category">
                        <Input
                            className='mb-2.5'
                            size="large"
                            placeholder="Category name"
                            suffix={<Button 
                                icon={<CheckOutlined className='text-white' />}
                                className='flex items-center justify-center bg-green-400'
                                type="text"
                                shape="circle"
                            />}
                            style={{borderRadius: 0}}
                        />
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={categories}
                            renderItem={(item) => (
                                <List.Item
                                actions={[
                                    <Button key="edit" type="text" className='text-blue-600'>Edit</Button>, 
                                    <Button key="delete" type="text" className='text-rose-600'>Delete</Button>
                                ]}
                                >
                                    {item.name}
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <Image
                    alt="preview"
                    width={0}
                    height={0}
                    layout="responsive"
                    src={previewImage}
                />
            </Modal>
        </Layout>
    )
}

export default New