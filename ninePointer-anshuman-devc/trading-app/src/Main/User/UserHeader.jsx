import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function UserHeader(){
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/main/user"}>Users</NavLink>
            </li>
            <li>
                <NavLink to={"/main/user/roles"}>Roles</NavLink>
            </li>
            {/* <li>
                <NavLink to={"/main/user/UserSelect"}>UserSelect</NavLink>
            </li> */}
        </ul>
        <Outlet/>
    </>
  )
}