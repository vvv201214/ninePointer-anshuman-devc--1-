import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function SummaryHeader({role}) {

  return (
    <>
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/admindashboard/summary"}>Summary</NavLink>
                    <NavLink to={"/main/admindashboard/summary/pnlreport"}>Company Daily P&L(Trader-Wise)</NavLink>
                    <NavLink to={"/main/admindashboard/summary/dailypnlreport"}>Company Daily P&L</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}