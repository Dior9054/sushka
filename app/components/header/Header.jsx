"use client"

import { Hid, Likes, Open__modal } from "@/app/main/layout";
import Link from "next/link"
import { useContext } from "react";

export default function Header() {
    const [fave] = useContext(Likes)
    const [modal, setModal] = useContext(Open__modal)
    const [hide, setHide] = useContext(Hid)

    const handle__Click = () => {
        if (window.location.pathname == "/main") {
            let a = document.querySelector(".navigation__nodal")
            a.classList.add("open")
            setHide(prev => !prev)
        }
    }

    const handle__Favorite = (e) => {
        if (e.target.closest(".button--favorite")) {
            setModal(prev => !prev)
        }
    }

    return (
        <header className="header">
            <div className="header__logo">
                <Link href="/">
                    <img src="/assets/YP_logo.png" />
                </Link>
            </div>
            <div className="header__burger">
                <button className="button burger" onClick={handle__Click}>
                    <img src="/assets/svg/burger__menu.svg" />
                </button>
                <button className="button button--favorite" onClick={handle__Favorite}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="53" viewBox="0 0 52 53" fill="none">
                        <path d="M30.6667 18C28.7417 18 27.0458 18.9625 26.0833 20.475C25.1208 18.9625 23.425 18 21.5 18C18.475 18 16 20.475 16 23.5C16 28.9542 26.0833 34.5 26.0833 34.5C26.0833 34.5 36.1667 29 36.1667 23.5C36.1667 20.475 33.6917 18 30.6667 18Z" fill={!!fave ? "#FF0014" : "#FFF"} />
                    </svg>
                    {
                        !!fave
                            ?
                            <span>{fave}</span>
                            :
                            ""
                    }
                </button>
            </div >
        </header >
    );
}

