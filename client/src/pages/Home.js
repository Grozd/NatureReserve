import React from 'react'
import {Page, Header} from '../components'

const Home = () => {
    console.log('Home');
    const className = 'home'

    return (
        <Page className={className}>
            <Header/>
        </Page>
    )
}

export default Home