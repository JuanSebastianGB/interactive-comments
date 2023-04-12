import './App.css';
import { AddComment, CommentsList } from './components';
import { UserProvider } from './context';
import data from './data.json';
import { Container } from './styled-components';

const info = {
  username: 'ramsesmiron',
  content: `If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.`,
  createdAt: '1 week ago',
  image: './src/assets/avatars/image-ramsesmiron.png',
  score: 1,
};

function App() {
  return (
    <UserProvider>
      <Container data-testid="comments-section">
        <CommentsList {...data} />
        <AddComment data={data} />
      </Container>
    </UserProvider>
  );
}

export default App;
