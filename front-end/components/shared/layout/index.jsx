'use client'
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import Logo from '../logo';
import Link from 'next/link';
import { Layout, Button, Menu, Breadcrumb, Dropdown, Badge, Avatar } from 'antd';
import {
    DashboardOutlined,
    VideoCameraOutlined,
    PicCenterOutlined,
    FileDoneOutlined,
    UserOutlined,
    AlertOutlined,
    SettingOutlined,
    MailOutlined,
    BellOutlined,
    LogoutOutlined
} from '@ant-design/icons';
const {Sider, Content, Header} = Layout

const LayoutEl = ({children, title=null, subtitle=null, toolbar=null})=>{
    const pathname = usePathname()
    const [open,setOpen] = useState(false);

    const menus = [
        {
            label: <Link href="/admin">{'Dashboard'}</Link>,
            key: '/admin',
            icon: <DashboardOutlined />
        },
        {
            label: <Link href="/admin/students">{'Students'}</Link>,
            key: '/admin/students',
            icon: <UserOutlined />
        },
        {
            label: <Link href="/admin/courses">{'Courses'}</Link>,
            key: '/admin/courses',
            icon: <VideoCameraOutlined />
        },
        {
            label: <Link href="/admin/files">{'Files & Media'}</Link>,
            key: '/admin/files',
            icon: <FileDoneOutlined />
        },
        {
            label: <Link href="/admin/sales">{'Sales & Revenue'}</Link>,
            key: '/admin/sales',
            icon: <AlertOutlined />
        },
        {
            label: <Link href="/admin/settings">{'Settings'}</Link>,
            key: '/admin/settings',
            icon: <SettingOutlined />
        },
    ]

    const items = [
        {
            key: '1',
            label: (
                <Link href="#" legacyBehavior>
                    <a className='flex items-center gap-x-2'>
                        <UserOutlined />
                        Profile
                    </a>
                </Link>
            )
        },
        {
            key: '2',
            label: (
                <Link href="#" legacyBehavior>
                    <a className='flex items-center gap-x-2'>
                        <SettingOutlined />
                        Settings
                    </a>
                </Link>
            )
        },
        {
            key: '3',
            label: (
                <Link href="#" legacyBehavior>
                    <a className='flex items-center gap-x-2'>
                        <LogoutOutlined />
                        Logout
                    </a>
                </Link>
            )
        }
    ]

    /*
    if(loader) return (
        <div className="flex min-h-screen items-center justify-center">
            <Spin size="large" />
        </div>
    )
        */
       
    const breadItems = ()=>{
        const items = pathname.split("/").map((item,index)=>(
            {title: <Link href={pathname.split(`/${item}`)[0]+`/${item}`}>{item}</Link>}
        ))

            console.log(items)

        return items;
    }

    return (
        <Layout className='min-h-screen'>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={open}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >
                <div className='py-4'>
                    <Logo color="white" />
                </div>
                <Menu theme="dark" items={menus} selectedKeys={[pathname]} /> 
            </Sider>
            <Layout style={{marginLeft: 200}}>
                <Header 
                    className="h-20 bg-white flex justify-between px-6 items-center shadow-sm"
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%'
                    }}
                >
                    <div className='flex items-center gap-x-6'>
                        <Button 
                            onClick={()=>setOpen(!open)} 
                            icon={<PicCenterOutlined />} 
                            style={{
                                width: 40,
                                height: 40
                            }}
                            className="flex items-center justify-center"
                        />
                        <div>
                            {
                                title && 
                                <h1 className='capitalize text-lg font-semibold'>{title}</h1>
                            }
                            {
                                subtitle && 
                                <p className='text-sm text-zinc-500'>{subtitle}</p>
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-x-4'>
                        {toolbar}
                        <Button 
                            shape="circle"
                            size="large"
                            type="text"
                            icon={<MailOutlined className='text-green-600' />} 
                            className='flex items-center justify-center bg-green-100'
                        />
                        <Button 
                            shape="circle"
                            size="large"
                            type="text"
                            icon={
                            <Badge count={12}>
                                <BellOutlined className='text-orange-600' />
                            </Badge>    
                            } 
                            className='flex items-center justify-center bg-orange-100'
                        />
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Dropdown>
                    </div>
                </Header>
                <Content className="px-8 py-6 flex flex-col gap-y-6 bg-gray-200">
                    <Breadcrumb items={breadItems()} />
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutEl;