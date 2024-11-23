import { Layout } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { appFooterStyle, appHeaderStyle, gradientBackground } from './AppStyles';
import Home from './components/home/Home';
import WebPlayer from './components/player/WebPlayer';
import ViewPlaylist from './components/viewPlaylist/ViewPlaylist';
import NavBar from './NavBar';
import About from './pages/About';
import Callback from './pages/Callback';
import Playlists from './pages/Playlists';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignUps from './pages/SignUps';
import AuthProvider from './providers/authProvider';
import CommentsProvider from './providers/commentProvider';

const { Header, Content, Footer } = Layout;

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
            <CommentsProvider>
              {localStorage.getItem('accessToken') ? <WebPlayer subComp={true} /> : null}
            </CommentsProvider>
            <Content
              style={gradientBackground}>
              <ErrorBoundary fallback={<h1 style={{textAlign: "center"}}>Please reload</h1>}>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="search" element={ <Search /> } />
                  <Route path="profile" element={<Profile />} />
                  <Route path="callback" element={<Callback />} />
                  <Route path="playlists" element={<Playlists />} />
                  <Route path="ViewPlaylist" element={<ViewPlaylist />} />
                  <Route path="signups" element={<SignUps />} />
                  {/* <Route path="WebPlayer" element={<WebPlayer />} /> */}
                </Routes>     
              </ErrorBoundary>   
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
