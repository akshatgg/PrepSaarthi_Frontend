import React from "react";
import SendIcon from "@mui/icons-material/Send";
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import "./footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const { chats} = useSelector(state => state.mentorChat)


  return (
    <>
    {chats?.length > 0 ? <></> : 
     <footer>
     <div className="container">
       <div className="row">
         <div className="col" id="company">
           <img src="/images/logo.png" alt="" className="logo" />
           <p>
           Connecting those striving for success with those who've achieved it
           </p>
           <div className="social">
             <Link to="https://www.youtube.com/channel/UC728uW0a_X0N5Whl1SyB_4Q" target="_blank">
               <YouTubeIcon />
             </Link>
             <Link to="https://whatsapp.com/channel/0029Va5GsedDjiOTf1Xvew27" target="_blank">
               <WhatsAppIcon />
             </Link>
             {/* <Link to="/d">
               <XIcon />
             </Link> */}
             <Link to="https://www.instagram.com/prepsaarthi/" target="_blank">
               <InstagramIcon />
             </Link>
             <Link to="https://www.linkedin.com/company/prepsaarthi/posts/?feedView=all" target="_blank">
               <LinkedInIcon />
             </Link>
           </div>
         </div>

         <div className="col" id="services">
           <h3>Services</h3>
           <div className="links">
             <Link to="#">Mentoring</Link>
             <Link to="#">Products</Link>
           </div>
         </div>

         <div className="col" id="useful-links">
           <h3>Links</h3>
           <div className="links">
             <Link to="/about">About</Link>
             <Link to="#">Jobs</Link>
             <Link to="/privacy">Our Policy</Link>
             <Link to="#">Help</Link>
           </div>
         </div>

         <div className="col" id="contact">
           <h3>Contact</h3>
           <div className="contact-details">
             <PlaceIcon />
             <p>
             Luxuria Estate,<br />
             Aditya World City NH9 ,<br />
               Ghaziabad-201002, India
             </p>
           </div>
           <div className="contact-details">
             <PhoneIcon />
             <p>+91 9336254473</p>
           </div>
         </div>
       </div>

       <div className="row">
         <div className="form">
           <form action="">
             <input type="text" placeholder="Email here..." />
             <button>
               <SendIcon />
             </button>
           </form>
         </div>
       </div>
     </div>
   </footer>}
     
    </>
  );
};

export default Footer;
