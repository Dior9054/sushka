"use client"

import { useState } from "react";
import Bask from "../bask/Bask";

function Buy({ item, setCount, setmony, setState }) {
    const [see, setSee] = useState(true)

    const handle__Click = () => {
        let base = JSON.parse(localStorage.getItem("cart"))
        let c = ""
        base.forEach(elem => { if (elem.id == item.id) c = elem })

        let count = 0
        let price = 0

        c.sizes.forEach(elem => {
            count += +elem.quantity
            if (!!elem.quantity) {
                price += elem.quantity * +elem.price
            }
        })

        setCount(prev => prev -= count)
        setmony(prev => prev -= price)

        setState(prev => {
            let a = []
            prev.forEach(elem => {
                if (elem.id != item.id) {
                    a.push(elem)
                }
            })
            localStorage.setItem("cart", JSON.stringify(a))
            return a
        })
    }

    return (
        <div className="buy__card">
            <div className="buy__left">
                <img src={item?.image} />
            </div>
            <div className="buy__right">
                <div className="buy__det">
                    <button className="button buy__close" onClick={handle__Click}>
                        <img src="/assets/svg/close.svg" />
                    </button>
                    <h1 className="page--name">{item?.name}</h1>
                    <div className={`page__bag ${see ? "active" : ""}`}>
                        <span className="page--descrip">{item?.description}</span>
                        <span onClick={() => setSee(prev => !prev)}>
                            {!!see ? "Развернуть" : "Свернуть"}
                        </span>
                    </div>
                    {
                        item?.sizes?.map(el => (
                            <Bask
                                key={el.id}
                                name={el.name}
                                price={el.price}
                                setCount={setCount}
                                setmony={setmony}
                                item={item}
                                el={el}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Buy;


