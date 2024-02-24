import { Image, Card } from 'antd'
import { Meta } from 'antd/es/list/Item';

export default function Playlist({item}) {
    return (
        <Card
            style={{maxWidth: 300}}
            cover={<img
                alt={item.name}
                src={item.images[0].url}
            />}
        >
            {/* <h1 style={{color: item.primary_color}}>{item.name}</h1>
            <p>{item.description}</p> */}
            <Meta
                title={<a href={`ViewPlaylist?id=${item.id}`}>{item.name}</a>}
                description={<p style={{textWrap: "pretty", wordWrap: "break-word"}}>{item.description}</p>}
            />
        </Card>
    );
}