function Card(props) {
    return (
        <div className="shadow rounded-lg overflow-hidden">
            <div className="text-center p-5 font-medium pb-5 border-b border-gray-300 ">{props.header}</div>
            <div className="p-5">{props.children}</div>
        </div>
    );
}

export default Card;
