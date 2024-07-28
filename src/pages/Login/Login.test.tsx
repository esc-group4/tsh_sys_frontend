// checks if validation works

import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
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

const setup = async () => {
  await act(async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );
  });
};

describe('Login Page Rendering', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      currentUser: null,
      login: jest.fn().mockResolvedValue({ user: { getIdToken: () => Promise.resolve('mockToken') } }),
      setUserData: jest.fn(),
      userData: null,
    });
  });

  test('renders login page with all elements', async () => {
    await setup();

    await waitFor(() => {
      expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
      expect(screen.getByText(/training management system/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  });
});

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
    await setup();

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password1' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));


    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
  });

  test('Empty Password', async () => {
    await setup();

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'javertan@TSH.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));


    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('Empty Email and Empty Password', async () => {
    await setup();

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));



    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('Invalid Email and Empty Password', async () => {
    await setup();

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'javertan' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('Valid Email and Password', async () => {
    await setup();

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'javertan@TSH.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password1' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));


    await waitFor(() => {
      expect(mockedUseAuth().login).toHaveBeenCalledWith('javertan@TSH.com', 'password1');
    });
  });
});
