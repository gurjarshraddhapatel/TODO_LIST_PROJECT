
import Login from './component/Login';
import Register from './component/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './component/Dashboard';

const App = () => {

  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;