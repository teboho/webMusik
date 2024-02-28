import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Layout, Anchor } from 'antd';
import NavBar from './NavBar';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AuthProvider from './providers/authProvider';
import Callback from './pages/Callback';
import Playlists from './pages/Playlists';
import ViewPlaylist from './pages/ViewPlaylist';
import WebPlayer from './pages/WebPlayer';

const { Header, Content, Footer, Side } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AuthProvider>
          <Header 
              style={{
                  width: "100%",
                  background: "rgb(255,251,244)",
                  background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)"
              }} >
            <NavBar />
          </Header>
          <Content
              style={{
                  background: "rgb(255,251,244)",
                  background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)"
              }}>
            {localStorage.getItem('accessToken') ? <WebPlayer subComp={true} /> : null}
            
            <Content
              style={{
                  background: "rgb(255,251,244)",
                  background: "linear-gradient(90deg, rgba(255,251,244,1) 0%, rgba(255,247,233,1) 54%, rgba(255,255,255,1) 96%)"
              }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="search" element={ <Search /> } />
              <Route path="profile" element={<Profile />} />
              <Route path="callback" element={<Callback />} />
              <Route path="playlists" element={<Playlists />} />
              <Route path="ViewPlaylist" element={<ViewPlaylist />} />
              <Route path="WebPlayer" element={<WebPlayer />} />
            </Routes>      
            </Content>
          </Content>
          <Footer 
              style={{
                  position:"fixed", width: "100vw", bottom: 0, opacity: 0.5, marginTop: 50, zIndex: -100
              }} >
            <em>web</em>Musik
          </Footer>
        </AuthProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
