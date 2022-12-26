import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function UserFundsHeader({role}) {

  return (
    <>
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/userfunds"}>Funds Details</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}