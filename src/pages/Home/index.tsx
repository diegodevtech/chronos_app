import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { Countdown } from '../../components/Countdown';
import { Form } from '../../components/Form';
import { MainTemplate } from '../../templates/MainTemplate';

export function Home() {
  useEffect(() => {
    document.title = 'Chronos App';
  }, []);
  return (
    <MainTemplate>
      <Container>
        <Countdown />
      </Container>
      <Container>
        <Form />
      </Container>
    </MainTemplate>
  );
}
