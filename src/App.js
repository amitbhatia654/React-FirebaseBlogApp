import './App.css';
import { Route, Routes } from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import Home from './components/Home';

function App() {
  return (
    <div >
      <Navbar></Navbar>

      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/createPost' element={<CreatePost></CreatePost>}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>

    </div>
  );
}

export default App;
