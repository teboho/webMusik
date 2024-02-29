import { Button, Row, Col, Carousel, Space } from 'antd';
import { loginWithSpotify } from '../../utilities/Auth';
import musicNotes2 from './musicNotes2Cropped.png';
import vinyl from './webMusilkVinyl.gif';
import vinylGradient from './vinylGradient.gif';

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#111',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'whitesmoke',
};

const Welcome = ({loginWithSpotify}) => {
    const onChange = (currentSlide) => {
      console.log(currentSlide);
    };
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
                        <Button style={{
                            fontWeight: "bold"
                        }}
                        onClick={loginWithSpotify}>Login with Spotify</Button>
                    </div>
                </div>
                <Space />
                <div>
                    <img src={vinylGradient} alt="" style={{width: 400, height: "auto", marginLeft: "auto", marginRight: "auto", opacity: 0.5}} />
                </div>
            </Row>
                {/* <Row> */}
                    {/* <Carousel afterChange={onChange} style={{height: "50vh"}}>
                        <div>
                            <h3 style={contentStyle}>Play songs</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>View Playlists</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>View Queue</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>Search songs</h3>
                        </div>
                    </Carousel> */}
                {/* </Row> */}
        </>
    );
}

export default Welcome;