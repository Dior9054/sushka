"use client"

import { Hid } from "@/app/main/layout";
import { Render__foods } from "@/app/main/page";
import { useContext, useEffect, useState } from "react";
import { axiosGet } from "../axios/axiosJS";
import Loading from "../loading/Loading";
import Not__load from "../notLoad/Not__load";

export default function Navigation() {
    const [category, setCategory] = useState({
        isOk: true,
        isLoad: false,
        result: null
    })

    const [hide, setHide] = useContext(Hid)
    const [foods, setFoods] = useContext(Render__foods)
    const [activeIndex, setActiveIndex] = useState(0)

    const handle__Enter = (e) => {
        if (e) {
            let block = e?.target ? e.target : e
            let parent__block = document.querySelector(".navigation")
            let tringle = parent__block.querySelector(".nav__tringle")
            let clear__active = parent__block.querySelectorAll(".nav__item")

            clear__active.forEach(item => item.classList.remove("active"))

            block.classList.add("active")

            if (window.innerWidth < 768) tringle.style.top = `${block.offsetTop + (block.offsetHeight / 100 * 40)}px`
            else tringle.style.left = `${block.offsetLeft + (block.offsetWidth / 100 * 40)}px`
        }
    }

    const handle__Leave = (e) => {
        let block = document.querySelector(".navigation")
        let parent__block = block.querySelectorAll(".nav__item")
        let active__block = parent__block[activeIndex]
        let tringle = block.querySelector('.nav__tringle')

        e.target.classList.remove("active")
        active__block.classList.add("active")

        if (window.innerWidth < 768) tringle.style.top = `${active__block.offsetTop + (active__block.offsetHeight / 100 * 40)}px`
        else tringle.style.left = `${active__block.offsetLeft + (active__block.offsetWidth / 100 * 40)}px`
    }

    const handle__Click = (e) => {
        if (+e.target.value == 0) {
            setFoods(prev => {
                return {
                    isOk: true,
                    isLoad: false,
                    result: null
                }
            })
            axiosGet(`food?page_size=10`)
                .then(res => {
                    if (!!res) setFoods({ isOk: true, isLoad: true, result: res })
                    else setFoods({ isOk: false })
                })
        } else {
            setFoods(prev => {
                return {
                    isOk: true,
                    isLoad: false,
                    result: null
                }
            })
            const url__params = new URLSearchParams()
            url__params.set("page_size", 10)
            url__params.set("category", e.target.name)
            axiosGet(`food?${url__params.toString()}`)
                .then(res => {
                    if (!!res) setFoods({ isOk: true, isLoad: true, result: res })
                    else setFoods({ isOk: false })
                })
        }

        setActiveIndex(e.target.value)
        if (window.innerWidth <= 768) setHide(prev => !prev)
    }

    useEffect(() => {
        axiosGet("categories")
            .then(res => {
                if (!!res) setCategory({ isOk: true, isLoad: true, result: res })
                else setCategory({ isOk: false })
            })

        axiosGet(`food?page_size=10`)
            .then(res => {
                if (!!res) setFoods({ isOk: true, isLoad: true, result: res })
                else setFoods({ isOk: false })
            })
    }, [])

    useEffect(() => {
        handle__Enter(document.querySelectorAll(".nav__item")[activeIndex])
    }, [category, activeIndex, hide])

    const handle__Open = (e) => {
        if (!(e.target.closest(".navigation"))) setHide(prev => !prev)
    }

    return (
        <>
            {
                category.isOk
                    ?
                    (
                        <div className={`navigation__nodal ${hide ? "active" : ""}`} onClick={handle__Open}>
                            <div className={`navigation ${hide ? "active" : ""}`}>
                                <img src="/assets/svg/tringle.svg" className="nav__tringle" />
                                {
                                    category.isLoad
                                        ?
                                        <>
                                            <button
                                                className="nav__item"
                                                value={0}
                                                onMouseEnter={handle__Enter}
                                                onMouseLeave={handle__Leave}
                                                onClick={handle__Click}
                                            >
                                                all
                                            </button>
                                            {
                                                category.result.map((item, index) => (
                                                    <button
                                                        className="nav__item"
                                                        key={item.id}
                                                        name={item.id}
                                                        value={index + 1}
                                                        onMouseEnter={handle__Enter}
                                                        onMouseLeave={handle__Leave}
                                                        onClick={handle__Click}
                                                    >
                                                        {item.name}
                                                    </button>
                                                ))
                                            }
                                        </>
                                        :
                                        <Loading />
                                }
                                {
                                    hide
                                        ?
                                        <button
                                            className="button nav__close"
                                            onClick={() => setHide(prev => !prev)}
                                        >
                                            <img src="/assets/svg/close.svg" />
                                        </button>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                    )
                    :
                    <Not__load
                        text={"Данные не загружены проверьте подключение к интернету или попробуйте позже"}
                    />
            }
        </>
    )
}

