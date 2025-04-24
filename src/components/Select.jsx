import React , {useId} from 'react'

function Select({
    label,
    options,
    className = '',
    ...props
},ref) {

  const id = useId();
  return (
    <div className="max-w-sm mx-auto w-full">
    {label && (
      <label
        htmlFor={id}
        className="block mb-1 text-gray-700 font-semibold text-sm"
      >
        {label}
      </label>
    )}
  
    <select
      id={id}
      className={`
        w-full
        px-4 py-2.5
        rounded-md
        bg-gray-100
        border border-gray-300
        text-gray-900
        placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition duration-300
        appearance-none
        ${className}
      `}
      ref={ref}
      {...props}
    >
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
  
  )
}

export default React.forwardRef(Select)