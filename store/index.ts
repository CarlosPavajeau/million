import create from 'zustand'
import { CategoryService } from '../services/category.service'
import { Category, Question } from '../types'
import { useEffect } from 'react'

type GameStore = {
  category?: Category
  score: number;

  currentQuestion: number;
  maxQuestions: number;

  questions: Question[];

  loadFirstCategory: () => Promise<void>;
}

export const useGameStore = create<GameStore>(set => ({
  category: undefined,
  score: 20,
  currentQuestion: 2,
  maxQuestions: 5,
  questions: [],

  loadFirstCategory: async () => {
    const category = await CategoryService.fetchFirst()
    set({category})
  }
}))

export const useCategory = () => {
  const loadFirstCategory = useGameStore(x => x.loadFirstCategory)
  useEffect(() => {
    loadFirstCategory().then()
  }, [loadFirstCategory])

  return useGameStore(x => x.category)
}

export const useGameState = () => useGameStore(state => [state.score, state.currentQuestion, state.maxQuestions])
