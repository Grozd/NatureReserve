import validator from 'validator'
import {deepCopy} from '../functions'

const validStoreObj = {

    store: {
        arrInpTypes: ['email', 'password', 'repeat_password', 'text']
    },


    validForm:  function(form) {   
        
        let emailVal = form.elements['email'].value
        let passVal = form.elements['password'].value
        let repeatPassVal = form.elements['repeat_password']?.value

        
        this.store.email.value =  this.emailValidator(emailVal)
        this.store.password.value =  this.passwordValidator(passVal, this.store.password)
        if(repeatPassVal !== undefined) {
            this.store.repeat_password.value =  this.passwordValidator(repeatPassVal, this.store.repeat_password)
        }
        
        if(repeatPassVal && passVal !== repeatPassVal) {
            this.store.repeat_password.error = 'Пароли отличаються'
            this.store.repeat_password.isExistErr = true
        }
        
        return this.store
    },

    createValidObj: function(form){

        let validObj = {
            defaultVal: '',
            error: '',
            value: '',
            isExistErr: false,
            options: {
                maxLength: 8,
                minLength: 8
            }
        }


        for (const key in form.elements) {
            if(this.store.arrInpTypes.includes(key)) {

                this.store[key] = deepCopy(validObj)

                switch (key) {
                    case 'email':
                        {
                            this.store[key].defaultVal = 'Введите имя почты'
                            this.store[key].value = ''
                            this.store[key].options.maxLength = 30
                            this.store[key].options.minLength = 6
                            break;
                        }
                    case 'password':
                        {
                            this.store[key].defaultVal = 'Введите пароль'
                            this.store[key].value = ''
                            this.store[key].options.maxLength = 40
                            this.store[key].options.minLength = 8
                            break;
                        }
                    case 'repeat_password':
                        {
                            this.store[key].defaultVal = 'Введите пароль'
                            this.store[key].value = ''
                            this.store[key].options.maxLength = 40
                            this.store[key].options.minLength = 8
                            break;
                        }
                    default:
                        this.store[key].defaultVal = 'Введите текст'
                        break;
                }
            }
        }

        return this.store
    },

    secureMerging: function(store,obj) {

        for (const key in store) {
            
            if(!obj[key]) {
                continue
            }

            if(store[key] instanceof Object && obj[key] instanceof Object) {
                this.secureMerging(store[key], obj[key])
            } else if(obj[key] instanceof Object) {
                continue
            } else {
                store[key] = obj[key]
            }
        }
        return store
    },

    emailValidator: function(emailVal) {

        let email = this.store.email
        
        email.isExistErr = false
        email.error = ''

        if(!validator.isEmail(emailVal)) email.error = 'Недопустимое имя'
        if(!validator.isByteLength(emailVal, {min: email.options.minLength, max: email.options.maxLength})) {

            email.error = `Имя почты минимум: ${email.options.minLength} символов, максимум: ${email.options.maxLength}`
        }
        emailVal = validator.trim(emailVal)
        emailVal = validator.escape(emailVal)

        if(email.error) this.store.email.isExistErr = true
        else {
            this.store.email.isExistErr = false
            this.store.email.defaultVal = 'успешно'
        }

        return emailVal
    },

    passwordValidator: function(passVal, password) { // 1 - this.store.password 2 - this.store.repeat_password

        password.isExistErr = false
        password.error = ''

        if(!validator.isByteLength(passVal, {min: password.options.minLength, max: password.options.maxLength})) {
            password.error = `Пароль минимум: ${password.options.minLength} символов, максимум: ${password.options.maxLength}`
        }
        passVal = validator.trim(passVal)
        passVal = validator.escape(passVal)

        if(password.error) password.isExistErr = true
        else {
            password.isExistErr = false
            password.defaultVal = 'успешно'
        }

        return passVal
    }

}

export default validStoreObj