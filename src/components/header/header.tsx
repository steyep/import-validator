import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import styles from './header.module.scss'

export const Header = () => {
  return (
    <Navbar className={styles.navbar} data-bs-theme="dark">
      <Container>
        <Navbar.Brand>{process.env.REACT_APP_NAME}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
