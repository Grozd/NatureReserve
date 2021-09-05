import React from 'react'
import ServiceBreadcrumbs from '../../ServiceBreadcrumbs'
import {Link} from 'react-router-dom'
import './breadcrumbs.css'

const Breadcrumbs = () => {

    // запись в массив. порядок посещений страниц
    let pathname = document.location.pathname
    ServiceBreadcrumbs.check(pathname)

    if(pathname === '/home') return null

    function renderLi() {
        let arr = []
        ServiceBreadcrumbs.state.urlPathname.forEach((v,i)=>{
            let elemLi =
            (<li key={i} className='breadcrumbs_item'>
                <Link to={v} onClick={ServiceBreadcrumbs.removeItem.bind(ServiceBreadcrumbs, v)}>{v.replace(/\//, '')}</Link>
            </li>)

            arr.push(elemLi)
        })
        return arr
    }

    return (
        <ul className='breadcrumbs'>
            {renderLi()}
        </ul>
    )
}

export default Breadcrumbs