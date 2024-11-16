import React from 'react';
import {Outlet} from 'react-router-dom'
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
        <Header/>
        <div className='mt-16'>
            <Outlet />
        </div>
    </div>
  );
}

export default App;
