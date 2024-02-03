"use client"
import { createContext, useEffect, useState } from "react";
import Favorite from "../components/favorite/Favorite";
import Forme from "../components/forme/Forme";
import Header from "../components/header/Header";
import Menu from "../components/menu/Menu";

export const Likes = createContext(0)
export const Cart = createContext(0)
export const Open__modal = createContext(false)
export const Hid = createContext(false)
export const Little = createContext(0)
export const Open = createContext(false)
export const Flip = createContext(false)
export const Mony = createContext(0)

export default function RootLayout({ children }) {
    const [fave, setFave] = useState(0)
    const [add, setAdd] = useState(0)
    const [modal, setModal] = useState(false)
    const [hide, setHide] = useState(false)
    const [offset, setOffset] = useState(0)
    const [open, setOpen] = useState(false)
    const [flip, setFlip] = useState({
        good: false,
        loading: false,
        err: false
    })
    const [mony, setmony] = useState([])

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
                            <Open.Provider value={[open, setOpen]}>
                                <Flip.Provider value={[flip, setFlip]}>
                                    <Mony.Provider value={[mony, setmony]}>
                                        {
                                            modal
                                                ?
                                                <Favorite setModal={setModal} fave={fave} />
                                                :
                                                ""
                                        }
                                        {
                                            open
                                                ?
                                                <Forme setOpen={setOpen} setFlip={setFlip} mony={mony} />
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
                                    </Mony.Provider>
                                </Flip.Provider>
                            </Open.Provider>
                        </Open__modal.Provider>
                    </Likes.Provider >
                </Cart.Provider>
            </Hid.Provider>
        </Little.Provider>
    );
}
