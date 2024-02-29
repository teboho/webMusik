import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import About from './pages/About';
import { Layout, Anchor } from 'antd';
import NavBar from './NavBar';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AuthProvider from './providers/authProvider';
import Callback from './pages/Callback';
import Playlists from './pages/Playlists';
import WebPlayer from './components/player/WebPlayer';
import { appFooterStyle, appHeaderStyle, gradientBackground } from './AppStyles';
import ViewPlaylist from './components/viewPlaylist/ViewPlaylist';

const { Header, Content, Footer, Side } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AuthProvider>
          <Header 
              style={appHeaderStyle} >
            <NavBar />
          </Header>
          <Content
              style={gradientBackground}>
            {localStorage.getItem('accessToken') ? <WebPlayer subComp={true} /> : null}
            
            <Content
              style={gradientBackground}>
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
              style={appFooterStyle} >
            <em>web</em>Musik
          </Footer>
        </AuthProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
