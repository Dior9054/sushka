"use client"

import { Cart } from "@/app/main/layout";
import { useContext, useEffect, useState } from "react";
import Bask from "../bask/Bask";

function Buy({ item, setCount, setmony, all, setState, setAll, count, mony }) {
    const [see, setSee] = useState(true)
    const [add, setAdd] = useContext(Cart)
    // const [all, setAll] = useState([])

    const handle__Click = () => {
        if (count > 0) {

            console.log(all);

            //     setAll(prev => prev.filter(elem => {
            //         // console.log(elem?.mony);
            //         // console.log(all[all.length - 1]?.mony);
            //         // if (elem?.mony != all[all.length - 1]?.mony) {
            //         //     return { ...elem }
            //         // }

            //         if (elem?.id != all[0]?.id) {
            //             return elem
            //         }
            //     }))

            //     console.log(all);

            //     setState(prev => {
            //         let a = []
            //         prev.forEach(elem => {
            //             if (elem.id != item.id) {
            //                 a.push({ ...elem })
            //             }
            //         })
            //         localStorage.setItem("cart", JSON.stringify(a))
            //         return a
            //     })

            //     console.log(all);

            //     console.log(all[0]?.mony);
            //     console.log(all[0]?.count);

            //     // console.log(item);

            //     setAdd(prev => prev -= 1)

            //     // setmony(prev => prev - ((all[0]?.mony * all[0]?.count) || 0))
            //     setmony(prev => prev ? prev - +all[0]?.mony * +all[0]?.count : prev)

            //     setCount(prev => prev - (all[0]?.count || 0))
        }
    }

    useEffect(() => {

        let a = JSON.parse(localStorage.getItem("cart"))

        let b = a.reduce((previousValue, currentValue) => {
            return previousValue += currentValue.sizes.reduce((previous, current) => {
                return previous += current.quantity
            }, 0)
        }, 0)

    }, [count])

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
                                all={all}
                                setAll={setAll}
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


