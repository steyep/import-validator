import React, { ReactNode } from 'react';
import styles from './layout.module.scss';
import { Container } from 'react-bootstrap';
import { Header } from '../header/header';

type LayoutTypes = {
  children?: ReactNode
}

const Layout = ({ children } : LayoutTypes) => {
  return (
    <Container className={styles.wrapper} bsPrefix={styles.container}>
      <Header/>
      <Container className={styles.layoutContainer}>{children}</Container>
    </Container>
  );
}

export default Layout;