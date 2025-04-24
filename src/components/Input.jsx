import React ,{useId} from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  className = '',
  ...props
},ref){

  const id  = useId();
  return (
    <div className="max-w-sm mx-auto">
  {label && (
    <label
      className="block mb-1 text-gray-600 font-semibold text-sm"
      htmlFor={id}
    >
      {label}
    </label>
  )}

  <input
    id={id}
    type={type}
    className={`
      w-full
      px-4 py-2.5
      rounded-md
      bg-gray-100
      border border-gray-300
      text-gray-900
      placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      transition
      duration-300
      ${className}
    `}
    ref={ref}
    {...props}
  />
</div>

  
  )
})



export default Input