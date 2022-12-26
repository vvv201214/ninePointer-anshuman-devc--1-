import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function AlgoHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/main/algobox"}>Trading Algos</NavLink>
            </li>
            <li>
                <NavLink to={"/main/algobox/InstrumentMapping"}>Instrument Mapping</NavLink>
            </li>
            <li>
                <NavLink to={"/main/algobox/ExchangeMapping"}>Exchange Mapping</NavLink>
            </li>
            <li>
                <NavLink to={"/main/algobox/ProductMapping"}>Product Mapping</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}