import React,{ useState } from "react";
 
  
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
       setIsMenuOpen(!isMenuOpen);
    };
   
   
    return(
        <> 
 
             <header className=" bg-opacity-9 mx-9 rounded-full border-2 border-stone-500 bg-secondry-dark p-2 ">
               <nav className="flex justify-between items-center w-[82%]   mx-auto">
                <div>
                   <h1 className="font-bold text-lg text-white">Web3 Lance</h1>
                </div>
                <div>
                <div className="relative flex items-center border-gray-300 rounded-full">
                    <input
                        type="text"
                        placeholder="Search Jobs"
                        className="px-3 py-2 rounded-full outline-[#783FE0]"
                    />
                     <i className="absolute top-3 right-3 fa fa-search  text-primary-dark"></i>
                    </div>
                  </div>
                <div
                    className={`duration-500 md:static absolute text-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 ${isMenuOpen ? 'top-[9%]' : ''}`}>
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li>
                        <a className="hover:text-gray-500" href="#">Jobs</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Resourses</a>
                    </li>
                     
                    </ul>
                </div>
                <div className="flex items-center gap-6">
                        <button className="bg-primary-dark text-white px-5 py-2 rounded-full hover:bg-[#87acec]">Create Jobs</button>
                        
                    </div>

                    
                </nav>
            </header>       
                     
  
        </>
    )
};

export default Navbar;


// <div className="flex items-center gap-6">
//                         <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">Sign in</button>
//                         <button onClick={toggleMenu} className="text-3xl cursor-pointer md:hidden">
//                         {isMenuOpen ? 'Close' : 'Menu'}
//                         </button>
//                     </div>
