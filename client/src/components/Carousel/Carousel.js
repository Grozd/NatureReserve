import React, { useState, useContext } from 'react'
import { nanoid } from 'nanoid'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import {Context} from '../../App'
import './carousel.css'

export const Carusel = () => {
    console.log('Carusel')

    let data = useContext(Context)

    let arrBloksLi =[];                // Final array from (blokLi); 



    let [navstate, setNavstate] = useState({
        CEIB: 8,                                    // Count Element(listJSX) In Blok (blokLi)
        countBloks: ()=>2,  // Count Bloks (blokLi) wiht elements (listJSX)
        auto: true,                                 // automatic scroll
        translate: 0,                                  // offset screen
        currentScreen: 0
    });
    
    const LeftOffset = () => {
        console.log('RightOffset',navstate.currentScreen)
        if(navstate.currentScreen === 0)
        {
            setNavstate({
                ...navstate,
                currentScreen: navstate.countBloks() - 1,
                translate: navstate.translate - 1500
            })
        } else {
            setNavstate({
                ...navstate,
                currentScreen: navstate.currentScreen - 1,
                translate: navstate.translate + 1500
            });
        }
        
    }

    const RightOffset = () => {
        console.log('RightOffset',navstate.currentScreen)
        if(navstate.currentScreen === navstate.countBloks() - 1)
        {
            setNavstate({
                ...navstate,
                currentScreen: 0,
                translate: 0
            });
        } else {
            setNavstate({
                ...navstate,
                currentScreen: navstate.currentScreen + 1,
                translate: navstate.translate - 1500
            });
        }
        
        
    }

    //func compiling data
    const generateBloks = () => {

        let blokLi,                 // screen №? with list animal
            blokLi_Ul_Li = [],
            classActive = '';

            console.log('generateBloks', navstate.countBloks());
        for (let index = 0; index < navstate.countBloks(); index++)    // iterate count blokLi
        {
            console.log('внеш цикл');
            for (let index2 = index * navstate.CEIB; 
                    index2 < (navstate.CEIB * index + navstate.CEIB);// 
                index2++)
            {
                console.log('вн цикл');
                //
                if(data[index2] ===  undefined)
                {
                    continue;
                }
                
                blokLi_Ul_Li.push(data[index2]);
                console.log(blokLi_Ul_Li,'blokLi_Ul_Li') 
            }
            let id = nanoid();
            let offset = 0;
            if(index !== 0) offset+=1500;
            //console.log('translate', navstate.translate)
            let style = {
                position: 'absolute',
                transform: `translateX(${navstate.translate+offset}px)`,
                transition: 'all 1s ease 0s',
            }

            index === navstate.currentScreen ? classActive = 'active': classActive = '';

            blokLi = (
                <li className={'blokLi '+ classActive} key={id} style={style}>
                    <ul className='blokLi_Ul'>
                        {blokLi_Ul_Li}
                    </ul>
                </li>
            )
                
            arrBloksLi.push(blokLi);
            console.log(arrBloksLi, 'arrBloksLi');
            blokLi_Ul_Li = [];
        }
    }

    
    //start 
    if(data !== undefined) {
        generateBloks()
    }


    

    return (
        <>
            <BsChevronLeft className='arrow_nav' onClick={LeftOffset}/>
                <ul className='data'>
                    {arrBloksLi}
                </ul>
            <BsChevronRight className='arrow_nav' onClick={RightOffset}/>
        </>
    );
}

//export default { Carusel, LeftOffset, RightOffset }