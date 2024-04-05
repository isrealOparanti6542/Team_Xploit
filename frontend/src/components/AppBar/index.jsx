import { useState } from "react"
export default function AppBar() {
    const [displayWork,setDisplayWork] = useState(false)

    const setDisplayFalse = () => {
        setDisplayWork(false);
     };
     const setDisplayTrue = () => {
        setDisplayWork(true);
     };
    
  return (
    <>
    <div className="AppBarContainer">
     <div className="profileContainer">
     <div className="profileImgContainer">
       <img src="../../../avatar.jpg" alt="avatar img" className="profileImg"  />
       </div>
        <div className="profileTxt">
            <p className="username ptx">John Doe</p>
            <p className="address ptx">0xbAd4E561a69498da96f71c5eB9e481DB8DAe16aF</p>
        </div>
        </div>
       <div className="divider">
        <button className="classification" onClick={setDisplayFalse}>HIRE</button>
        <div className="line"></div>
        <button className="classification"  onClick={setDisplayTrue}>WORK</button>
       </div>
        <div className="AppBar__Nav">
            <ul>
            <li className="AppBar__Nav_Item">
                    <img src="../../../home.png" alt="" className="AppBar__Nav__Img"/>
                    <button>Public</button>
                </li>
                <div className={`hire ${displayWork ? "controlDisplay" : ""}`} >
                <li className="AppBar__Nav_Item">
                <img src="../../../home.png" alt="" className="AppBar__Nav__Img"/>
                    <button>Ongoing Projects</button>
                </li>
                <li className="AppBar__Nav_Item">
                <img src="../../../home.png" alt="" className="AppBar__Nav__Img"/>
                    <button>Applications sent</button>
                </li>
                </div>
                <div className={`work ${displayWork ? "" : "controlDisplay"}`} >
              
                <li className="AppBar__Nav_Item">
                <img src="../../../home.png" alt="" className="AppBar__Nav__Img"/>
                    <button>Create Gigs</button>
                </li>
                <li className="AppBar__Nav_Item">
                <img src="../../../home.png" alt="" className="AppBar__Nav__Img"/>
                    <button>Applications</button>
                </li>
                </div>
              
                <li className="AppBar__Nav_Item">
                <img src="../../../home.png" alt="" className="AppBar__Nav__Img"/>
                    <button>Dispute</button>
                </li>

            </ul>
        </div>


    </div>

    </>
  )
}
