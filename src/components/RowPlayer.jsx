import { Layout, Anchor, Row, Col } from 'antd';

const RowPlayer = props => {
    return (
        <Row justify={'space-between'}  style={{width: "97vw"}}>
            <Col span={1}>pp</Col>
            <Col span={3}>
                <Row>Song name</Row>
                <Row>Artist name</Row>
            </Col>
            <Col span={1}>prev</Col>
            <Col span={1}>play/pause</Col>
            <Col span={1}>next</Col>
            <Col span={1}>like</Col>
            <Col span={1}>volume</Col>
            <Col span={1}>queue</Col>
      </Row>
    );
}