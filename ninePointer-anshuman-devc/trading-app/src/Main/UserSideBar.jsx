import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserSideBar({name}) {
    return (
        <>
            <div className="leftsidebar">
                <div className="userSidebar_div">
                    <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="" />
                    <h6 className="sidbar_h6">{name}</h6>
                    <div className="sidebar_items"><NavLink to="/main/dashboard" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Dashboard</NavLink></div>
                    <div className="sidebar_items"><NavLink to="/main/funds" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Funds</NavLink></div>
                    <div className="sidebar_items"><NavLink to="/main/report" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Reports</NavLink></div>
                </div>
                <div >
                    <div className="sidebar_item"><NavLink to={"/"}>Go Out</NavLink></div>
                </div>
    
            </div>
        </>
      )
    
}
