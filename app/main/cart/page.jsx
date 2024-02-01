"use client"

import { axiosJS } from "@/app/components/axios/axiosJS";
import Buy from "@/app/components/buy/Buy";
// import Forme from "@/app/components/forme/Forme";
import Order from "@/app/components/orders/Order";
import { createContext, useContext, useEffect, useState } from "react";
import { Flip, Mony, Open } from "../layout";

export const Foods = createContext("")

export default function page() {
  const [state, setState] = useState("")
  const [count, setCount] = useState(0)
  const [mony, setmony] = useContext(Mony)
  const [open, setOpen] = useContext(Open)
  const [flip, setFlip] = useContext(Flip)
  const [food, setFood] = useState([{
    name: '',
    size: [
      {
        name: "",
        count: 0,
        price: 0
      }
    ]
  }])

  const handle__Click = (e) => {
    if (!!count) setOpen(prev => !prev)
  }

  // const handle__submit = (e) => {
  //   e.preventDefault()

  //   let userDate = new FormData(e.target)
  //   userDate = Object.fromEntries(userDate.entries())

  //   let totalDate = ""
  //   let fix = 0
  //   for (let key in userDate) {
  //     totalDate += `${fix += 1}) ${key}: ${userDate[key]}; \n`
  //   }

  //   let b = JSON.parse(localStorage.getItem("cart"))

  //   let ordering_food = []
  //   let orderNumber = 0

  //   totalDate += "Заказы: \n"

  //   b.forEach(item => {
  //     if (!!item.bought) {
  //       totalDate += `  ${orderNumber += 1}) ${item.name} \n`
  //       let sizes = []
  //       item.sizes.forEach(el => {
  //         sizes.push({
  //           size: el.id,
  //           quantity: el.quantity
  //         })
  //         if (!!el.quantity) {
  //           totalDate += `            ${el.name} ${el.quantity}штук \n`
  //         }
  //       })
  //       ordering_food.push({
  //         food: item.id,
  //         sizes_for_sale: sizes
  //       })
  //     }
  //   })

  //   let time = new Date()

  //   totalDate += `Итог: ${mony}сом \n`
  //   totalDate += `Время: ${time}`

  //   let crorder = {
  //     ordering_food: ordering_food,
  //     ...userDate
  //   }

  //   axiosJS.post("orders/", crorder)
  //     .then(res => {
  //       fetch(`https://api.telegram.org/bot6713213966:AAH4BFRuKmQR5spD7TfcS7frHJ1gZr2eyDM/sendMessage`, {
  //         method: "POST",
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           chat_id: "-4136328784",
  //           text: totalDate,
  //         }),
  //       })
  //         .then(res => res.json())
  //         .then(res => {
  //           setTimeout(() => setFlip(prev => !prev), 200)
  //           setTimeout(() => setFlip(prev => !prev), 4000)
  //         })
  //     })
  //     .catch(err => console.log(err))

  //   setOpen(prev => !prev)
  // }

  useEffect(() => {
    let date = JSON.parse(localStorage.getItem("cart")) || []
    setState(date)
  }, [])

  return (
    <Foods.Provider value={[food, setFood]}>
      {
        flip
          ?
          <Order />
          :
          ""
      }
      {
        // !!open
        // ?
        // <Forme setOpen={setOpen} handle__submit={handle__submit} />
        // :
        // ""
      }
      <div className="buy">
        <div className="buy__body">
          {
            state
              ?
              state.map(item => (
                <Buy
                  item={item}
                  key={item.id}
                  setCount={setCount}
                  setmony={setmony} />
              ))
              :
              ""
          }
        </div>
        <div className="buy__bottom">
          <h1>Общее количество блюд: <span>{count}</span></h1>
          <p>Обший счёт: <span>{mony}</span></p>
          <button className="button" onClick={handle__Click}>Заказать все блюда</button>
        </div>
      </div>
    </Foods.Provider>
  );
}

