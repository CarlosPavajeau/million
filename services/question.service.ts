import { http } from './http'
import { Question } from '../types'

export const QuestionService = {
  fetchByCategory: async (category: number) => {
    const {data} = await http.get<Question[]>(`questions/${category}`)
    return data
  },
  validateAnswer: async (answer: number) => {
    const {data} = await http.get<boolean>(`questions/validate/${answer}`)
    return data
  }
}
