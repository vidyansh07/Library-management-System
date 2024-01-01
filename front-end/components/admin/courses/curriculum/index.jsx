'use client';
import React, {useState, useEffect} from 'react';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import Layout from '@components/shared/layout';
import Files from '@components/admin/files/list';
import Uploader from '@components/admin/files/upload';

import {
    Button,
    Modal,
    Table,
    Drawer,
    Collapse, 
    theme
} from 'antd';
import { MenuOutlined, CaretRightOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';


const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    ),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const LessonContent = ()=>{
    const [fileDialog, setFileDialog] = useState(false);
    const lessonDataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const lessonColumns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];

    return (
        <div className='flex flex-col gap-y-6'>
            <Table dataSource={lessonDataSource} columns={lessonColumns} pagination={false} />
            <Button onClick={()=>setFileDialog(true)} icon={<PlusOutlined />} type="primary" className="flex items-center bg-green-500 w-fit" style={{borderRadius: 0}}>Media</Button>
            <Modal 
              open={fileDialog} 
              onCancel={()=>setFileDialog(false)} 
              footer={null}
            >
                <div className='flex flex-col gap-y-6'>
                  <Uploader />  
                  <Files />
                </div>
            </Modal>
        </div>
    );
}

const Lessons = ()=>{
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
    `;
    const getItems = (panelStyle) => [
    {
        key: '1',
        label: 'This is panel header 1',
        children: <LessonContent />,
        style: panelStyle,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: <LessonContent />,
        style: panelStyle,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: <LessonContent />,
        style: panelStyle,
    },
    ];

    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: '1px solid #f2f2f2',
    };

    return (
        <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{
            background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
    />
    )
}

const Cur = ({title}) => {
    const [drawerState, setDrawerState] = useState({
        open: false,
        title: null
    });
    const [open,setOpen] = useState(false);
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            title: 'Long text Long text Long text Long text Long text Long',
            lessons: 24,
            lastModified: new Date().toLocaleString()
        },
        {
            key: '2',
            title: 'Long text Long text Long text Long text Long text Long',
            lessons: 232,
            lastModified: new Date().toLocaleString()
        },
        {
            key: '3',
            title: 'Long text Long text Long text Long text Long text Long',
            lessons: 24,
            lastModified: new Date().toLocaleString()
        },
        {
            key: '4',
            title: 'Long text Long text Long text Long text Long text Long',
            lessons: 214,
            lastModified: new Date().toLocaleString()
        },
        {
            key: '5',
            title: 'Long text Long text Long text Long text Long text Long',
            lessons: 296,
            lastModified: new Date().toLocaleString()
        }
    ]);
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const columns = [
    {
      key: 'sort',
    },
    {
      title: 'Topics',
      dataIndex: 'title',
      key: 'title',
      render: (text)=><a href="#" onClick={()=>setDrawerState({
        title: text, 
        open: true,
        })}>{text}</a>
    },
    {
      title: 'Lessons',
      dataIndex: 'lessons',
      key: 'lessons'
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified'
    },
    {
      key: 'actions',
      render: ()=>(
          <div className='flex gap-x-4'>
              <Button 
                  icon={<EditFilled />}
                  className="flex justify-center items-center text-indigo-500 bg-indigo-50"
                  type="primary"
              />
              <Button 
                  icon={<DeleteFilled />}
                  className="flex justify-center items-center text-rose-500 bg-rose-50"
                  type="primary"
              />
          </div>
      )
    }
  ];

  return (
    <Layout
            title={title.split("-").join(" ")}
            subtitle="Add or remove curriculum topics and media files"
            toolbar={
                <Button 
                    onClick={()=>setOpen(true)}
                    size="large"
                    icon={<PlusOutlined />} 
                    className='flex items-center bg-green-500'
                    type="primary"
                    style={{borderRadius: 0}}
                >Add Section</Button>
            }
        >
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
        >
            <Table
            components={{
                body: {
                row: Row,
                },
            }}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            />
        </SortableContext>
        </DndContext>
        <Modal open={open} onCancel={()=>setOpen(false)}>
            <h1>Testing</h1>
        </Modal>
        <Drawer 
            title={drawerState.title}
            placement="right" 
            onClose={()=>setDrawerState({...drawerState, open: false})} 
            open={drawerState.open}
            width={1080}
            extra={<Button icon={<PlusOutlined />} type="primary" className="bg-violet-500 flex items-center" style={{borderRadius: 0}}>Add Lesson</Button>}
        >
            <Lessons />
        </Drawer>
    </Layout>
  );
};
export default Cur;