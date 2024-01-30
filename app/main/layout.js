"use client"
import { createContext, useEffect, useState } from "react";
import Favorite from "../components/favorite/Favorite";
import Header from "../components/header/Header";
import Menu from "../components/menu/Menu";

export const Likes = createContext(0)
export const Cart = createContext(0)
export const Open__modal = createContext(false)
export const Hid = createContext(false)
export const Little = createContext(0)

export default function RootLayout({ children }) {
    const [fave, setFave] = useState(0)
    const [add, setAdd] = useState(0)
    const [modal, setModal] = useState(false)
    const [hide, setHide] = useState(false)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        setFave(JSON?.parse(localStorage?.getItem("favorite"))?.length || 0)
        setAdd(JSON?.parse(localStorage?.getItem("cart"))?.length || 0)
    }, [])

    const handle__scroll = () => {
        let elements = document.querySelector(".card:last-child")
        if (elements) {
            var targetPosition = {
                top: window.pageYOffset + elements.getBoundingClientRect().top,
                bottom: window.pageYOffset + elements.getBoundingClientRect().bottom
            }
            let windowPosition = {
                top: window.pageYOffset,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            }

            if (targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom) setOffset(prev => prev += 1)
        }
    }

    return (
        <Little.Provider value={[offset, setOffset]}>
            <Hid.Provider value={[hide, setHide]}>
                <Cart.Provider value={[add, setAdd]}>
                    <Likes.Provider value={[fave, setFave]}>
                        <Open__modal.Provider value={[modal, setModal]}>
                            {
                                modal
                                    ?
                                    <Favorite setModal={setModal} fave={fave} />
                                    :
                                    ""
                            }
                            <div>
                                <div className="parent">
                                    <Menu />
                                    <div className="content" onScroll={handle__scroll}>
                                        <Header />
                                        <main className="main">
                                            {children}
                                        </main>
                                    </div>
                                </div>
                            </div>
                        </Open__modal.Provider>
                    </Likes.Provider >
                </Cart.Provider>
            </Hid.Provider>
        </Little.Provider>
    );
}

