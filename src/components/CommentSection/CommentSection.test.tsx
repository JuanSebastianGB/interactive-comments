import { fireEvent, render, screen } from '@testing-library/react';
import CommentSection from './CommentSection';

beforeEach(() => {});
describe('CommentSection', () => {
  it.concurrent('should have + and -', () => {
    render(<CommentSection />);
    screen.getByText(/\+/);
    screen.getAllByText(/-/);
  });
  it.concurrent('should have replay text', () => {
    render(<CommentSection />);
    screen.getAllByText(/reply/i);
  });
  it.concurrent('should render the given info', () => {
    const info = {
      user: {
        image: {
          png: './images/avatars/image-maxblagun.png',
          webp: './images/avatars/image-maxblagun.webp',
        },
        username: 'maxblagun',
      },
      content: 'hello world',
      createdAt: '1 month ago',
    };
    render(<CommentSection {...info} />);
    screen.getByText(info.user.username);
    screen.getByText(info.content);
    screen.getByText(info.createdAt);
  });
  it.concurrent('should render the right user image', () => {
    const info = {
      user: {
        image: {
          png: 'src/images/avatars/image-maxblagun.png',
          webp: 'src/images/avatars/image-maxblagun.webp',
        },
        username: 'maxblagun',
      },
      content: 'hello world',
      createdAt: '1 month ago',
    };

    render(<CommentSection {...info} />);
    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toBe(info.user.image.png);
  });
  it.concurrent('should render the given score', () => {
    const info = {
      username: 'test',
      content: 'hello world',
      createdAt: '1 month ago',
      image: './images/avatars/image-ramsesmiron.png',
      score: 10,
    };
    render(<CommentSection {...info} />);
    screen.getByText(info.score.toString());
  });
  it.concurrent('should increase score by one when + is clicked', () => {
    const info = {
      username: 'test',
      content: 'hello world',
      createdAt: '1 month ago',
      image: './images/avatars/image-ramsesmiron.png',
      score: 10,
    };
    render(<CommentSection {...info} />);
    fireEvent.click(screen.getByText(/\+/));
    screen.getByText((info.score + 1).toString());
  });
  it.concurrent('should decrease score by one when - is clicked', () => {
    const info = {
      username: 'test',
      content: 'hello world',
      createdAt: '1 month ago',
      image: './images/avatars/image-ramsesmiron.png',
      score: 10,
    };
    render(<CommentSection {...info} />);
    fireEvent.click(screen.getByText(/-/));
    screen.getByText((info.score - 1).toString());
  });
  it.concurrent('should not decrease score below 0', () => {
    const info = {
      username: 'test',
      content: 'hello world',
      createdAt: '1 month ago',
      image: './images/avatars/image-ramsesmiron.png',
      score: 1,
    };
    render(<CommentSection {...info} />);
    fireEvent.click(screen.getByText(/-/));
    fireEvent.click(screen.getByText(/-/));
    screen.getByText('0');
  });
  it.concurrent('should show score 0 if not score provided', () => {
    const info = {
      username: 'test',
      content: 'hello world',
      createdAt: '1 month ago',
      image: './images/avatars/image-ramsesmiron.png',
    };
    render(<CommentSection {...info} />);
    expect(screen.getByTestId('comment-score')).toBeDefined();
  });
});
