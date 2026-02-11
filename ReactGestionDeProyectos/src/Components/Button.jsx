const Button = ({type='submit', className, ...props}) => (
    <button type={type} 
    className={`${className} inline-flex items-center
    font-semibold uppercase`}
      {...props}
      />
)

export default Button