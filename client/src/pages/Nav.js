import React from 'react'
import {Page} from '../components'
import {Link} from 'react-router-dom'

const Nav = () => {
    //debugger
    console.log('Nav');
    const className = 'nav'

    return (
        <Page className={className}>
            <div className='nav_content'> 
                <Link className='cell' to='/news'>новости</Link>
                <Link className='cell' to='/plants'>растения</Link>
                <Link className='cell' to='/animals'>животные</Link>
                <Link className='cell' to='/liblary'>библиотека</Link>
                <Link className='cell' to='/tour'>заявка на экскурсию</Link>
                <Link className='cell' to='/contact'>контакты</Link>
            </div>
        </Page>  
    )
}

export default Nav