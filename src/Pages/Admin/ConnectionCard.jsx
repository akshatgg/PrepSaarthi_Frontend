import { Box, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';  
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const ConnectionCard = ({connection}) => {
  return (
    // <div>{connection?.studentDetails?.name}</div>
    <Box sx={{display:'flex',alignItems:'center', padding:'0 5vmax',flexDirection:{xs:"column", md:'row'}}}>
    <Box sx={{width:{xs:"100%",md:'30%'}, bgcolor:'var(--theme2)', borderRadius:'10px', overflow:'hidden', minHeight:'32vmax'}}>
        <Box sx={{position:'relative', width:'100%', height:'15vmax', bgcolor:'yellow', backgroundImage:`url(${connection?.studentDetails?.coverImg?.public_URI})`, backgroundRepeat:"no-repeat", backgroundPosition:'center',backgroundSize:"cover", mb:'80px'}}>
          
                <Box component={'img'} 
                  src={connection?.studentDetails?.avatar?.public_URI}
                  alt={connection?.studentDetails?.name}
                  sx={{width:'9vmax', height:'9vmax', borderRadius:'50%', position:'absolute', bottom:'-50px', left:'50%', transform:'translateX(-50%)', border:'5px solid var(--theme2)'}}
                ></Box>
           
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}> 
        <Typography><strong>Name:-</strong>{connection?.studentDetails?.name}</Typography>
        <Typography><strong>Email:-</strong>{connection?.studentDetails?.email}</Typography>
        <Typography><strong>Phone:-</strong>{connection?.studentDetails?.mobileNumber}</Typography>
        </Box>
    </Box>
    <Box sx={{width:'40%', bgcolor:'white', textAlign:'center', display:'flex', flexDirection:{xs:'column', md:'row'}, alignItems:'center', justifyContent:'center'}}><ArrowBackIcon sx={{display:{xs:'none', md:'block'}}}/><ArrowForwardIcon  sx={{display:{xs:'none', md:'block'}}}/><ArrowUpwardIcon sx={{display:{xs:'block', md:'none'}}}/><ArrowDownwardIcon  sx={{display:{xs:'block', md:'none'}}}/></Box>
    <Box sx={{width:{xs:"100%",md:'30%'}, bgcolor:'var(--theme2)', borderRadius:'10px', overflow:'hidden', minHeight:'32vmax'}}>
    <Box sx={{position:'relative', width:'100%', height:'15vmax', bgcolor:'yellow', backgroundImage:`url(${connection?.mentorDetails?.coverImg?.public_URI})`, backgroundRepeat:"no-repeat", backgroundPosition:'center',mb:'80px', backgroundSize:"cover"}}>
          
          <Box component={'img'} 
            src={connection?.mentorDetails?.avatar?.public_URI}
            alt={connection?.mentorDetails?.name}
            sx={{width:'9vmax', height:'9vmax', borderRadius:'50%', position:'absolute', bottom:'-50px', left:'50%', transform:'translateX(-50%)',border:'5px solid var(--theme2)'}}
          ></Box>
     
  </Box>
  <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}> 
  <Typography><strong>Name:-</strong>{connection?.mentorDetails?.name}</Typography>
  <Typography><strong>Email:-</strong>{connection?.mentorDetails?.email}</Typography>
  <Typography><strong>Phone:-</strong>{connection?.mentorDetails?.mobileNumber}</Typography>
  <Typography><strong>College:-</strong>{connection?.mentorDetails?.collegeName}</Typography>
  <Typography><strong>Rank:-</strong>{connection?.mentorDetails?.exam?.name}({connection?.mentorDetails?.exam?.rank})</Typography>
  <Typography sx={{fontStyle:"initial"}}><strong>Status:-</strong>{connection?.mentorDetails?.mentoringStatus}</Typography>
  <Typography><strong>Role:-</strong>{connection?.mentorDetails?.role === 'user' ? "Not Approved Mentor":connection?.mentorDetails?.role}</Typography>
    </Box>
    </Box>
    </Box>
  )
}

export default ConnectionCard