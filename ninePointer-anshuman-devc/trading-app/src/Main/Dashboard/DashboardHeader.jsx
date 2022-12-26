import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader({role}) {

  return (
    <>
        <div>
            {role === "admin" ?
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard/tradersdashboard"}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard"}>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>TradeBook</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyPosition"}>Company Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TraderPosition"}>Traders Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyOrders"}>Company TradeBook</NavLink>
                </li>
               
            </ul>
            :
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard"}>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>TradeBook</NavLink>
                </li>
            </ul> }

            <Outlet/>
        </div>
    </>
  )
}