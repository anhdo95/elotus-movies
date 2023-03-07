export type Option = {
  title: string
  choices: Array<{
    name: string
    value: string
  }>
}

type FilterOptions = Record<string, Option>

export default FilterOptions
