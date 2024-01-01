'use client';
import {useState} from 'react';
import { EditFilled, PlusOutlined, UserOutlined } from '@ant-design/icons';
import Layout from '@components/shared/layout'
import {
    Card,
    Form,
    Input,
    Button,
    Tag,
    Empty,
    Modal,
    Avatar
} from 'antd';

const Settings = ()=>{
    const [status,setStatus] = useState([]);
    const [open,setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const bankAccount = (values)=>{
        console.log(values)
    }

    const createStatus = (values)=>{
        setStatus([...status,values])
        setOpen(false);
    }

    return (
        <Layout
            title="Configuration"
            subtitle="Config and edit your lms settings"
        >
            <div className="grid grid-cols-3 gap-8">
                <Card 
                    type="inner" 
                    title={<h1 className='text-lg font-semibold'>Profile</h1>}
                    className='col-span-3'
                    extra={
                        <Button icon={<EditFilled />} className='flex items-center justify-center' type="text" onClick={()=>setEdit(!edit)} />
                    }
                >
                    <div className='flex flex-col gap-y-8'>
                        <div className='flex items-center gap-x-6'>
                            <Avatar size={64} icon={<UserOutlined />} className='flex items-center justify-center' />
                            <div>
                                <h1 className='text-lg font-semibold'>Er Saurav</h1>
                                <p className='text-gray-500'>ersaurav@gmail.com</p>
                            </div>
                        </div>

                        <Form className='grid grid-cols-2 gap-x-16' layout="vertical">
                            <Form.Item
                                label="Fullname"
                                name="fullname"
                            >
                                <Input defaultValue="Er saurav" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input defaultValue="example@gmail.com" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            <Form.Item
                                label="Country"
                                name="country"
                            >
                                <Input defaultValue="India" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            <Form.Item
                                label="Gender"
                                name="gender"
                            >
                                <Input defaultValue="Male" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            {
                                edit && 
                                <Form.Item>
                                    <div className='flex gap-x-2'>
                                        <Button size="large" htmlType='submit' type="primary" className='bg-rose-500'>Save</Button>

                                        <Button size="large" htmlType='button' type="primary" className='bg-blue-500' onClick={()=>setEdit(false)}>Cancel</Button>
                                    </div>
                                </Form.Item>
                            }
                            
                        </Form>
                    </div>
                </Card>

                <Card 
                    type="inner" 
                    title={<h1 className='text-lg font-semibold'>Domain</h1>}
                    className='col-span-2'
                >
                    <div className='flex flex-col items-center py-4'>
                        <Empty
                            className='flex flex-col items-center'
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 80,
                            }}
                            description={<span>Add your domain for your own branding and identity</span>}
                        >
                            <Button type="primary" style={{borderRadius: 0}} className='bg-violet-500' size="large">Connect</Button>
                        </Empty>
                    </div>
                </Card>

                <Card type="inner" title={<h1 className='text-lg font-semibold'>Status</h1>}>
                    <div>
                        {
                            status.length === 0 && <Empty />
                        }
                        {
                            status.map((item,index)=>(
                                <Tag key={index} color={item.color} className='capitalize mb-2'>{item.title}</Tag>                               
                            ))
                        }
                    </div>
                    <Button 
                        icon={<PlusOutlined />} 
                        className={`flex items-center bg-amber-500 mt-4 ${status.length === 0 && 'mx-auto'}`} 
                        type="primary" 
                        style={{borderRadius: 0}}
                        onClick={()=>setOpen(true)}
                    >Add</Button>
                </Card>

                <Card type="inner" title={<h1 className='text-lg font-semibold'>KYC & Bank Account</h1>}>
                    <Form onFinish={bankAccount}>
                        <Form.Item
                            name="beneficiaryName"
                            rules={[{
                                required: true,
                                message: 'Beneficiary name is required'
                            }]}
                        >
                            <Input 
                                size="large"
                                style={{borderRadius: 0}}
                                placeholder="Account holder name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="acNo"
                            rules={[{
                                required: true,
                                message: 'Account number is required'
                            }]}
                        >
                            <Input 
                                size="large"
                                style={{borderRadius: 0}}
                                placeholder="Account number"
                            />
                        </Form.Item>

                        <Form.Item
                            name="ifsc"
                            rules={[{
                                required: true,
                                message: 'IFSC is required'
                            }]}
                        >
                            <Input 
                                size="large"
                                style={{borderRadius: 0}}
                                placeholder="IFSC Code"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit' size="large" type="primary" className='bg-indigo-500' style={{borderRadius: 0}}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <Modal open={open} title="New status" onCancel={()=>setOpen(false)} footer={null}>
                <Form onFinish={createStatus}>
                    <Form.Item
                        name="title"
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        name="color"
                        rules={[{required: true}]}
                    >
                        <Input type="color" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" className='bg-green-500'>Create</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    )
}

export default Settings;