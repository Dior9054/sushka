import Link from "next/link";

export default function Home() {
  return (
    <div className="home">

      <div className="home__image">
        <img src="/assets/img/main.png" />
      </div>

      <div className="home__texts">
        <h2 className="home__text--favorite">Ваша любимая</h2>
        <h1 className="home__text--sushi">Пицца</h1>
        <p className="home__text--time">
          Доставим вашу любимую пиццу 
          <span>быстро</span>
        </p>
      </div>

      <div className="home__button">
        <Link href="/main">
          <button className="big__btn home__btn">Давайте выберем</button>
        </Link>
      </div>
    </div>
  )
}

