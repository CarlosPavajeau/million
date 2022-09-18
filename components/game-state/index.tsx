import React from 'react'
import { Col, Grid, Row, Spacer, Text } from '@nextui-org/react'
import { useCategory, useCurrentQuestion, useGameState } from '../../store'

const GameState = () => {
  const category = useCategory()
  const question = useCurrentQuestion()
  const { score, currentQuestion, maxQuestions } = useGameState()

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

      <Row justify="center">
        <Col>
          <Text size={24} css={{ textAlign: 'center' }}>
            Puntuación actual: {score}
          </Text>
        </Col>
      </Row>
    </>
  )
}

export default GameState
