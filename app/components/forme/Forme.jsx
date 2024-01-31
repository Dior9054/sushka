
function Forme({ setOpen, handle__submit }) {

    const handle__Click = (e) => {
        let check = !e.target.closest(".handle__form") || !!e.target.closest(".handle__close")
        if (check) setOpen(prev => !prev)
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
                        <input type="email" placeholder="Enter your email..." id="email" name="email" required />
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