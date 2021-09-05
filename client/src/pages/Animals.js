import React, {useState, useEffect} from 'react'
import { Context } from '../App';
import {Page} from '../components'
import {Loader} from '../components'
import {HandlerErrors} from '../error/handleErrors'

const Animals = () => {
    console.log('Animals');
    const className = 'animals'

    let [data, setData] = useState({
      dataFromNet: [],
      loading: true,
      error: {message: '', state: false}
    })

    useEffect(()=>{

        async function req(){
          try {
            const dataDB = await fetch('http://localhost:5000/animals',{
                method: 'GET',
                mode: 'cors',
                redirect: 'error'
            })
            if(dataDB.ok) {
              setData({
                ...data,
                dataFromNet: await dataDB.json(),
                loading: false
              })
            }
    
          } catch (err) {

            if(err instanceof Error) setData({
              ...data,
              error: HandlerErrors.catchError(err, 'приносим извенения, но содержимое, пока, не доступно'),
              loading: false
            })
          } finally {}
        }
        req()
        
      },[])

      if(data.loading) return <Loader/>

    return (
        <Context.Provider value={data.dataFromNet.prod}>
            <Page className={className} error={data.error.message}></Page>
        </Context.Provider>
    )
}

export default Animals