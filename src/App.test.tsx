import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('初期画面に投稿フォームが含まれている', () => {
  render(<App />);
  expect(screen.getByText('登録')).toBeInTheDocument();
});
