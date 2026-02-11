import { EventEmitter } from 'events'

const emitter = new EventEmitter()
emitter.setMaxListeners(100)

export function publish<T>(event: string, data: T): void {
  emitter.emit(event, data)
}

export function subscribe<T>(event: string): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator]() {
      const queue: T[] = []
      let resolve: ((value: IteratorResult<T>) => void) | null = null

      const listener = (data: T) => {
        if (resolve) {
          const r = resolve
          resolve = null
          r({ value: data, done: false })
        } else {
          queue.push(data)
        }
      }

      emitter.on(event, listener)

      return {
        next(): Promise<IteratorResult<T>> {
          if (queue.length > 0) {
            return Promise.resolve({ value: queue.shift()!, done: false })
          }
          return new Promise<IteratorResult<T>>((r) => {
            resolve = r
          })
        },
        return(): Promise<IteratorResult<T>> {
          emitter.off(event, listener)
          return Promise.resolve({ value: undefined as unknown as T, done: true })
        },
        throw(error: Error): Promise<IteratorResult<T>> {
          emitter.off(event, listener)
          return Promise.reject(error)
        },
      }
    },
  }
}
