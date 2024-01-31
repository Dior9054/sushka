
"use client"

import { useEffect, useState } from "react";

function Bask({ name, price, setCount, setmony, item, el }) {
    const [state, setState] = useState(0)

    useEffect(() => {
        let oldData = JSON.parse(localStorage.getItem('cart') ?? '[]')
        if (oldData) {
            let newData = oldData.map(element => {
                if (element.id == item.id) {
                    element.sizes = element.sizes.map(siz => siz.id == el.id ? { ...siz, quantity: state } : siz)
                    element.bought = !!state
                }
                return element
            })
            localStorage.setItem('cart', JSON.stringify(newData))
        }
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
                    setmony(prev => state > 0 ? prev -= +price : prev)
                }}>-</button>
                <h1>{state}</h1>
                <button onClick={() => {
                    setState(prev => prev += 1)
                    setCount(prev => prev += 1)
                    setmony(prev => prev += +price)
                }}>+</button>
            </div>
        </div >
    );
}

export default Bask;


