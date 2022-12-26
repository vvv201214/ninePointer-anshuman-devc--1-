import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function PNLReportHeader({role}) {

  return (
    <>
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/admindashboard/pnlreport"}>Daily P&L Report</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}