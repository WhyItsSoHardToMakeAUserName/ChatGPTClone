import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';
import { ChatApi } from '../../api/ai-chat';

// Мокаем API перед тестами
jest.mock('../../api/ai-chat', () => ({
  ChatApi: {
    sendMessage: jest.fn(),
  },
}));

describe('Home component', () => {
  it('sends user message and receives AI response', async () => {
    // 1. Подготовим mock-ответ от API
  (ChatApi.sendMessage as jest.Mock).mockImplementation(() =>
  new Promise((resolve) => setTimeout(() => {
    resolve({ answer: 'Hello, I am your AI assistant!' });
  }, 300)) // wait 300ms to simulate loading state
  );


  // 2. Отрендерим компонент
  render(<Home />);

  // 3. Введем сообщение
  const input = screen.getByPlaceholderText(/ask whatever you want/i);
  fireEvent.change(input, { target: { value: 'Hi there' } });

  // 4. Нажмем на кнопку отправки
  const sendButton = screen.getByRole('button');
  fireEvent.click(sendButton);

  // 5. Проверим, что отображается пользовательское сообщение
  expect(await screen.findByText('Hi there')).toBeInTheDocument();

  // 6. Пока ждём ответ, появится индикатор "Typing..."
  expect(await screen.findByText(/typing.../i)).toBeInTheDocument();


  // 7. Дождемся ответа от AI
  expect(await screen.findByText('Hello, I am your AI assistant!')).toBeInTheDocument();

  // 8. Убедимся, что индикатор исчез
  await waitFor(() =>
    expect(screen.queryByText(/typing.../i)).not.toBeInTheDocument()
  );

  // 9. Убедимся, что API действительно был вызван с правильным текстом
  expect(ChatApi.sendMessage).toHaveBeenCalledWith('Hi there');
});
});
