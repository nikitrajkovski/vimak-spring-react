import { useState } from "react"
import './counter.css'
export default function Counter()
{
    let[counter,setCounter]=useState(0)

    const minusCounter = ()=>{
        if(counter>0)
        {
            setCounter(counter - 1);
        }
        
    }

    const plusCounter = ()=>{
        setCounter(counter + 1);
    }

    return(
        <div className="counter-styling">
            <button onClick={minusCounter}>-</button>
            <p>{counter}</p>
            <button onClick={plusCounter}>+</button>
        </div>
    )
}