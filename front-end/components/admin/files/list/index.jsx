import { DeleteOutlined, DownloadOutlined, EditOutlined, FolderFilled, MoreOutlined } from '@ant-design/icons';
import { Button, Divider, List, Skeleton, Dropdown} from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const ListEl = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  const items = [
    {
        key: '1',
        label: (
            <a className='flex gap-x-2 items-center'>
                <DownloadOutlined className='text-violet-600' />
                Download
            </a>
        )
    },
    {
        key: '2',
        label: (
            <a className='flex gap-x-2 items-center'>
                <EditOutlined className='text-green-600' />
                Rename
            </a>
        )
    },
    {
        key: '3',
        label: (
            <a className='flex gap-x-2 items-center'>
                <DeleteOutlined className='text-rose-600' />
                Delete
            </a>
        )
    }
  ]


  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        backgroundColor: 'white'
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<FolderFilled className='text-lg text-amber-600' />}
                title={<a href="https://ant.design" className='font-semibold'>{item.name.last}</a>}
                description={
                    <div className='flex gap-x-4 text-xs'>
                        <label>Size : 120.30 Mb</label>
                        <label>Modified : {new Date().toLocaleDateString()}</label>
                    </div>
                }
              />
              <div>
                <Dropdown 
                    menu={{items}}
                    placement='bottomRight'
                    arrow
                >
                    <Button 
                        type="text"
                        shape="circle"
                        icon={<MoreOutlined />}
                        className='flex items-center justify-center'
                    />
                </Dropdown>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default ListEl;