import React, { useCallback, useState } from 'react'
import {Breadcrumbs,NotifyError} from '../../components'
import {handlerScroll} from '../../functions'
import {HE} from '../../error/handleErrors'
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