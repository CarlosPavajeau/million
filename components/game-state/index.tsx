import React from 'react'
import { Button, Col, Grid, Row, Spacer, Text } from '@nextui-org/react'
import {
  useCategory,
  useCurrentQuestion,
  useGameState,
  useGameStore,
} from '../../store'

const GameState = () => {
  const category = useCategory()
  const question = useCurrentQuestion()
  const { score, currentQuestion, maxQuestions } = useGameState()
  const endGame = useGameStore(x => x.endGame)

  return (
    <>
      <Row justify="center">
        <Col>
          <Text size={24} css={{ textAlign: 'center' }}>
            Pregunta número {currentQuestion} de {maxQuestions} en la categoría{' '}
            <Text b>{category?.name || 'Sin definir'}</Text> por{' '}
            {question?.reward || 'Sin definir'} puntos.
          </Text>
        </Col>
      </Row>

      <Spacer y={1.5} />

      <Row justify="space-between">
        <Col>
          <Text size={24} css={{ textAlign: 'center' }}>
            Puntuación actual: {score}
          </Text>
        </Col>

        <Col>
          <Row justify="flex-end">
            <Button auto flat color="error" onClick={endGame}>
              Finalizar
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default GameState
