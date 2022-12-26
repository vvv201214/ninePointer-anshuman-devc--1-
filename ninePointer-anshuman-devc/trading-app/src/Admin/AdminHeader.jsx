import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminHeader() {
    return (
        <>
            <ul>
                <li>
                    <NavLink to={"/admin/TradeDetails"}>Trade Details</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/ApiDetails"}>API Details</NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/ApiPerameters"}>API Perameters</NavLink>
                </li>
            </ul>
        </>
      )
    }
    