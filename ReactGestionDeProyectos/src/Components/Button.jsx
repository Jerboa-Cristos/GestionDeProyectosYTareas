const Button = ({type='submit', className, ...props}) => (
    <button type={type} 
    className={`${className} inline-flex items-center
    font-semibold text-blueDark uppercase bg-blueBase hover:bg-blueDark
    active:bg-blueDark disabled:opacity-0`}
      {...props}
      />
)

export default Button