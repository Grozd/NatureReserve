import React from 'react'
import {Loader, Page, Carousel2} from '../components'
import {HandlerErrors} from '../error/handleErrors'

class Animals2 extends React.Component {

    state = { 
        data: [],
        loader: true,
        error: {message: '', state: false}
    }

    reviewAnimal(id){
        this.setState({selected: id})
    }

    static getDerivedStateFromProps(props, state) {
        //console.log('getDerivedStateFromProps проверка ', props, state);
        // он позволяет компоненту обновлять свое внутреннее состояние в результате изменения свойств
        // null - не меняет состояние
        // все что кроме null обновит состояние

        return null
    }

    render() {
        
        console.log('render Animals2');
        if(this.state.loader) return <Loader/>
        //console.log(this.state.selected, 'selected');
        let styles = {
            backgroundImage: this.state.selected ? `url(img/${this.state.data.prod[this.state.selected].img})` : `url(img/${this.state.data.prod[0].img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
        let text = this.state.selected ? this.state.data.prod[this.state.selected].content : this.state.data.prod[0].content
        return(
            <Page className='animals' error={this.state.error.message}>
                <div className='animals_content'>
                    <div className='animals_content_reviewAnimal' style={styles}></div>
                    <p className='animals_content_text'>{text}</p>
                </div>
                <Carousel2 data={this.state.data} method={this.reviewAnimal.bind(this)}/>
            </Page>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log('shouldComponentUpdate', nextProps, nextState);
        //console.log('shouldComponentUpdate', this.props, this.state);
        if(this.props === nextProps && this.state === nextState) return false 
        // true - надо обновить компонент
        // false - НЕ надо обновить компонент
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        //console.log('getSnapshotBeforeUpdate',prevProps, prevState);
        // возможность работать с DOM до показа на экране + делаем http запросы
        return 5
    }

    componentDidMount() {
        //console.log('componentDidMount');
        const req = async () => {
            try {
                let dataDB = await fetch('http://localhost:5000/animals', {
                    method: 'GET',
                    mode: 'cors',
                    redirect: 'error'
                })
                

                if(dataDB.ok) {
                    //console.log(this.state, 'state после getDerivedStateFromProps');
                    dataDB = await dataDB.json()
                    this.setState({data: dataDB, loader: false})
                }
            } catch (err) {
                if(err instanceof Error) {
                    this.setState({
                        error: HandlerErrors.catchError(err),
                        loader: false
                    })
                }
            }   
        }
        req()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log('componentDidUpdate', prevProps, prevState, snapshot);
        if (this.props !== prevProps) {}
            // для дополнительного render
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        // отвободить ресурсы
    }
}

export default Animals2