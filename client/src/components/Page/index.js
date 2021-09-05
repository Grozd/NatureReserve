import React from 'react'
import {Breadcrumbs,NotifyError} from '../../components'
import {handlerScroll} from '../../functions'
import './page.css'


const Page = ({children, className, error}) => {
    console.log('Page');

    return (
        
        <div className={className} onWheel={handlerScroll}>
            <Breadcrumbs/>
            <NotifyError value={error}/>
            {children}
        </div>
    )
}

export default Page