import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { userContext } from './CreateContext';
import DetailForm from './DetailForm';
import TotalDataAdmin from './TotalDataAdmin'

export default function AdminFirstLook() {
    const [show, setShow] = useState(true);
    // const toggle = useContext(userContext);
    // console.log(toggle.show);
    // useEffect(()=>{
    //     setShow(toggle.show);
    // },[toggle.show])
    function showForm(){
        setShow(false);
    }
  //   function backToList(){
  //     setShow(true);
  // }
  return (
    <>
        
        {/* <button onClick={backToList}>Back</button> */}
        {show ? <>
                  <div className='table_data'>
                  <button className='btn btn_create' onClick={showForm}>Create Details</button>
                  <TotalDataAdmin/>
                  </div>
                </>
                
        :
        <DetailForm showTotalDetails={setShow}/>}
    </>
  )
}

