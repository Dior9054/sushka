
"use client"

import { useEffect, useState } from "react";
import Bask from "../bask/Bask";

function Buy({ item, setCount, setmony }) {
    const [see, setSee] = useState(true)

    return (
        <div className="buy__card">
            <div className="buy__left">
                <img src={item.image} />
            </div>
            <div className="buy__right">
                <div className="buy__det">
                    <h1 className="page--name">{item.name}</h1>
                    <div className={`page__bag ${see ? "active" : ""}`}>
                        <span className="page--descrip">{item.description}</span>
                        <span onClick={(e) => {
                            setSee(prev => !prev)
                            if (!!see) {
                                e.target.innerText = "Свернуть"
                            } else {
                                e.target.innerText = "Развернуть"
                            }
                        }
                        }>Развернуть</span>
                    </div>
                    {
                        item.sizes.map(el => (
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