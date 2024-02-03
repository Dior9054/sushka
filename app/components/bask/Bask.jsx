"use client"

import { useEffect, useState } from "react";

function Bask({ name, price, setCount, setmony, item, el, setAll, all }) {
    const [state, setState] = useState(0)

    useEffect(() => {
        let oldData = JSON.parse(localStorage.getItem('cart') ?? '[]')
        if (oldData) {
            let newData = oldData.map(element => {
                if (element.id == item.id) element.sizes = element.sizes.map(siz => siz.id == el.id ? { ...siz, quantity: state, bought: state > 0 ? true : false } : siz)
                return element
            })
            localStorage.setItem('cart', JSON.stringify(newData))
        }

        let a = JSON.parse(localStorage.getItem("cart"))

        let b = a.reduce((previousValue, currentValue) => {
            let run = currentValue.sizes.reduce((previous, current) => {
                return previous += +current.quantity
            }, 0)
            return previousValue += run
        }, 0)

        let c = a.reduce((previousValue, currentValue) => {
            let run = currentValue.sizes.reduce((a, b) => {
                if (!!b.quantity) {
                    return a += +b.price * b.quantity
                }
            }, 0) || 0

            return previousValue += run
        }, 0)

        setmony(c)

        setCount(b)

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
                    // setCount(prev => prev -= 1)
                    setAll(prev => prev + 1)
                }}>-</button>
                <h1>{state}</h1>
                <button onClick={() => {
                    setState(prev => prev += 1)
                    setAll(prev => prev + 1)
                    // setCount(prev => prev += 1)
                }}>+</button>
            </div>
        </div >
    );
}

export default Bask;



