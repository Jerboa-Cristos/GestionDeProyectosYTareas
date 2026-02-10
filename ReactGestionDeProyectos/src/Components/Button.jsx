const Button = ({type='submit', className, ...props}) => (
    <button type={type} 
    className={`${className} inline-flex items-center bg-opacity-0
    font-semibold text-blueDark uppercase hover:bg-blueDark focus:bg-red
    active:bg-blueDark disabled:opacity-0 `}
      {...props}
      />
)

export default Button