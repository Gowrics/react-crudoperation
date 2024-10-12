import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './screen/Home';
import Create from './screen/Create';
import Update from './screen/Update';
import Read from './screen/Read';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='create' element={<Create/>}></Route>
      <Route path='update/:id' element={<Update/>}></Route>
      <Route path='read/:id' element={<Read/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
