import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes path="/" element="Layout">
        <Route index element={<Home />} />
        <Route path={"about"} element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
