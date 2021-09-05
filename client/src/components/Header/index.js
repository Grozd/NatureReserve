import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Authentication} from '..'
import {checkAuthorization} from '../../functions'
import './header.css'

const Header = () =>
{
    console.log('Header');
    const [authoriz, setAuthoriz] = useState(false) // authorization 

    useEffect(()=>{
        checkAuthorization()
            .then((data)=>{
                if(data) setAuthoriz(true)
            })
            .catch(()=>{
                // не авторизован, ничего не делаем
            })
    },[])

    return (
        <div className='header'>
            <Authentication authoriz={authoriz}/>
            <div className='titleBlock'>
                <p className='titleBlock_one bgClip'>ЖИВОТНЫЙ<br/>МИР</p>
                <p className='titleBlock_two'>керженского заповедника</p>
            </div>
            <div className='navBlock'>
                <Link className='navBlock_links' to='/nav'>Меню</Link>
                <Link className='navBlock_contancts' to='/contacts'>Контакты</Link>
            </div>
        </div>
    )
}

export default Header

