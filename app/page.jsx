import Link from "next/link";

export default function Home() {
  return (
    <div className="home">

      <div className="home__image">
        <img src="/assets/img/main.png" />
      </div>

      <div className="home__texts">
        <h2 className="home__text--favorite">Your Favourite</h2>
        <h1 className="home__text--sushi">Sushi</h1>
        <p className="home__text--time">
          We will deliver your favourite sushi in
          <span> 30 minutes</span>
        </p>
      </div>

      <div className="home__button">
        <Link href="/main">
          <button className="big__btn home__btn">Let’s choose</button>
        </Link>
      </div>

    </div>
  )
}

