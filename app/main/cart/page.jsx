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

  useEffect(() => {
    console.log("true");
  }, [])

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("cart")) || []

    setmony(prev => {
      let counte = a.reduce((previousValue, currentValue) => {
        let b = currentValue.sizes.reduce((previus, currnet) => {
          if (currnet?.quantity >= 0) {
            return previus += Number(currnet?.quantity) ?? 0
          } else {
            return previus += 0
          }
        }, 0)

        return previousValue += +b
      }, 0)

      let mony = a.reduce((previousValue, currentValue) => {
        let b = currentValue.sizes.reduce((previus, curren) => {
          if (curren.quantity) {
            return previus += +curren.price * curren.quantity
          } else {
            return 0
          }
        }, 0)
        return previousValue += +b
      }, 0)

      return { count: counte, mony: mony }
    })

  }, [count])

  useEffect(() => {
    let date = JSON.parse(localStorage.getItem("cart")) || []
    setState(date)
  }, [])

  const handle__Click = (e) => {
    if (!!count) setOpen(prev => !prev)
  }

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
                  setState={setState}
                  state={state}
                  setCount={setCount}
                  setmony={setmony} />
              ))
              :
              ""
          }
        </div>
        <div className="buy__bottom">
          <h1>Общее количество блюд: <span>{mony.count}</span></h1>
          <p>Обший счёт: <span>{mony.mony}</span></p>
          <button className="button" onClick={handle__Click}>Заказать все блюда</button>
        </div>
      </div>
    </Foods.Provider>
  );
}

