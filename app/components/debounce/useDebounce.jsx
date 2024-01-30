
"use client"

import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
    const [state, setState] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setState(value)
        }, delay);

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return state
}

