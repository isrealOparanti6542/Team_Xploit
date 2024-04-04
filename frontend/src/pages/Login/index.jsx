import React,{ useState } from "react";
 
import signUpImage from "../../assets/2.jpeg" 
import signUpImage1 from "../../assets/1.jpeg" 
// import { Link } from "react-router-dom";

// import axios from "axios";

// import { server } from "../../server";
 


//Button  component
 
const Login = () => {
  
    return(
        <>
            <div id="container" className="flex flex-row justify-center w-full ">
                <div className="flex-1  bg-secondry-dark">
                    <p className="font-bold text-white mt-4 p-2">
                      LOGO
                    </p>
                    
                    <div className="bg-opacity-10 flex justify-center bg-white bg-blur py-8 mx-auto shadow rounded-[10px] sm:px-10 w-[50%] relative border-2 border-stone-500">
                              
                        <form className="flex flex-col justify-center space-y-3  rounded-lg w-full mt-2 w-full">
                        <div className="text-white mt-4 text-center">Sign In</div>
                    
                          <div>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="email"
                                placeholder="email"
                                autoComplete="email"
                                required
                                // value={firstName}
                                // onChange={(e) => setFirstName(e.target.value)}
                                className="appearance-none placeholder:text-slate-400 text-slate-300 bg-slate-700 block w-full px-3 py-2 rounded-xlg rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="password"
                                placeholder="password"
                                autoComplete="password"
                                required
                                // value={firstName}
                                // onChange={(e) => setFirstName(e.target.value)}
                                className="appearance-none placeholder:text-slate-400 text-slate-300 bg-slate-700 block w-full px-3 py-2 rounded-xlg rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              />
                              </div>
                          </div>
                          
                         
                           
                          <div className="flex justify-center">
                            <button className="bg-primary-dark text-white  py-1 px-4 w-full text-sm rounded-full">Sign In</button>
                          </div>
                        </form>
                      </div>
                     
                    </div>
                <div className="Signupimage flex-1 bg-green-100">
                {/* <img src={signUpImage1}  className="h-full -z-10 absolute" alt="signUpImage1" /> */}
                  <img src={signUpImage}  className="h-full w-full z-20" alt="signUpImage" />
                </div>
            </div>
            
        </>
    )
};

export default Login;
