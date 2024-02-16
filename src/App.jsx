import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Layout, Anchor } from 'antd';

const { Header, Content, Footer, Side } = Layout;

function NavBar() {
  return (
    <Header
      style={{background: "whitesmoke"}}>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="about">About</Link></li>
        </ul>
      </nav>
    </Header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Footer style={{position: "absolute", bottom: 0, width:"100%" }}>Footer</Footer>
    </BrowserRouter>
  );
}

export default App;
