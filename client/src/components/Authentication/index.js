import React from 'react'
import {Link} from 'react-router-dom'
import './authentication.css'

const Authentication = ({authoriz}) => {

    let response = authoriz === true

        ? <div className='toAccount'>
            
        </div>
        
        : <div className='authentication'>
            <Link className="authentication_link_signIn" to={`/login`}>Войти</Link>
            <Link className="authentication_link_reg" to={`/registration`}>Регистрация</Link>
        </div>
    
    return response
}

export default Authentication