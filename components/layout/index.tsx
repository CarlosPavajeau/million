import { Container, styled } from '@nextui-org/react'
import { FC, PropsWithChildren } from 'react'

const StyledContainer = styled(Container, {
  height: '100vh',
  alignItems: 'center',
})

const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <StyledContainer lg alignItems="center" display="flex">
      {children}
    </StyledContainer>
  )
}

export default Layout
