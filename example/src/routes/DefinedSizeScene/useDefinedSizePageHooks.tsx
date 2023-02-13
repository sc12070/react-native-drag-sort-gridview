import { useCallback, useState } from 'react'

export default () => {
  const [data, setData] = useState<Array<string>>('HELOL WODRL!'.split(''))

  const onOrderChanged = useCallback((orderedData: Array<string>) => setData(orderedData), [])

  return {
    data,
    onOrderChanged
  }
}
