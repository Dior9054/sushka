"use client"

import { createContext, useContext, useEffect, useState } from "react";
import Card from "../components/card/Card";
import Navigation from "../components/navigation/Navigation";
import Not__load from "../components/notLoad/Not__load";
import Loader__block from "../components/loader__block/Loader__block";
import { Little } from "./layout";
import useDebounce from "../components/debounce/useDebounce";
import { axiosGet } from "../components/axios/axiosJS";

export const Render__foods = createContext(null)

export default function page() {
    const [foods, setFoods] = useState({
        isOk: true,
        isLoad: false,
        result: null
    })
    const [name, setName] = useState("")

    const [offset] = useContext(Little)
    const debounce = useDebounce(offset, 500)

    useEffect(() => {
        if (foods?.result?.next) {
            axiosGet(foods.result.next)
                .then(res => {
                    setFoods(prev => {
                        return {
                            isOk: true,
                            isLoad: true,
                            result: {
                                ...prev.result,
                                next: res.next,
                                results: [
                                    ...prev.result.results,
                                    ...res.results
                                ]
                            }
                        }
                    })
                })
        }

    }, [debounce])

    return (
        <Render__foods.Provider value={[foods, setFoods]}>
            <Navigation setName={setName} />
            <div className="main__content">
                <div className="main__title">
                    <h1>Типы {name}</h1>
                    <h2>Попробуйте лучшие блюда в Оше</h2>
                </div>
                <div className="cards">
                    {
                        foods.isOk
                            ?
                            foods.isLoad
                                ?
                                foods?.result?.results.map((item, index) => (
                                    <Card
                                        key={index}
                                        food={item}
                                        canOpen={true}
                                    />
                                ))
                                :
                                <Loader__block />
                            :
                            <Not__load text={"Не удалось загрузить данные"} />
                    }
                </div>
            </div>
        </Render__foods.Provider>
    );
}

