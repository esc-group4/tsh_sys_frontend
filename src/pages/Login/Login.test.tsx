import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider, useAuth } from '../../contexts/UserContext';

// Mocking the useAuth hook
jest.mock('../../contexts/UserContext', () => ({
  ...jest.requireActual('../../contexts/UserContext'),
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const setup = () => {
  return render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );
};

describe('Login Page Validation', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      currentUser: null,
      login: jest.fn().mockResolvedValue({ user: { getIdToken: () => Promise.resolve('mockToken') } }),
      setUserData: jest.fn(),
      userData: null,
    });
  });

  test('Empty Email', async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password1' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
  });

  test('Empty Password', async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'javertan@TSH.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('Empty Email and Empty Password', async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('Invalid Email and Empty Password', async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'javertan' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('Valid Email and Password', async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'javertan@TSH.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password1' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockedUseAuth().login).toHaveBeenCalledWith('javertan@TSH.com', 'password1');
    });
  });
});
