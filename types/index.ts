export type Category = {
  id: number
  name: string
  difficulty: number
}

export type Answer = {
  id: number
  content: string
}

export type Question = {
  content: string
  reward: number

  answers: Answer[]
}
