import { axiosJS } from "../axios/axiosJS"

function Forme({ setOpen, setFlip, mony }) {

    const handle__Click = (e) => {
        let check = !e.target.closest(".handle__form") || !!e.target.closest(".handle__close")
        if (check) setOpen(prev => !prev)
    }

    const handle__submit = (e) => {
        e.preventDefault()

        let userDate = new FormData(e.target)
        userDate = Object.fromEntries(userDate.entries())

        let totalDate = ""
        let fix = 0
        for (let key in userDate) {
            totalDate += `${fix += 1}) ${key}: ${userDate[key]}; \n`
        }

        let b = JSON.parse(localStorage.getItem("cart"))

        let ordering_food = []
        let orderNumber = 0

        totalDate += "Заказы: \n"

        b.forEach(item => {
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

        totalDate += `Итог: ${mony}сом \n`
        totalDate += `Время: ${time}`

        let crorder = {
            ordering_food: ordering_food,
            ...userDate
        }

        setFlip(prev => {
            return {
                good: false,
                loading: true,
                err: false
            }
        })

        axiosJS.post("orders/", crorder)
            .then(res => {
                fetch(`https://api.telegram.org/bot6713213966:AAH4BFRuKmQR5spD7TfcS7frHJ1gZr2eyDM/sendMessage`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: "-4136328784",
                        text: totalDate,
                    }),
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res.ok) {
                            setFlip(prev => {
                                return {
                                    good: true,
                                    loading: false,
                                    err: false
                                }
                            })
                        } else {
                            setFlip(prev => {
                                return {
                                    good: false,
                                    loading: false,
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
                    err: true
                }
            }))

        setTimeout(() => setFlip(prev => {
            return {
                good: false,
                loading: false,
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
                <button type="submit" className="handle__button">Отправить</button>
                <button type="button" className="button handle__close">
                    <img src="/assets/svg/close.svg" />
                </button>
            </form>
        </div>
    );
}

export default Forme;

