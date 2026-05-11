import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import { Container, Row, Label } from 'reactstrap';
import './App.css';

export default defineContentScript({
  matches: ['*'],
  main() {
    return (
      <>
      <Container>
          <Row>
            <Label>
              EATEN!
            </Label>
          </Row>
      </Container>
      </>
    );
  },
});