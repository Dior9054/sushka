"use client"

import { Cart } from "@/app/main/layout";
import { useContext, useState } from "react";
import Bask from "../bask/Bask";

function Buy({ item, setCount, setmony, setState, state }) {
    const [see, setSee] = useState(true)
    const [add, setAdd] = useContext(Cart)

    const handle__Click = () => {
        setState(prev => {
            let c = JSON.parse(localStorage.getItem("cart"))
            let a = c.filter(elem => elem.id != item.id)
            localStorage.setItem("cart", JSON.stringify(a))
            return a
        })
        setCount(prev => prev + 1)
        setAdd(prev => prev - 1)
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


