import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewConnection, clearError, findConnectionByMob, findMentorByMob, reset, swapConnection } from "../../action/userAction";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";


const ManageConnection = () => {
    const [mentorId, setMentorId] = useState("")
    const [StuPhn, setStuPhn] = useState("")
    const [StuPhnSwap, setStuPhnSwap] = useState("")
    const [menPhnSwap, setMenPhnSwap] = useState("")
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState(1)
    const [price, setPrice] = useState('')
    const [clicked, setClick] = useState(false)
    const [isError, setError] = useState(false)
    const dispatch = useDispatch()
    const {loading,error,success,message} = useSelector(state => (state.newConnection))
    const {loading:connLoad,error:conError,activeConnection,name,stuId} = useSelector(state => (state.getConnectonMob))
    const {loading:menLoad,error:menError,mentor} = useSelector(state => (state.getMentorMob))
    const {loading:swapLoad,error:swapError,success:swapSuccess} = useSelector(state => (state.swapConnection))
    useEffect(() => {
      if(StuPhnSwap.length === 10){
        dispatch(findConnectionByMob({mobileNumber:StuPhnSwap}))
      }
    }, [StuPhnSwap])
    useEffect(() => {
      if(menPhnSwap.length === 10){
        activeConnection?.map((item) => {
          if(item?.mentorDetails?.mobileNumber === menPhnSwap){
            setError(true);
          }else{
            dispatch(findMentorByMob({mobileNumber:menPhnSwap}))
          }
        })
      }else{
        setError(false)
      }
    }, [menPhnSwap])

    useEffect(() => {
     if(success){
        toast.success(message)
        dispatch(reset())
     }   
     if(swapSuccess){
      toast.success("Mentorship is successfully swapped")
      dispatch(reset())
     }
     if(swapError){
        toast.error(swapError.message)
        dispatch(clearError())
     }
     if(menError){
        toast.error(menError.message)
        dispatch(clearError())
     }
     if(error){
        toast.error(error.message)
        dispatch(clearError())
     }
     if(conError){
      toast.error(conError.message)
      dispatch(reset())
      dispatch(clearError())
     }
    }, [success,message, dispatch, error, conError,swapSuccess,swapError,menError])
  return (
    <>
      <Box sx={{ maxWidth: "100vw",overflow:"hidden"}}>
        <TextField
          name="mentor"
          required
          value={mentorId}
          onChange={(e) => {
            setMentorId(e.target.value);
          }}
          id="menId"
          label="Mentor's Id"
        />
        <TextField
          name="student"
          required
          value={StuPhn}
          onChange={(e) => {
            setStuPhn(e.target.value);
          }}
          
          id="stuPhn"
          label="Student's Phone"
        />
        <TextField
          name="price"
          required
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          
          id="Price"
          label="Mentorship Price"
        />
          <Select
          labelId="duration"
          id="duration"
          value={duration}
          label="Duration"
          onChange={(e) => {
            setDuration(e.target.value);
          }}        >
          <MenuItem value={1}>Weekly</MenuItem>
          <MenuItem value={3}>Monthly</MenuItem>
        </Select>
          <input type="datetime-local" id="birthdaytime" name="birthdaytime" value={time} onChange={(e) => setTime(e.target.value)}/>
          <LoadingButton loading={loading} onClick={() => {
            dispatch(addNewConnection({id:mentorId,phnNo:StuPhn,duration:duration,time:time, price:price}))
          }}>Add New Connection</LoadingButton>
      </Box>

      <Box>
        <Typography component={'p'} sx={{fontWeight:600, fontSize:{xs:'2.4vmax', md:'1.5vmax'}, mt:{xs:'1.8vmax', md:'4vmax'}}}>Swap Connection</Typography>
        <Box>
        <TextField
          name="mentor"
          required
          value={StuPhnSwap}
          onChange={(e) => {
            setStuPhnSwap(e.target.value);
          }}
          disabled={connLoad}
          id="stuPhnConn"
          label="Student's Phone"
          sx={{margin:{xs:'2vmax 0',md:'0.5vmax 0'}}}
          inputProps={{maxLength : 10}}
        />
        <CircularProgress sx={!connLoad ? {display:'none'}:{display:'block'}} />
        </Box>
        <Box sx={(connLoad === false && activeConnection?.length > 0 && StuPhnSwap.length === 10) ? {height:'auto', transition:'0.5s'}:{height:0, transition:'0.5s',overflow:'hidden'}}>
       {connLoad === false &&  activeConnection?.map((item, i) => (
        <Box sx={{display:{xs:'block', md:'flex'}, alignItems:'center', gap:'1.5vmax'}}>
         <Card onClick={() => setClick(prev => !prev)} sx={clicked ? {maxWidth:{xs:"90vw", md:'25vw'},height:{xs:"26vmax",md:'10vmax'}, display:'flex', alignItems:'center', justifyContent:'center', border:'3px solid var(--theme2)',boxShadow:'inset 0px 5px 7px 1px rgba(0, 0, 0, .3)'}:{maxWidth:{xs:"90vw",md:'25vw'},height:{xs:"26vmax", md:"10vmax"}, display:'flex', alignItems:'center', justifyContent:'center'}}>
         <CardMedia
           sx={{ height: 100, width:100, borderRadius:'50%',ml:'10px' }}
           image={item?.mentorDetails?.avatar?.public_URI}
           title="green iguana"
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             {item?.mentorDetails?.name}
           </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             Purchase Date:-{item?.boughtAt?.split("T")[0]}
           </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             Expiration Date :-{item?.expiresIn?.split("T")[0]}
           </Typography>
         </CardContent>
        
       </Card>
       <Box sx={clicked ? {height:{xs:'20vmax', md:'10vmax'}, transition:'0.4s',display:{xs:'block', md:'flex'}, alignItems:'start', gap:'1.5vmax'} : {height:0, overflow:'hidden', transition:'0.4s'}}>
        <Box sx={{height:{xs:'20vmax', md:'10vmax'}}}>
       <Typography component={'p'} sx={{fontSize:{xs:"1.8vmax", md:'1vmax'}, margin:{xs:'2vmax 0', md :'1vmax 0'}}}>Enter the Mobile Number of the Mentor to Swap Current Mentorship</Typography>
        <TextField
          name="mentor"
          required
          value={menPhnSwap}
          onChange={(e) => {
            setMenPhnSwap(e.target.value);
          }}
          disabled={connLoad}
          id="mentorPhn"
          label="Mentor's Phone"
          inputProps={{maxLength : 10}}
          
        />
        <Typography display={(isError && menError===null) ? "block" : "none"} sx={{fontSize:'1.5vmax', color:'red'}}>Swapping Mentorship with same mentor is not possible</Typography>
        </Box>
        <Box sx={{height:{xs:'20vmax', md:'10vmax'}}}>
        <Typography display={(menLoad === false && mentor && menPhnSwap.length === 10) ? "block" : "none"} sx={{fontSize:{xs:'2.2vmax', md:"1vmax"},margin:{xs:'2vmax 0', md :'0.4vmax 0'}}}>Mentor Name :- {mentor?.name}</Typography>
        <LoadingButton loading={swapLoad} variant="contained" sx={(menLoad === false && mentor && !isError && menPhnSwap.length === 10) ? {display:'block'} : {display:'none'}} disabled={isError || menPhnSwap.length !== 10} onClick={() => {
          dispatch(swapConnection({id:item?._id, mentorId:mentor?._id}))
          setStuPhnSwap('')
          setMenPhnSwap('')
        }}>Swap Mentorship</LoadingButton>
        </Box>
       </Box>
       </Box>
       ))}
        </Box>
       {(activeConnection?.length === 0 && stuId) && (
        <>
        {name} don't have any active mentorship
        </>
       ) }
      </Box>
    </>
  );
};

export default ManageConnection;
