'use client'
import Logo from '../shared/logo';
import {Form, Button, Input, Divider} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const {Item} = Form;

const Login = ()=>{

    const onFinish = (values)=>{
        console.log(values)
    }

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className="animate__animated animate__zoomIn animate__faster bg-white rounded-lg border p-8 md:w-4/12 w-11/12 flex flex-col gap-y-4">
                <div className='flex items-center'>
                    <h1 className='text-2xl font-semibold'>Say Hi !</h1>
                    <Logo />
                </div>
                
                <Form onFinish={onFinish}>
                    <Item
                        name="email"
                        rules={[
                            {required: true, message: 'This field is required'}
                        ]}
                    >
                        <Input size="large" style={{borderRadius: 0}} placeholder='Email*' />
                    </Item>
                    <Item>
                        <Button 
                            htmlType='submit'
                            size="large" 
                            style={{borderRadius: 0}} 
                            className='w-full bg-indigo-900 text-white border-indigo-900 font-semibold'
                        >Login</Button>
                    </Item>
                </Form>
                
                <Divider>OR</Divider>

                <Button 
                    className='flex items-center justify-center py-6 font-semibold'
                    icon={<Image src="/icons/google.png" width={32} height={32} alt="google" />}
                >
                    Continue with Google
                </Button>
                
                <Button 
                    className='flex items-center justify-center py-6 font-semibold'
                    icon={<Image src="/icons/facebook.png" width={32} height={32} alt="google" />}
                >
                    Continue with Facebook
                </Button>

                <Divider />
                <div className='flex gap-x-2 justify-center'>
                    <p>Don`t have an account ?</p>
                    <Link href="/register" legacyBehavior>
                        <a className='text-indigo-900 font-semibold'>Register now</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login