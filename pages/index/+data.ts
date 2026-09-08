// Этот файл выполняется ТОЛЬКО на сервере (SSR). Vike не включает его
// в клиентский бандл. Отсюда безопасно ходить в файловую систему —
// это эмулирует "приход блоков из внешней CMS": в прод-версии
// достаточно подменить loadAllBlocks() на HTTP-клиент к CMS API.
import { loadAllBlocks } from '../../server/content-loader'
import type { Block } from '../../server/types'

export type Data = {
  blocks: Block[]
}

export const data = async (): Promise<Data> => {
  const blocks = await loadAllBlocks()
  return { blocks }
}
