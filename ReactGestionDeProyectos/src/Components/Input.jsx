const Input = ({disabled=false, className, ...props}) => (
    <input 
    disabled={disabled}
    className={`${className}`}
    placeholder={props.placeholder}
    />
)

export default Input