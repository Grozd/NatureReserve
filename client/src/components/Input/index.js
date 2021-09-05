import React, { useCallback, useEffect, useState } from 'react'
import './input.css'

const Input = ({
    className,
    type,
    name= '',
    placeholder = '',
    required,
    /* maxLength,
    minLength, */
    store,
    autoComplete}) => {
    console.log('Input');

    /* let [value, setValue] = useState('') */

    //..
    let status = ''    
    let notify = ''
    let value = ''
    
    let nameOrType = name.match(/(email|password|repeat_password)/)[0]
    if(!nameOrType) nameOrType = type.match(/(email|password|text)/)[0]

    // временное решение!
    if(store[nameOrType]?.isExistErr) {

        status = '_invalidMessage'
        notify = store[nameOrType]?.error

    } else {
        status = '_successMessage'
        notify = store[nameOrType]?.defaultVal
    }
    
    // временное решение!
    // смысл следить за значением полей email и pass
    useEffect(()=>{
        console.log('useEffect inp', store);
        if(store[nameOrType]?.value !== undefined && store[nameOrType]?.isExistErr) {

            /* setValue(store[nameOrType].value) */
        }
    }, [store])
  
    return <div className={className+'_wrap'}>

        <input 
            className={className} 
            type={type} 
            name={name} 
            placeholder={placeholder}
            required={required}
            minLength={store[nameOrType]?.options.minLength}
            maxLength={store[nameOrType]?.options.maxLength}
            autoComplete={autoComplete}
            /* onChange={(e)=>setValue(e.target.value)}
            value={value} */
            defaultValue={value}
            />
        <p className={className + status}>{notify}</p>
    </div>
    
}

export default Input