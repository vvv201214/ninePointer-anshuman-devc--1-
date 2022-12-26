import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MainSideBar({name}) {
  return (
    <>
        <div className="leftsidebar">
            <div className="userSidebar_div">
                <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="" />
                <h6 className="sidbar_h6">{(name).toUpperCase()}</h6>
                <div className="sidebar_items"><NavLink to="/main/dashboard" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Dashboard</NavLink></div>
                <div className="sidebar_items"><NavLink to="/main/admindashboard/summary" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Admin Dashboard</NavLink></div>
                <div className="sidebar_items"><NavLink to="/main/instrument" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Instruments</NavLink></div>
                <div className="sidebar_items"><NavLink to="/main/tradingAccount" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Trading Accounts</NavLink></div>
                <div className="sidebar_items"><NavLink to="/main/user" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Users</NavLink></div>
                <div className="sidebar_items"><NavLink to="/main/funds" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Funds</NavLink></div>
                <div className="sidebar_items"><NavLink to="/main/report" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Reports</NavLink></div>
                <div className="sidebar_items"><NavLink to="/main/algobox" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Algo Box</NavLink></div>
                
            </div>
            <div >
                <div className="sidebar_item"><NavLink to={"/"}>Go Out</NavLink></div>
            </div>

        </div>
    </>
  )
}
