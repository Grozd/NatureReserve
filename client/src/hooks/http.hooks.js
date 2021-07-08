import {useCallback} from 'react'

export const useHttpRequest = () => {

    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        try{
            
            const result = await fetch(url, {method, body, headers});
            const data = await result.json();
            //console.log("useHttpRequest request",data);
            return data;
        } catch (error)
        {
            console.log('useHttpRequest error',error);
        }
        
        
    },[]);
    
    return {request};
}