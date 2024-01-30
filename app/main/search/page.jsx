"use client"

import Card from "@/app/components/card/Card";
import Input from "@/app/components/input/Input";
import Loader__block from "@/app/components/loader__block/Loader__block";
import Not__load from "@/app/components/notLoad/Not__load";
import { useState } from "react";

export default function page() {
    const [date, setDate] = useState({
        isOk: true,
        has__res: true,
        isLoad: false,
        result: null
    })

    return (
        <div>
            <div className="search">
                <label htmlFor="bar" className="button">
                    <img src="/assets/svg/search.svg" />
                </label>
                <Input setDate={setDate} />
            </div>
            <div className="cards">
                {
                    date.isOk
                        ?
                        date.isLoad
                            ?
                            date.has__res
                                ?
                                date.result.map(item => (
                                    <Card key={item.id} food={item} canOpen={true} />
                                ))
                                :
                                <Not__load text={"Ничего не найдена"} />
                            :
                            <Loader__block />
                        :
                        <Not__load text={"Данные не загружены проверьте подключение к интернету или попробуйте позже"} />
                }
            </div>
        </div>
    );
}

