import React,{useState , useEffect} from 'react'
import Styles from "./CompanyOderPegination.module.css";

const CompanyOrderPegination = ({showPerPage, onPeginationOnChange, total }) => {
    console.log(total);

    const[counter, setCounter] = useState(1);
    useEffect(()=>{
        const value = showPerPage * counter;
        console.log("start value", value- showPerPage );
        console.log("end Value", value)
        onPeginationOnChange(value- showPerPage, value)
    },[counter])

    const onButtonClick = (type)=>{
        if(type === "prev"){
            if(counter === 1){
                setCounter(1)
            }else{
                setCounter(counter - 1)
            }
        }
        else if(type === "next"){
            if(Math.ceil(total/showPerPage) === counter){
                setCounter(counter);
            }else{
                setCounter(counter + 1);
            }
        }
    }

  return (
    <div className={Styles.buttons}>
        <button className={Styles.PrevButtons} onClick={()=>onButtonClick('prev')}>Prev</button>
        <button className={Styles.nextButtons} onClick={()=>onButtonClick('next')}>Next</button>
    </div>
  )
}

export default CompanyOrderPegination