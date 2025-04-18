import React from 'react'
import './roles.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const Roles = () => {
  return (
    <>
  <div class="gallery">
    <div>
  <img src="/images/mentorss.jpg" alt="a wolf" />
  <Link to="/signup?content=1">
  <Button variant='contained' sx={{border:'3px solid ',fontSize:{xs:'2vmax',md:'1.2vmax'},width:{xs:'24vmax', md:'18vmax'},height:{xs:'6vmax', md:'3vmax'},position:'absolute', top:'50%', left:'50%',fontWeight:700, transform:"translate(-50%,-50%)","&:hover":{
    border:'3px solid white',
    color:'white'
  }}}>As mentor</Button>
  </Link>
  </div>
  <div>
  <img src="/images/students.jpg" alt="a lioness" />
  <Link to='/signup?content=0'>
  <Button  variant='contained' sx={{border:'3px solid ',fontSize:{xs:'2vmax',md:'1.2vmax'},width:{xs:'24vmax', md:'18vmax'},height:{xs:'6vmax', md:'3vmax'},position:'absolute', top:'50%', left:'50%',fontWeight:700, transform:"translate(-50%,-50%)","&:hover":{
    border:'3px solid white',
    color:'white'
  }}}>As student</Button>
  </Link>
  </div>
</div>


    </>
  )
}

export default Roles