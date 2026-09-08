import { useData } from 'vike-react/useData'
import type { Data } from './+data'
import { BlockRenderer } from '../../components/BlockRenderer'

export default function Page() {
  // Данные приехали с сервера (SSR), форма гидратируется на клиенте
  const { blocks } = useData<Data>()

  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={`${block.id}-${block.order}`} block={block} />
      ))}
    </>
  )
}
