import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import HistoryTradesMock from "./CompanyOrderTabs/HistoryTradesMock";
import TodaysTradesMock from "./CompanyOrderTabs/TodaysTradesMock";
import style from "./CompanyOrderTabs/CompanyOrder.module.css";

export default function CompanyOrders({orderCountTodayCompany, orderCountHistoryCompany}){
    console.log(orderCountTodayCompany, "orderCountTodayCompany")
    return(
        <div className={style.Companyorder_div}>        
            <ul className={style.Companyorder_ul}>
                <li className={style.Companyorder_li}>
                    <NavLink to={"/main/dashboard/CompanyOrders"}>Today's Trades(Mock-{orderCountTodayCompany})</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink to={"/main/dashboard/CompanyOrders/HistoryTradesMock"}>History Trades(Mock-{orderCountHistoryCompany})</NavLink>
                </li>
            </ul>
        <Outlet/>
        </div>
    )
}


