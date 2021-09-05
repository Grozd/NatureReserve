import {HandlerErrors} from '../error/handleErrors'


const handlerScroll = (e) => {
    
    /* header.animate([
        { transform: 'translate3D(0,0,0)'},
        { transform: `translate3D(0,0px,0)`},
    ], {
        duration: 3000,
        easing: 'ease',
        fill: 'forwards'
    }) */ 
}

const request = async(url, method = 'GET', body = null, headers = {}) => {
    try{
        console.log(body, 'body');
        const result = await fetch(url, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: 
                {
                    'Content-Type': 'application/json'
                },
            mode: 'cors'     
        })
        let res = result.json().catch(()=>{console.log('тело отсутствует');})
        
        return res
        
    } catch (error)
    {
        HandlerErrors.catchError(error, 'ошибка функ request')
        console.log('request error',error);
    }        
}

const checkAuthorization = async () => {
    try {

        if(localStorage['userToken']) {

            let response = await request(process.env.REACT_APP_REQ_ADDR + '/authorization', 'POST', {key: localStorage['userToken']})
            
            localStorage['userToken'] = response.key
            return true

        } else {

            let response = await request(process.env.REACT_APP_REQ_ADDR + '/authorization', 'GET')
            
            return false
        }
        
    } catch (err) {

        // определить типы ошибок
        if(err instanceof TypeError) {

            HandlerErrors.catchError(err, 'error checkAuthorization')

        } else {

            HandlerErrors.catchError(err, 'необработанная ошибка checkAuthorization')
        }
    }
}

const logStatus = (res) => {

    let message = res.message

    switch (res.status) {
        case 500:

            return {}
    
        default:
            break;
    }

}

const notifyMessage = () => {

}

const handleResponse = () => {
    
}

const deepCopy = (obj) => {
    
    let newObj = {}

    for (const key in obj) {
        if(obj[key] instanceof Object) {
            newObj[key] = deepCopy(obj[key])
        } else {
            newObj[key] = obj[key]
        }
    }

    return newObj
}

export {
    handlerScroll,
    request,
    checkAuthorization,
    deepCopy
}