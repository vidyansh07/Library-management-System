'use client'
import Layout from '@components/shared/layout';
import {Button, Table, Tag, Dropdown} from 'antd';
import {CrownOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FireOutlined, MoreOutlined, PlusOutlined, StarOutlined} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const courseDesign = (text,obj)=>{
    return (    
        <div className='flex gap-x-4'>
            <Image 
                src={obj.thumbnail}
                width={120}
                height={120}
                alt={obj.thumbnail}
            />
            <div>
                <Link href={`/admin/courses/${obj.title.toLowerCase().split(" ").join("-")}`}>
                    <h1 className='capitalize font-semibold text-[16px]'>{obj.title}</h1>
                </Link>
                <div  className='flex gap-x-1 items-center text-sm text-gray-500'>
                    { obj.level === "beginner" && <FireOutlined /> }
                    { obj.level === "intermediate" && <StarOutlined /> }
                    { obj.level === "advanced" && <CrownOutlined /> }
                    <p className='capitalize'>{obj.level}</p>
                </div>
            </div>
        </div>
    )
}

const actionDesign = (text,obj)=>{
    const items = [
        {
            key: '1',
            label: (
                <Link legacyBehavior href={`/admin/courses/${obj.title.toLowerCase().split(" ").join("-")}`}>
                    <a className="flex gap-x-2 items-center">
                        <EyeOutlined className="text-green-500" />
                        View
                    </a>
                </Link>
            )
        },
        {
            key: '2',
            label: (
                <a className="flex gap-x-2 items-center" target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <EditOutlined className='text-violet-500' />
                    Edit
                </a>
            )
        },
        {
            key: '3',
            label: (
                <a className="flex gap-x-2 items-center" target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <DeleteOutlined className='text-rose-500' />
                   Delete
                </a>
            )
        }
    ]

    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomLeft"
            arrow
            >
            <Button icon={<MoreOutlined />} className='flex items-center justify-center' type="text" />
        </Dropdown>
    )
}

const Courses = ()=>{
    const dataSource = [
        {
            key: '1',
            title: 'gatsby tutorial in hindi',
            thumbnail: '/images/gatsby.jpg',
            level: 'beginner',
            students: 515151,
            rating: 4.5,
            status: 'live',
            action: ''
        },
        {
            key: '2',
            title: 'nodejs rest api',
            thumbnail: '/images/node.jpg',
            level: 'intermediate',
            students: 1141474,
            rating: 3.5,
            status: 'pending',
            action: ''
        },
        {
            key: '3',
            title: 'laravel fullstack',
            thumbnail: '/images/laravel.jpg',
            level: 'beginner',
            students: 5155551,
            rating: 3,
            status: 'live',
            action: ''
        },
        {
            key: '4',
            title: 'sass level builder',
            thumbnail: '/images/sass.jpg',
            level: 'advanced',
            students: 515151,
            rating: 4.5,
            status: 'live',
            action: ''
        },
        {
            key: '5',
            title: 'wordpress development',
            thumbnail: '/images/wordpress.jpg',
            level: 'beginner',
            students: 1181818,
            rating: 5,
            status: 'pending',
            action: ''
        }
    ]
    const columns = [
        {
            title: 'Courses',
            dataIndex: 'title',
            key: 'title',
            render: courseDesign
        },
        {
            title: 'Students',
            dataIndex: 'students',
            key: 'students',
            render: (text)=>text.toLocaleString('en-US')
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text)=><Tag color='#ffc700' className='capitalize'>{text}</Tag>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: actionDesign
        }
    ]


    const Toolbar = ()=>{
        return (
            <Link href="/admin/courses/new">
                <Button 
                    size="large" 
                    type="primary" 
                    className='bg-indigo-600 flex items-center'
                    style={{borderRadius: 0}}
                    icon={<PlusOutlined />}
                >
                    New Course
                </Button>
            </Link>
        )
    }


    return (
        <Layout
            title="Courses"
            subtitle="Start you journey by creating a course"
            toolbar={<Toolbar />}
        >
            <div>
                <Table dataSource={dataSource} columns={columns} />;
            </div>
        </Layout>
    )
}

export default Courses;