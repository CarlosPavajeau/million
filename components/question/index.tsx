import {
  Button,
  Card,
  Grid,
  Row,
  Spacer,
  styled,
  Text,
} from '@nextui-org/react'
import { useCurrentQuestion, useGameStore } from '../../store'

const AnswerButton = styled(Button, {
  width: '100% !important',
})

const QuestionView = () => {
  const question = useCurrentQuestion()
  const validateAnswer = useGameStore(state => state.validateAnswer)

  return (
    <>
      {question && (
        <>
          <Card>
            <Card.Body>
              <Text size={30} css={{ textAlign: 'center' }}>
                {question.content}
              </Text>
            </Card.Body>
          </Card>

          <Spacer y={1.5} />

          <Grid.Container gap={2}>
            {question.answers.map(answer => (
              <Grid xs={12} md={6} key={answer.id}>
                <Row justify="center">
                  <AnswerButton
                    size="xl"
                    onClick={() => validateAnswer(answer.id)}
                  >
                    {answer.content}
                  </AnswerButton>
                </Row>
              </Grid>
            ))}
          </Grid.Container>
        </>
      )}
    </>
  )
}

export default QuestionView
