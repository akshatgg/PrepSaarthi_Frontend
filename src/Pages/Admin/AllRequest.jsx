import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import RequestCard from "../../Components/RequestCard/RequestCard";
export const Pendingreq = ({ requests }) => {
  const [array, setArray] = useState(null);
  const [status, setStatus] = useState(false);
  const reverseArray = () => {
    setArray([...array].reverse());
    setStatus((prev) => !prev)
  };
   useEffect(() => {
    setArray(requests)
   }, [requests])
  return (
    <>
      <Button sx={{mb:'8px', width:{xs:'20vmax', md:'10vmax'}}} variant="contained" onClick={reverseArray}>{status ? <>OLD</> :<>RECENT</>}</Button>
    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {array?.length === 0 ? (
        <h1>No Pending Requests</h1>
      ) : (
        <>

          <Grid container spacing={2} justifyContent="center">
            {array?.map((item, i) => {
              return <RequestCard item={item} i={i + "p"} />;
            })}
          </Grid>
        </>
      )}
    </Box>
    </>
  );
};
export const UpdationReq = ({ requests }) => {
  const [array, setArray] = useState(null);
  const [status, setStatus] = useState(false);
  const reverseArray = () => {
    setArray([...array].reverse());
    setStatus((prev) => !prev)
  };
   useEffect(() => {
    setArray(requests)
   }, [requests])
  return (
    <>
    <Button sx={{mb:'8px', width:{xs:'20vmax', md:'10vmax'}}} variant="contained" onClick={reverseArray}>{status ? <>OLD</> :<>RECENT</>}</Button>

    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {array?.length === 0 ? (
        <h1>No Pending Requests</h1>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {array?.map((item, i) => {
              return <RequestCard item={item} i={i + "pr"} />;
            })}
          </Grid>
        </>
      )}
    </Box>
    </>
  );
};

export const ApprovedReq = ({ requests }) => {
  const [array, setArray] = useState(null);
  const [status, setStatus] = useState(false);
  const reverseArray = () => {
    setArray([...array].reverse());
    setStatus((prev) => !prev)
  };
   useEffect(() => {
    setArray(requests)
   }, [requests])
  return (
    <>
    <Button sx={{mb:'8px', width:{xs:'20vmax', md:'10vmax'}}} variant="contained" onClick={reverseArray}>{status ? <>OLD</> :<>RECENT</>}</Button>

    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {array?.length === 0 ? (
        <h1>No Approved Requests</h1>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {array?.map((item, i) => {
            return <RequestCard item={item} i={i + "a"} />;
          })}
        </Grid>
      )}
    </Box>
    </>
  );
};

export const RejectedReq = ({ requests }) => {
  const [array, setArray] = useState(null);
  const [status, setStatus] = useState(false);
  const reverseArray = () => {
    setArray([...array].reverse());
    setStatus((prev) => !prev)
  };
   useEffect(() => {
    setArray(requests)
   }, [requests])
  return (
    <>
    <Button sx={{mb:'8px', width:{xs:'20vmax', md:'10vmax'}}} variant="contained" onClick={reverseArray}>{status ? <>OLD</> :<>RECENT</>}</Button>

    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {array?.length === 0 ? (
        <h1>No Approved Requests</h1>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {array?.map((item, i) => {
            return <RequestCard item={item} i={i + "r"} />;
          })}
        </Grid>
      )}
    </Box>
    </>
  );
};
