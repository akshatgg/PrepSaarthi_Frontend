import React from "react";
import "./home.css";
import HomeTop from "./HomeTop.jsx";
import HomeMiddle from "./HomeMiddle.jsx";
import HomeEnd from "./HomeEnd.jsx";
const Home = () => {
  // const { user: successMessage } = useSelector(
  //   (state) => state.mentorUpdateLastStep
  // );
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (successMessage) {
  //     dispatch(clearMessage());
  //   }
  // });

  return (
    <>
      <HomeTop />
      <HomeMiddle />
      <HomeEnd />
    </>
  );
};

export default Home;
