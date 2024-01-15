import { memo } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
`

const ShellContainer = memo((props) => {

  return (
    <Container>
      {props.children}
    </Container>
  )
})

export default ShellContainer
