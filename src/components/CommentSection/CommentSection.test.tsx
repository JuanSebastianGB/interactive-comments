import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { UserContext } from '../../context';
import { apiResponse } from '../mocks';
import CommentSection from './CommentSection';

beforeEach(cleanup);
describe('CommentSection', () => {
  it.concurrent('should have + and -', () => {
    //@ts-ignore
    render(<CommentSection />);
    screen.getByText(/\+/);
    screen.getAllByText(/-/);
  });
  it.concurrent('should have replay text', () => {
    //@ts-ignore
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
    //@ts-ignore
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
    //@ts-ignore
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
    //@ts-ignore
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
    //@ts-ignore
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
    //@ts-ignore
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
    //@ts-ignore
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
    //@ts-ignore
    render(<CommentSection {...info} />);
    expect(screen.getByTestId('comment-score')).toBeDefined();
  });
  it.concurrent(
    'should exists replies if replies provided list is not empty',
    () => {
      render(<CommentSection {...apiResponse.comments[1]} />);
      screen.getAllByRole('cell');
    }
  );
  it.concurrent(
    'should be 2 replies rendered if 2 replies are provided',
    () => {
      render(<CommentSection {...apiResponse.comments[1]} />);
      expect(screen.getAllByRole('cell')).toHaveLength(2);
    }
  );
  it.todo(
    'if is a reply of the user should show Edit and Delete buttons',
    () => {
      cleanup();
      const mock = {
        id: 4,
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: '2 days ago',
        score: 2,
        replyingTo: 'ramsesmiron',
        user: {
          image: {
            png: './images/avatars/image-juliusomo.png',
            webp: './images/avatars/image-juliusomo.webp',
          },
          username: 'juliusomo',
        },
      };
      render(
        <UserContext.Provider value={{ currentUser: mock }}>
          <CommentSection isReply {...mock} />
        </UserContext.Provider>
      );
      screen.debug();
      screen.getByText(/edit/i);
      screen.getByText(/delete/i);
    }
  );
});
