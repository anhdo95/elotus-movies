import classnames from 'classnames'

export type SelectItem = {
  value: number | string
  text: string
}

type ComponentProps = {
  className?: string
  items: SelectItem[]
  value: SelectItem['value']
  onChange(selectedValue: SelectItem['value']): void
}

function SelectMenus(props: ComponentProps) {
  function handleChange(e: React.SyntheticEvent) {
    props.onChange((e.target as HTMLSelectElement).value)
  }

  return (
    <div
      className={classnames(
        'cursor-pointer relative max-w-md',
        props.className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <select
        className="cursor-pointer w-full px-2 py-1 text-sm pr-9 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        onChange={handleChange}
        value={props.value}
      >
        {props.items.map((item) => (
          <option
            // selected={props.value === item.value}
            key={item.value}
            value={item.value}
          >
            {item.text}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectMenus
