"use client"

import { useEffect, useState } from "react";
import { axiosGet } from "../axios/axiosJS";
import useDebounce from "../debounce/useDebounce";

function Input({ setDate }) {
    const [state, setState] = useState("")
    const debSearch = useDebounce(state, 500)

    useEffect(() => {
        setDate({ isOk: true, has__res: false, isLoad: false, result: null })

        const url = new URLSearchParams({ "search": state })

        axiosGet("food?" + url.toString())
            .then(res => {
                if (!!res) {
                    if (!!res[0]) setDate({ isOk: true, has__res: true, isLoad: true, result: res })
                    else setDate({ isOk: true, has__res: false, isLoad: true, result: null })
                } else {
                    setDate({ isOk: false })
                }
            })
    }, [debSearch])

    return (
        <input
            type="text"
            placeholder="Search..."
            value={state}
            onChange={(e) => setState(e.target.value)}
            id="bar"
        />
    );
}

export default Input;

