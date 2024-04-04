import React,{ useState } from "react";
import Navbar from "../../components/Navbar"; 
import signUpImage from "../../assets/2.jpeg" 
// import signUpImage1 from "../../assets/1.jpeg" 
// import { Link } from "react-router-dom";

// import axios from "axios";

// import { server } from "../../server";
 


//Button  component
 
const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
       setIsMenuOpen(!isMenuOpen);
    };
   
   
    return(
        <> 
            <div className=" p-6">
                   <Navbar />        
                    <div className="space-grotesk-font text-white text-center mx-auto mt-10 text-[3rem] w-[30%]">
                        Hiring And <span className="text-primary-dark">Outsourcing</span> like never before
                    </div>
                    <div className="text-white text-center mx-auto mt-6 text-sm w-[30%]">
                         Redefining Talent Acquisition: Innovations Shaping the Future.
                    </div>

                    <div className="font-bold text-white text-center mt-10">
                        <button className="font-bold bg-primary-dark p-4 px-12 rounded-full">Browse Jobs</button>
                    </div>

        </div>           
        </>
    )
};

export default Home;


// <div className="flex items-center gap-6">
//                         <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">Sign in</button>
//                         <button onClick={toggleMenu} className="text-3xl cursor-pointer md:hidden">
//                         {isMenuOpen ? 'Close' : 'Menu'}
//                         </button>
//                     </div>
