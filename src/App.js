import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './component/button/Button.js'
import Header from './component/Header.js'
import Search from './component/Search.js'
import Like from './component/Like.js'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Search/>}/>
          <Route path="/likePage" element={<Like/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
