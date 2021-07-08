import React from 'react'
import {NotifyError} from '../components'
import {FetchException} from '../error/exception'

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
        if(error instanceof FetchException) {
            console.log('ошибка тут componentDidCatch', error);
        }
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
    constructor(props) {
        super(props) 
        if(this.constructor.instance) return this.constructor.instance
        this.state = { haseError : false }
        this.constructor.instance = this
    }

    catchError(err, message) {
        this.state = { 
            hasError: true,
            message: message,
            primary: err
        }
        return this.state
    }
}

const HE = new HandlerErrors()

export {Fuse, HE}