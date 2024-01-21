import logo from './logo.svg';
import './App.css';
import {  Routes, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import JobDetails from './Pages/JobDetails/JobDetails';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/job/:id" element={<JobDetails/>} />
        <Route path="*" element={<NotFound/>}/>
        <Route path="/"  element={<Home/>}/>
    </Routes>
        {/* <Home/> */}
    
    </div>
  );
}

export default App;
