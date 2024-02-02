import axios from "axios"

export const axiosJS = axios.create({
    baseURL: "https://tynybekfood.pythonanywhere.com/api/v1/",
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    },
})

export async function axiosGet(el) {
    try {
        let date__send = await axiosJS.get(el)
        let date__get = await date__send.data
        if (!date__get) throw new Error('Failed to fetch data')
        return date__get
    } catch {
        return null
    }
}

