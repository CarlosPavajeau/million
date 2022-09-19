import { Category } from '../types'
import { http } from './http'

export const CategoryService = {
  fetchAll: async () => {
    const {data} = await http.get<Category[]>('categories')
    return data
  },
  fetchFirst: async () => {
    const {data} = await http.get<Category>('categories/first')
    return data
  },
  fetchNext: async (difficulty: number) => {
    const {data} = await http.get<Category>(`categories/next/${difficulty}`)
    return data
  }
}
