import { Box, Typography } from '@mui/material'
import React from 'react'

const StudentCard = ({student}) => {
  return (
    <Box sx={{display:'flex',alignItems:'center', padding:'0 5vmax',flexDirection:{xs:"column", md:'row'}}}>
    <Box sx={{width:{xs:"100%",md:'70%'}, bgcolor:'var(--theme2)', borderRadius:'10px', overflow:'hidden', minHeight:'32vmax', m:'0 auto'}}>
        <Box sx={{position:'relative', width:'100%', height:'15vmax', bgcolor:'yellow', backgroundImage:`url(${student?.coverImg?.public_URI})`, backgroundRepeat:"no-repeat", backgroundPosition:'center',backgroundSize:"cover", mb:'80px'}}>
          
                <Box component={'img'} 
                  src={student?.avatar?.public_URI}
                  alt={student?.name}
                  sx={{width:'9vmax', height:'9vmax', borderRadius:'50%', position:'absolute', bottom:'-50px', left:'50%', transform:'translateX(-50%)', border:'5px solid var(--theme2)'}}
                ></Box>
           
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}> 
        <Typography><strong>Name:-</strong>{student?.name}</Typography>
        <Typography><strong>Email:-</strong>{student?.email}</Typography>
        <Typography><strong>Phone:-</strong>{student?.mobileNumber}</Typography>
        <Typography><strong>Verified:-</strong>{student?.verified ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Num Verified:-</strong>{student?.numVerified ? 'Yes' : 'No'}</Typography>
        <Typography><strong>Account Created On:-</strong>{student?.createdAt?.split('T')[0]}</Typography>
        </Box>
    </Box>
  
    </Box>
  )
}

export default StudentCard