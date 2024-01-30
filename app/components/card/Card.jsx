
import { Cart, Likes } from "@/app/main/layout";
import { useContext, useEffect, useState } from "react";
import Own from "../own/Own";

export default function Card({ food, canOpen }) {
    const [fave, setFave] = useContext(Likes)
    const [add, setAdd] = useContext(Cart)
    const [favorite, setFavorite] = useState(false)
    const [page, setPage] = useState(false)
    const [cart, setCart] = useState(false)

    const get__Local = () => JSON.parse(localStorage.getItem("favorite")) || []
    const get__cart = () => JSON.parse(localStorage.getItem("cart")) || []

    const check__Local = () => get__Local().some(item => item.id == food.id)
    const check__cart = () => get__cart().some(item => item.id == food.id)

    const price__Sort = () => food.sizes.sort((a, b) => a.price - b.price)[0].price

    const handle__Click = () => {
        let data = check__Local() ? get__Local().filter(item => item.id != food.id) : [...get__Local(), food]
        localStorage.setItem('favorite', JSON.stringify(data))
        setFavorite(check__Local())
        setFave(get__Local().length)
    }

    const handle__cart = () => {
        let data = check__cart() ? get__cart().filter(item => item.id != food.id) : [...get__cart(), food]
        localStorage.setItem("cart", JSON.stringify(data))
        setCart(check__cart())
        setAdd(get__cart().length)
    }

    useEffect(() => {
        setFave(get__Local().length)
        setFavorite(check__Local())
    }, [fave])

    useEffect(() => {
        setAdd(get__cart().length)
        setCart(check__cart())
    }, [add])

    return (
        <>
            {
                canOpen
                    ?
                    page
                        ?
                        <Own
                            page={page}
                            setPage={setPage}
                            food={food}
                            cart={cart}
                            check__cart={check__cart}
                            get__cart={get__cart}
                            setCart={setCart}
                            setAdd={setAdd}
                        />
                        :
                        ""
                    :
                    ""
            }
            <div className="card">
                <img src={food.image} onClick={() => setPage(prev => !prev)} />
                <div className="card__block">
                    <div className="card__favorite">
                        <h1 className="card__favorite--title">{food.name}</h1>
                        <button className="button card__favorite--btn" onClick={handle__Click}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="17"
                                viewBox="0 0 21 17"
                                fill="none">
                                <path d="M14.6667 0C12.7417 0 11.0458 0.9625 10.0833 2.475C9.12083 0.9625 7.425 0 5.5 0C2.475 0 0 2.475 0 5.5C0 10.9542 10.0833 16.5 10.0833 16.5C10.0833 16.5 20.1667 11 20.1667 5.5C20.1667 2.475 17.6917 0 14.6667 0Z" fill={favorite ? "#FF0014" : '#ffff'} />
                            </svg>
                        </button>
                    </div>
                    <div className="card__add">
                        <h2 className="card__add--price">${price__Sort()}</h2>
                        <button className={`card__add--btn ${cart ? "active" : ""}`} onClick={handle__cart}>
                            <img src="/assets/svg/plus.svg" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

