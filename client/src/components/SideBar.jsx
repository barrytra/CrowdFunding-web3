import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

import {logo, sun} from "../assets"
import {navlinks} from "../constants"

const Icon = ({styles}) => (
  <div>

  </div>
)

const SideBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[vh93]'>
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32] imgUrl={logo}" />
      </Link>
    </div>
  )
}

export default SideBar