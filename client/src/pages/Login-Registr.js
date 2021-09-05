import React, { useEffect, useState } from 'react'
import {request, deepCopy} from '../functions'
import {Page, Form, Input, Button} from '../components'
import storeValidObj from '../validator'
import {useHistory, Link} from 'react-router-dom'

const Login_Registr = (props) => {
    console.log('Login_Registr');

    const [store, setStore] = useState({...storeValidObj.store})
    console.log('store начало',store);
    //...
    const typePage = props.match.params.typePage

    const className = typePage === 'login' ? 'login' : 'reg'

    // ПЕРЕПИСАТЬ первым делом. разбить и хранить в redux
    const handleSubmit = async (e)=>{
        console.log('нажал');

        // валидация
        let form = e.target.parentNode
        const validRes = storeValidObj.validForm(form)

        // временное решение! новое состояние с пустыми значениями для Input
        let obj = deepCopy(validRes)
        for (const key in obj) {
            obj[key].value = ''
        }
        setStore(deepCopy(obj))

        // если ошибки то отменяем запрос
        if(validRes.email?.error || validRes.password?.error || validRes.repeat_password?.error) return
        
        const uri = className
        
        let res = await request(
            `${process.env.REACT_APP_REQ_ADDR}/authentication/${uri}`,
            'POST',
            {email: validRes.email.value, password: validRes.password.value}
        )
        
        console.log(res, 'ответ сервера');
        // обработка ответа 
        setStore(storeValidObj.secureMerging(store, res))
        //history.push('/')
    }

    //...
    useEffect(()=>{
        console.log('useEffect LR');
        const form = document.querySelector('form')
        setStore({...storeValidObj.createValidObj(form)})
    },[])

    return (
            <Page className={className}>
            <Form className={`${className}_form`} method='POST'>
                <Input 
                    className='inputEmail'
                    type='email'
                    name='email'
                    placeholder='email'
                    maxLength={store.email?.options.maxLength}
                    minLength={store.email?.options.minLength}
                    store={store}
                    autoComplete='username'
                    required
                />

                <Input
                    className='inputPass'
                    type='password'
                    name='password'
                    placeholder='password'
                    store={store}
                    autoComplete={typePage === 'registration' ? 'new-password' : 'current-password'}
                    required
                />

                {
                typePage === 'registration'

                ? <Input
                    className='inputPass'
                    type='password'
                    name='repeat_password'
                    placeholder='repeat the password'
                    store={store}
                    autoComplete='new-password'
                    required
                    />

                : <p className={`${className}_form_linkToReg`}>Если у вас нет акаунта, перейдите к <Link to='/registration'>регистрации</Link></p>
                }

                <Button className={`${className}_btn`} onClick={handleSubmit}>Войти</Button>
            </Form>
            </Page>
        )
}

export default Login_Registr



// TODO
// новая версия авторизации
    /* useEffect(()=>{
        //let response1 = request('http://localhost:5000', 'HEAD', {},{}) авторизация без передачи пароля по сети
        
    },[]) */