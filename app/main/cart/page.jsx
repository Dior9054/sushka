"use client"

import Buy from "@/app/components/buy/Buy";
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
  const [all, setAll] = useState({ mony: 0, count: 0 })
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

  useEffect(() => {
    let date = JSON.parse(localStorage.getItem("cart")) || []
    setState(date)
  }, [])

  return (
    <Foods.Provider value={[food, setFood]}>
      {
        flip.good
          ?
          <Order text="Заказ успешна отправлен" color="lightgreen" />
          :
          flip.loading
            ?
            <Order text="Загрузка" color="gray" />
            :
            flip.err
              ?
              <Order text="Ошибка" color="red" />
              :
              ""
      }
      <div className="buy">
        <div className="buy__body">
          {
            state
              ?
              state.map((item, index) => (
                <Buy
                  item={item}
                  key={index}
                  state={state}
                  setState={setState}
                  setCount={setCount}
                  count={count}
                  mony={mony}
                  setAll={setAll}
                  all={all}
                  setmony={setmony} />
              ))
              :
              ""
          }
        </div>
        <div className="buy__bottom">
          <h1>Общее количество блюд: <span>{state}</span></h1>
          <p>Обший счёт: <span>{
            () => {
              let a = JSON.parse(localStorage.getItem("cart"))

              a.reduce((previousValue, currentValue) => {
                let run = 0
                currentValue.sizes.reduce((previous, current) => {
                  return previous += +current.price
                }, 0)

                return previousValue += +run
              }, 0)

              console.log(run);
            }
          }</span></p>
          <button className="button" onClick={handle__Click}>Заказать все блюда</button>
        </div>
      </div>
    </Foods.Provider>
  );
}

