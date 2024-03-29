import { Counte } from "@/app/main/layout"
import { useContext } from "react"
import { axiosJS } from "../axios/axiosJS"

function Forme({ setOpen, setFlip, mony }) {
    const [count, setCount] = useContext(Counte)

    const handle__Click = (e) => {
        let check = !e.target.closest(".handle__form") || !!e.target.closest(".handle__close")
        if (check) setOpen(prev => !prev)
    }

    const handle__submit = (e) => {
        e.preventDefault()

        let userDate = new FormData(e.target)
        userDate = Object.fromEntries(userDate.entries())
        console.log(userDate);

        let totalDate = ""
        totalDate += `2) Имя: ${userDate.name} \n`
        totalDate += `3) Email: ${userDate.email} \n`
        totalDate += `4) Телефон: ${userDate.phone} \n`
        totalDate += `5) Адресс: ${userDate.address} \n`
        totalDate += `6) Дом: ${userDate.home} \n`
        totalDate += `7) Коментари: ${userDate.comments} \n`
        totalDate += `8) Способ доставки: ${userDate.service_status == "delivery" ? "Доставка" : "Самовызов"} \n`

        let b = JSON.parse(localStorage.getItem("cart"))

        let ordering_food = []
        let orderNumber = 0

        totalDate += "Заказы: \n"

        b.forEach(item => {
            console.log(b);
            if (!!item.bought) {
                totalDate += `  ${orderNumber += 1}) ${item.name} \n`
                let sizes = []
                item.sizes.forEach(el => {
                    sizes.push({
                        size: el.id,
                        quantity: el.quantity
                    })
                    if (!!el.quantity) {
                        totalDate += `            ${el.name} ${el.quantity}штук \n`
                    }
                })
                ordering_food.push({
                    food: item.id,
                    sizes_for_sale: sizes
                })
            }
        })

        let time = new Date()

        totalDate += `Итог: ${mony.mony}сом \n`
        totalDate += `Время: ${time}`

        let crorder = {
            ordering_food: ordering_food,
            ...userDate
        }

        setFlip(prev => {
            return {
                good: false,
                loading: true,
                ispaid: false,
                err: false
            }
        })

        if (mony.mony > 800) {
            axiosJS.post("orders/", crorder)
                .then(res => {
                    fetch(`https://api.telegram.org/bot6713213966:AAH4BFRuKmQR5spD7TfcS7frHJ1gZr2eyDM/sendMessage`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: "-4136328784",
                            text: "1) id: " + res.data.id + "\n" + totalDate,
                        }),
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.ok) {
                                setFlip(prev => {
                                    return {
                                        good: true,
                                        loading: false,
                                        ispaid: false,
                                        err: false
                                    }
                                })
                                setTimeout(() => setFlip(prev => {
                                    return {
                                        good: false,
                                        loading: false,
                                        ispaid: false,
                                        err: false
                                    }
                                }), 5000)
                                let a = JSON.parse(localStorage.getItem("cart"))
                                let b = a.map(item => {
                                    item.sizes.map(item1 => {
                                        return item1.quantity = 0
                                    })

                                    return { ...item }
                                })
                                localStorage.setItem("cart", JSON.stringify(b))
                                setCount(prev => -1)
                            } else {
                                setFlip(prev => {
                                    return {
                                        good: false,
                                        loading: false,
                                        ispaid: false,
                                        err: true
                                    }
                                })
                            }
                        })
                })
                .catch(err => setFlip(prev => {
                    return {
                        good: false,
                        loading: false,
                        ispaid: false,
                        err: true
                    }
                }))
        } else {
            setFlip(prev => {
                return {
                    good: false,
                    loading: false,
                    ispaid: true,
                    err: false
                }
            })
        }
        setTimeout(() => setFlip(prev => {
            return {
                good: false,
                loading: false,
                ispaid: false,
                err: false
            }
        }), 5000)
        setOpen(prev => !prev)
    }

    return (
        <div className="handle" onClick={handle__Click}>
            <form className="handle__form" onSubmit={handle__submit}>
                <h1 className="handle__title">Заказать блюда</h1>
                <div className="handle__block">
                    <label htmlFor="name">
                        Name
                        <input type="text" placeholder="Enter your name..." minLength="3" id="name" name="name" required />
                    </label>
                </div>
                <div className="handle__block">
                    <label htmlFor="email">
                        Email
                        <input type="email" placeholder="Enter your email..." id="email" name="email" />
                    </label>
                </div>
                <div className="handle__block">
                    <label htmlFor="phone">
                        Phone
                        <input type="tel" pattern="^\+996\d{9}$" placeholder="+996..." minLength="12" id="phone" name="phone" required />
                    </label>
                </div>
                <div className="handle__block">
                    <label htmlFor="address">
                        Address
                        <input type="text" placeholder="Enter your address..." minLength="2" id="address" name="address" required />
                    </label>
                </div>
                <div className="handle__block">
                    <label htmlFor="home">
                        Home
                        <input type="text" placeholder="Enter your home..." minLength="1" id="home" name="home" required />
                    </label>
                </div>
                <div className="handle__block">
                    <label htmlFor="comments">
                        Comments
                        <textarea type="text" placeholder="Enter your comment..." cols="3" rows="3" maxLength="300" id="comments" name="comments"></textarea>
                    </label>
                </div>
                <div className="handle__radio">
                    <div className="handle__check">
                        <input type="radio" id="pickup" name="service_status" value="pickup" required />
                        <label htmlFor="pickup">Самовызов</label>
                    </div>
                    <div className="handle__check">
                        <input type="radio" id="delivery" name="service_status" value="delivery" required />
                        <label htmlFor="delivery">Доставка</label>
                    </div>
                </div>
                <button type="submit" className="handle__button">Отправить</button>
                <button type="button" className="button handle__close">
                    <img src="/assets/svg/close.svg" />
                </button>
            </form>
        </div>
    );
}

export default Forme;

