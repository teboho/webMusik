import { Image, Card } from 'antd'
import { Meta } from 'antd/es/list/Item';
import { Link } from 'react-router-dom';

export default function Playlist({item}) {
    return (
        <Card
            style={{maxWidth: 300, height: 500}}
            cover={<img
                alt={item.name}
                src={item.images[0].url}
            />}
        >
            {/* <h1 style={{color: item.primary_color}}>{item.name}</h1>
            <p>{item.description}</p> */}
            <Meta
                title={<Link to={`/ViewPlaylist?id=${item.id}`}>{item.name}</Link>}
                description={<p style={{textWrap: "pretty", wordWrap: "break-word", overflowY: 'hidden', }}>{item.description}</p>}
            />
        </Card>
    );
}