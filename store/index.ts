import create from 'zustand'
import { CategoryService } from '../services/category.service'
import { Category, Question } from '../types'
import { useEffect } from 'react'
import { QuestionService } from '../services/question.service'

type GameStore = {
  category?: Category
  score: number

  currentQuestion: number
  maxQuestions: number

  questions: Question[]

  gameOver: boolean

  loadFirstCategory: () => Promise<void>
  loadNextCategory: () => Promise<void>

  loadQuestions: () => Promise<void>

  validateAnswer: (answerId: number) => Promise<void>

  reset: () => void
  endGame: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  category: undefined,
  score: 0,
  currentQuestion: 1,
  maxQuestions: 5,
  questions: [],
  gameOver: false,

  loadFirstCategory: async () => {
    const category = await CategoryService.fetchFirst()
    set({ category })

    await get().loadQuestions()
  },

  loadNextCategory: async () => {
    const current = get().category
    const category = await CategoryService.fetchNext(current?.difficulty || 0)
    set({ category })
  },

  loadQuestions: async () => {
    const category = get().category
    if (category) {
      const questions = await QuestionService.fetchByCategory(category.id)
      set({ questions })
    }
  },

  validateAnswer: async (answerId: number) => {
    const result = await QuestionService.validateAnswer(answerId)

    if (result) {
      const currentQuestion = get().questions[get().currentQuestion - 1]
      set({ score: get().score + currentQuestion.reward })

      if (get().currentQuestion < get().maxQuestions) {
        set({ currentQuestion: get().currentQuestion + 1 })
        return
      }

      try {
        await get().loadNextCategory()
        await get().loadQuestions()
        set({ currentQuestion: 1 })
      } catch (error: any) {
        if (error?.response?.status === 404) {
          get().endGame()
        }
      }

      return
    }

    set({ score: 0 })
    get().endGame()
  },

  reset: () => {
    set({
      category: undefined,
      score: 0,
      currentQuestion: 1,
      maxQuestions: 5,
      questions: [],
      gameOver: false,
    })
  },

  endGame: () => {
    set({ gameOver: true })
  },
}))

export const useCategory = () => {
  const loadFirstCategory = useGameStore(x => x.loadFirstCategory)
  const category = useGameStore(x => x.category)

  useEffect(() => {
    if (!category) {
      loadFirstCategory().then()
    }
  }, [loadFirstCategory, category])

  return category
}

type GameState = {
  score: number

  currentQuestion: number
  maxQuestions: number

  gameOver: boolean
}

export const useGameState = () =>
  useGameStore<GameState>(state => ({
    score: state.score,
    currentQuestion: state.currentQuestion,
    maxQuestions: state.maxQuestions,
    gameOver: state.gameOver,
  }))

export const useCurrentQuestion = () => {
  const currentQuestion = useGameStore(x => x.currentQuestion)
  const questions = useGameStore(x => x.questions)

  return questions[currentQuestion - 1]
}
