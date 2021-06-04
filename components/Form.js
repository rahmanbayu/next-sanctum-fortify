export const Input = (props) => {
    return <input {...props} className="block w-full focus:outline-none py-1 px-2 rounded border border-gray-300" />;
};

export const Label = (props) => {
    return (
        <label {...props} className="text-sm mb-1 block capitalize">
            {props.children}
        </label>
    );
};
export const Error = (props) => {
    return <div className="mt-1 text-red-500 text-sm">{props.children}</div>;
};
