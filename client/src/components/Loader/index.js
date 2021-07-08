import React, { useEffect } from 'react'
import './loader.css'

const Loader = () => {

    useEffect(()=>{
        let elem = document.querySelector('.loader')
        elem.animate([
            {transform: 'rotate(0deg'},
            {transform: 'rotate(360deg'},
        ],{
            duration: 3000,
            easing: 'linear',
            fill: 'forwards',
            iterations: Infinity
        })
    })
    return (
        <div className='loader'></div>
    )
}

export default Loader