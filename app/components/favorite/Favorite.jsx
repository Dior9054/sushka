

"use client"

import Card from "../card/Card"

function Favorite({ setModal, fave }) {
    const get__Favorite = () => JSON?.parse(localStorage?.getItem("favorite")) || []

    const handle__Click = (e) => {
        let check__el = !e.target.closest(".modal__body") || !!e.target.closest(".modal__close")
        if (check__el) {
            e.target.closest(".modal").classList.add("active")
            setTimeout(() => setModal(prev => !prev), 200)
        }
    }

    return (
        <div className="modal" onClick={handle__Click}>
            <div className="modal__body">
                <button className="button modal__close">
                    <img src="/assets/svg/close.svg" />
                </button>
                <h1>Yor Favorites</h1>
                <div className={`modal__block ${!!fave ? "" : "active"}`}>
                    {
                        !!fave
                            ?
                            get__Favorite().map(item => (
                                <Card key={item.id} food={item} canOpen={false} />
                            ))
                            :
                            <div className="modal__empty">Пуста</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Favorite;
