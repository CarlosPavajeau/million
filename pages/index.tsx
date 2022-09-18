import type { NextPage } from 'next'
import {
  Button,
  Col,
  Container,
  Row,
  Spacer,
  styled,
  Text
} from '@nextui-org/react'

// Container than occupies 100% of the viewport and centers its content vertically
const StyledContainer = styled(Container, {
  height: '100vh',
  alignItems: 'center',
})

const Home: NextPage = () => {
  return (
    <StyledContainer lg alignItems="center" display="flex">
      <Col>
        <Row justify="center">
          <Text h1>Bienvenido</Text>
        </Row>

        <Spacer y={3}/>

        <Row justify="center">
          <Button size="xl" color="gradient" shadow>Iniciar juego</Button>
        </Row>
      </Col>
    </StyledContainer>
  )
}

export default Home
