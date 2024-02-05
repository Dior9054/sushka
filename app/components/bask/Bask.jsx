"use client"

import { useEffect, useState } from "react";

function Bask({ name, price, setCount, setmony, item, el }) {
    const [state, setState] = useState(0)

    useEffect(() => {
        let a = JSON.parse(localStorage.getItem("cart")) ?? []
        a.forEach(elem => {
            if (elem.id == item.id) {
                elem.sizes.forEach(element => {
                    if (element.id == el.id) {
                        if (element?.quantity) {
                            setState(element.quantity)
                        }
                    }
                })
            }
        })
    }, [])

    useEffect(() => {
        let oldData = JSON.parse(localStorage.getItem('cart')) || []
        if (oldData) {
            let newData = oldData.map(element => {
                if (element.id == item.id) {
                    element.sizes = element.sizes.map(elem => {
                        if (elem.id == el.id) {
                            element.bought = !!state
                            return { ...elem, quantity: state }
                        } else {
                            return elem
                        }
                    })
                }
                return element
            })
            localStorage.setItem('cart', JSON.stringify(newData))
        }
        setCount(prev => prev + 1)
    }, [state])

    return (
        <div className="buy__info">
            <div className="buy__info--left">
                <p>{name}</p>
                <p>{price}</p>
            </div>
            <div className="buy__info--right">
                <button onClick={() => {
                    setState(prev => state > 0 ? prev -= 1 : prev)
                    setCount(prev => state > 0 ? prev -= 1 : prev)
                }}>-</button>
                <h1>{state}</h1>
                <button onClick={() => {
                    setState(prev => prev += 1)
                    setCount(prev => prev += 1)
                }}>+</button>
            </div>
        </div >
    );
}

export default Bask;



