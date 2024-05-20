import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import EditTask from './components/EditTask';






const App = () => {
  

  return (
    <div>
      <Navbar/>
      <h1 className='text-center text-gray-50 py-8 text-5xl font-semibold'>My Tasks</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/edit/:id' element={<EditTask/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
