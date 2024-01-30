"use client"

import { useState } from "react"

function Own({ page, food, setPage, cart, setCart, setAdd, check__cart, get__cart }) {
    const [see, setSee] = useState(true)

    const handle__cart = () => {
        let data = check__cart() ? get__cart().filter(item => item.id != food.id) : [...get__cart(), food]
        localStorage.setItem("cart", JSON.stringify(data))
        setCart(check__cart())
        setAdd(get__cart().length)
    }

    const handle__Click = (e) => {
        let check__el = !e.target.closest(".page__body") || !!e.target.closest(".page__close")
        if (check__el) {
            e.target.closest(".page").classList.add("active")
            setTimeout(() => setPage(prev => !prev), 200)
        }
    }

    return (
        <div className="page" onClick={handle__Click}>
            <div className="page__body">
                <button className="button page__close">
                    <img src="/assets/svg/arrow__left.svg" />
                </button>
                <div>
                    <div className="page__top">
                        <img src={food.image} />
                    </div>
                    <div className="page__bottom">
                        <h1 className="page--name">{food.name}</h1>
                        <div className={`page__bag ${see ? "active" : ""}`}>
                            <span className="page--descrip">{food.description}</span>
                            <span onClick={() => setSee(prev => !prev)}>
                                {!!see ? "Развернуть" : "Свернуть"}
                            </span>
                        </div>
                        <div>
                            <div className="page__block">
                                <h1 className="page--det">Ингредиенты</h1>
                                <ul className="page__out">
                                    {
                                        food.makeups.map(item => (
                                            <li key={item.id} className="page--items">{item.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="page__block">
                                <h1 className="page--det">Размер</h1>
                                <ul className="page__out">
                                    {
                                        food.sizes.map(item => (
                                            <li key={item.id} className="page--items">
                                                <div className="page__size">
                                                    <p className="page--items">{item.name}</p>
                                                    <p className="page--items">{item.price}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="page__block">
                                <h1 className="page--det">Вес</h1>
                                <ul className="page__out">
                                    {
                                        food.weight.map(item => (
                                            <li key={item.id} className="page--items">{item.value}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        cart
                            ?
                            <button className="button page__cart" onClick={handle__cart}>Убрать из карзины</button>
                            :
                            <button className="button page__cart active" onClick={handle__cart}>Добавить в карзину</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Own;