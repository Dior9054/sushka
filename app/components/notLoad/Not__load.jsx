
export default function Not__load({ text }) {
    return (
        <div className="err">
            <img src="/assets/svg/err.svg" />
            <p className="navigation__error">{text}</p>
        </div>
    );
}
