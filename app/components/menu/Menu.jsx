"use client"

import { Cart } from "@/app/main/layout"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

export default function Menu() {
    const [activeIndex, setActiveIndex] = useState(1)
    const [state, setState] = useState([
        {
            id: 1,
            href: '/main/search',
            src: "/assets/svg/search.svg",
            isActive: false
        },
        {
            id: 2,
            href: '/main',
            src: "/assets/svg/home.svg",
            isActive: false
        },
        {
            id: 3,
            href: '/main/cart',
            src: "/assets/svg/cart.svg",
            isActive: false
        }
    ])
    const [add] = useContext(Cart)

    const handle__Enter = (e) => {
        if (e) {
            let event = e?.target ? e.target : e
            let parentBlock = document.querySelectorAll(".menu__block")
            let dote = document.querySelector(".menu__line")

            parentBlock.forEach(item => item.classList.remove("active"))

            if (window.innerWidth <= 768) dote.style.left = `${event.offsetLeft + (event.offsetWidth / 100 * 40)}px`
            else dote.style.top = `${event.offsetTop + (event.offsetHeight / 100 * 50)}px`

            setState(prev => prev.map((item, index) => index == activeIndex ? { ...item, isActive: true } : { ...item, isActive: false }))
        }
    }

    const handle__Leave = (event) => {
        let parent__block = document.querySelectorAll(".menu__block")
        let navItem = document.querySelectorAll(".menu__block")[activeIndex]
        let dote = document.querySelector(".menu__line")

        parent__block[activeIndex].classList.add("active")

        if (window.innerWidth <= 768) dote.style.left = `${navItem.offsetLeft + (navItem.offsetWidth / 100 * 40)}px`
        else dote.style.top = `${navItem.offsetTop + (navItem.offsetHeight / 100 * 50)}px`
    }

    useEffect(() => {
        handle__Enter(document.querySelectorAll(".menu__block")[activeIndex])
    }, [activeIndex])

    useEffect(() => {
        const current__Location__Index = () => state.findIndex(item => item.href == window.location.pathname)
        setActiveIndex(current__Location__Index())
    }, [])


    return (
        <div className="menu">
            <span className="menu__line"></span>
            {
                state.map((item, index) => (
                    <Link
                        href={item.href}
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                    >
                        <div
                            className={`menu__block ${item.isActive ? "active" : ""}`}
                            onMouseEnter={handle__Enter}
                            onMouseLeave={handle__Leave}
                        >
                            <div className="menu__item">
                                <img src={item.src} />
                                {
                                    index == 2 && !!add
                                        ?
                                        <span className="menu__length">{add}</span>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div >
    )
}

