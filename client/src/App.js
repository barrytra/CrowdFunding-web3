import React from 'react'
import {Route, Routes} from "react-router-dom";
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CampaignDetails from './pages/CampaignDetails';
import CreateCampaign from './pages/CreateCampaign';
import Profile from './pages/Profile';


const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className='sm: flex hidden-mr-10 relative'>
        < SideBar/>
      </div>
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar/>

        <Routes>
          <Route path="/"element="Home"/>
        </Routes>
      </div>
    </div>
  )
}

export default App