import { Button, Col, Row, Spacer, Text } from '@nextui-org/react'
import GameState from '../../components/game-state'
import QuestionView from '../../components/question'
import { useGameState, useGameStore } from '../../store'
import NextLink from 'next/link'

const GameView = () => {
  const { score, gameOver } = useGameState()
  const reset = useGameStore(x => x.reset)

  return (
    <Col>
      <Row justify="center">
        <Text h1>Million</Text>
      </Row>

      {!gameOver && (
        <>
          <Spacer y={1} />

          <GameState />

          <Spacer y={1} />

          <QuestionView />

          <Spacer y={1.5} />
        </>
      )}

      {gameOver && (
        <>
          <Row justify="center">
            <Text size={24} css={{ textAlign: 'center' }}>
              Has terminado el juego con {score} puntos.
            </Text>
          </Row>

          <Spacer y={1} />

          <Row justify="center">
            <Button onClick={reset}>Reiniciar</Button>
          </Row>
        </>
      )}
    </Col>
  )
}

export default GameView
