import React, { useEffect} from 'react'
import objStore from '../../store/local'
import {Link} from 'react-router-dom'

const Breadcrumbs = () => {

    let local = document.location.pathname
    objStore.check(local)

    if(local === '/home') return null

    function renderLi() {
        let arr = []
        objStore.state.urlPathname.forEach((v,i)=>{
            let elemLi =
            (<li key={i} className='storePath'>
                <Link to={v} onClick={objStore.removeItem.bind(objStore, v)}>{v.replace(/\//, '')}</Link>
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