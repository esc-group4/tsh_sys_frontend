// check if high value elements renders

import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider, useAuth } from '../../contexts/UserContext';

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

  test('renders login page with all elements', async () =>  {
    await setup();

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/training management system/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
