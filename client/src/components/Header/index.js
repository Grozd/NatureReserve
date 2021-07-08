import React from 'react'
import {Link} from 'react-router-dom'
import './header.css'

const Header = () =>
{    

    return (
        <div className='header'>
            <p className='header_one bgClip'>ЖИВОТНЫЙ<br/>МИР</p>
            <p className='header_three'>керженского заповедника</p>
            <div className='buttons'>
                <Link className='btn_nav' to='/nav'>Меню</Link>
                <Link className='btn_contact' to='/contact'>Контакты</Link>
                <Link className="btn_signIn" to='/login'>Войти</Link>
            </div>
        </div>
    )
}

export default Header

