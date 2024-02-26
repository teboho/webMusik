import React from 'react';
import { List } from 'antd';

const dataOne = [
    {
      commentText: 'Ant Design Title 1',
      date: new Date().toDateString()
    },
    {
      commentText: 'Ant Design Title 2',
      date: new Date().toDateString()
    },
    {
      commentText: 'Ant Design Title 3',
      date: new Date().toDateString()
    },
    {
      commentText: 'Ant Design Title 4',
      date: new Date().toDateString()
    },
];

const Comments = (props) => {
    return (
        <List
            itemLayout='horizontal'
            dataSource={dataOne}
            renderItem={(item, index) => {
                <List.Item key={`comment_${index}`}>
                <List.Item.Meta 
                    title={`${"Name"} | ${item.date}`}
                    description={item.commentText} 
                />
                </List.Item>
            }}
        />
    );
}

export default Comments;