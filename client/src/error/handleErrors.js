import React from 'react'
import {NotifyError} from '../components'


class Fuse extends React.Component{
    constructor(props) {
        super(props)
        this.name = this.constructor.name
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        //console.log('ошибка тут getDerivedStateFromError', error)
        return { 
            hasError: true,
            message: error.message
        }
    }

    componentDidCatch(error, errorInfo) {
        //console.log('ошибка тут componentDidCatch', error);
        //logErrorTomyService(error, errorInfo)

    }

    render() {
        if(this.state.hasError) {
            return (
                <NotifyError>
                    {this.state.message}
                </NotifyError>
            )
        }
        return this.props.children
    }
}

class HandlerErrors extends Error {
    constructor(err) {
        super() 
        if(this.constructor.instance) return this.constructor.instance
        this.constructor.instance = this
        this.err = err
    }

    static catchError(err, message) {

        
        return new HandlerErrors(err)
    }
}


export {Fuse, HandlerErrors}