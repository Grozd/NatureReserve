import React from 'react'
import './notifyError.css'

const NotifyError = ({value}) => {
    console.log('NotifyError');

    if(!value) {
        //console.log('NotifyError пуст');
        return null
    }

    return (
        <div className='notifyError'>
            {value}
        </div>
    )
}

export default NotifyError