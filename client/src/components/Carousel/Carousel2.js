import React from 'react'
import {Loader} from '../index'
import './carousel.css'

class Carousel2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: props.data }
        this.method = props.method
        this.currentOffset = 0
        this.mouseDown = false
    }

    getOffsetLimit(){

        let widthLi = this.ulElement.firstChild.clientWidth
        let countLi = this.ulElement.childNodes.length
        return ((widthLi * countLi) - this.ulElement.clientWidth) * -1
    }

    handleClick(uriImg) {
        this.method(uriImg)
    }

    handleMousedown(event) {
        if(this.mouseDown) {
            event.preventDefault()
            return
        }
        this.mouseDown = true
        this.startCoord = event.clientX
        //console.log('mousedown', this.startCoord);
        event.currentTarget.style.cssText = event.currentTarget.style.cssText.replace(/grab\W/,`grabbing`)
    }

    handleMouseup(event){
        if(this.mouseDown === false) {
            event.preventDefault()
            return
        }
        this.mouseDown = false
        //console.log('заранее', 'this.currentOffset',this.currentOffset, '+=', this.difference, 'this.difference');
        this.currentOffset += this.difference
        if(this.currentOffset < this.limit) this.currentOffset = this.limit
        if(this.currentOffset > 0) this.currentOffset = 0
        //console.log('mouseup', this.currentOffset, 'this.currentOffset');
        this.ulElement.style.cssText = this.ulElement.style.cssText.replace(/grabbing/,`grab`)
    }

    handleMouseLive(){
        this.mouseDown = false
        //console.log('mouseLive', 'this.mouseDown=', this.mouseDown);
    }

    handleMouseEnter(event){
        
        event.currentTarget.style.cssText = event.currentTarget.style.cssText.replace(/^\s*$/,()=>{
            return `cursor: grab;`
        })
        //console.log('mouseEnter', 'this.mouseDown=', this.mouseDown);
    }

    handleMousemove(event) {        
        if(this.mouseDown === false) {
            event.preventDefault()
            return
        }
        if(this.mouseDown && this.currentOffset >= this.limit) {
            this.difference = event.clientX - this.startCoord
            //console.log('event.clientX', event.clientX, '-', this.startCoord,'this.this.startCoord');
            if((this.currentOffset + this.difference) > 0) {
                this.currentOffset = 0
                //console.log('---вышли!!!', this.currentOffset, 'this.currentOffset');
                return
            }
            if(this.limit > (this.currentOffset + this.difference)) {
                return
            }
            this.ulElement.style.cssText = `transform: translateX(${this.currentOffset + this.difference}px); cursor: grabbing;`
            //console.log('Mousemove',this.difference);

        } else{
            this.ulElement.style.cssText = this.ulElement.style.cssText.replace(/grabbing/,`grab`)
            //console.log(this.mouseDown, 'Mousemove');
        }
    }

    render() {
        if(!this.state.data.prod.length) return <Loader/>

        let listAnimals = []
        listAnimals = this.state.data.prod.map((elem, i)=>{
                
            let styles = {
                backgroundImage: `url('img/${elem.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }
            
            return <li 
                    key={elem.id}
                    className='listAnimals_item'
                    style={styles}
                    ></li>
            
        })
        
        return <ul className='listAnimals'>{listAnimals}</ul>
    }

    

    componentDidMount(){
        let liElements = document.querySelectorAll('.listAnimals_item')
        this.ulElement = document.querySelector('.listAnimals')
        this.limit = this.getOffsetLimit()

        this.ulElement.addEventListener('mousemove', this.handleMousemove.bind(this))
        this.ulElement.addEventListener('mousedown', this.handleMousedown.bind(this))
        this.ulElement.addEventListener('mouseup', this.handleMouseup.bind(this))
        this.ulElement.addEventListener('mouseleave', this.handleMouseLive.bind(this))
        this.ulElement.addEventListener('mouseenter', this.handleMouseEnter.bind(this)) 

        liElements.forEach((elem, i)=>{
            elem.addEventListener('click', this.handleClick.bind(this, i))
        })
    }

    componentWillUnmount(){
        let liElements = document.querySelectorAll('listAnimals_item')

        this.ulElement.removeEventListener('mousemove', this.handleMousemove.bind(this))
        this.ulElement.removeEventListener('mousedown', this.handleMousedown.bind(this))
        this.ulElement.removeEventListener('mouseup', this.handleMouseup.bind(this))
        this.ulElement.removeEventListener('mouseleave', this.handleMouseLive.bind(this))
        this.ulElement.removeEventListener('mouseenter', this.handleMouseEnter.bind(this))

        liElements.forEach((elem)=>{
            elem.removeEventListener('click', this.handleClick.bind(this))
        })
    }
}

export default Carousel2