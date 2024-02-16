import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Layout, Anchor } from 'antd';
import NavBar from './NavBar';
import Search from './pages/Search';

const { Header, Content, Footer, Side } = Layout;

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<Search />} />
        <Route path="about" element={<About />} />
        <Route path="search" element={<Search />} />
      </Routes>
      <Footer style={{position: "fixed", bottom: 0, right: 0, opacity: 0.5 }}>&copy; 2014 @teboho </Footer>
    </BrowserRouter>
  );
}

export default App;
