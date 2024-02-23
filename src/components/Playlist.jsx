import { Image, Card } from 'antd'
import { Meta } from 'antd/es/list/Item';

export default function Playlist({item}) {
    return (
        <Card
            // style={{width: "calc(100vw/3)", marginBottom: "1em"}}
            cover={<img
                alt={item.name}
                src={item.images[0].url}
            />}
        >
            {/* <h1 style={{color: item.primary_color}}>{item.name}</h1>
            <p>{item.description}</p> */}
            <Meta
                title={<a href=''>{item.name}</a>}
                description={item.description}
            />
        </Card>
    );
}