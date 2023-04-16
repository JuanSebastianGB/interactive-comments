import './App.css';
import { CommentsList } from './components';
import { FormCreateComment } from './components/CommentSection/forms';
import { UserProvider } from './context';
import { Container } from './styled-components';

function App() {
  return (
    <UserProvider>
      <Container data-testid="comments-section">
        <CommentsList />
        <FormCreateComment />
      </Container>
    </UserProvider>
  );
}

export default App;
