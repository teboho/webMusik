import { Button, Row, Col, Carousel, Space, Modal, Flex, ConfigProvider } from 'antd';
import { loginWithSpotify } from '../../utilities/Auth';
import musicNotes2 from './musicNotes2Cropped.png';
import vinyl from './webMusilkVinyl.gif';
import vinylGradient from './vinylGradient.gif';
import SignUp from '../SignUp';
import { useState } from 'react';

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#111',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'whitesmoke',
};

const Welcome = ({loginWithSpotify}) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <Row>
                <img src={musicNotes2} alt="" style={{width: "65%", height: "auto", marginLeft: "auto", marginRight: "auto"}} />
            </Row>
            <Row justify={"center"} style={{height: "100%", margin: "0 auto"}}>
                <div>
                    <div style={{
                        width: "fit-content",
                        margin: "0 auto", paddingRight: 100, paddingLeft: 50, paddingTop: 50
                    }}>
                        <h1>webMusik</h1>
                        <h3>Play music with your existing Spotify account</h3>
                        <p>Your spotify email address must be the approved one.</p>
                        <Flex gap="middle" wrap>
                            <Button 
                                type='primary' 
                                style={{ fontWeight: "bold" }}
                                onClick={loginWithSpotify}
                            >
                                Login with Spotify
                            </Button>
                            <Button onClick={() => setModalOpen(true)} type='dashed'>
                                Request Access
                            </Button>
                        </Flex>  
                    </div>
                    <Modal loading={false}
                        title="Request Access" open={modalOpen} footer={null} onCancel={() => setModalOpen(false)}>
                        <SignUp setModalOpen={setModalOpen} />
                    </Modal>
                </div>
                <Space />
                <div>
                    <img src={vinylGradient} alt="" style={{width: 400, height: "auto", marginLeft: "auto", marginRight: "auto", opacity: 0.5}} />
                </div>
            </Row>
        </>
    );
}

export default Welcome;