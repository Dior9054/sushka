
function Order({ text, color }) {
    return (
        <div className={`order ${color}`}>
            <h1>{text}</h1>
        </div>
    );
}

export default Order;