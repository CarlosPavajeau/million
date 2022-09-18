import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Button, Col, Row, Spacer, Text } from '@nextui-org/react'

const Home: NextPage = () => {
  return (
    <>
      <Col>
        <Row justify="center">
          <Text h1>Bienvenido</Text>
        </Row>

        <Spacer y={3}/>

        <Row justify="center">
          <NextLink href="/game" passHref>
            <Button size="xl" color="gradient" shadow as="a">
              Iniciar juego
            </Button>
          </NextLink>
        </Row>
      </Col>
    </>
  )
}

export default Home
