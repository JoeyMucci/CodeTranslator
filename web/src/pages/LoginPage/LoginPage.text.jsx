import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'; // Adjust the import path as necessary

describe('LoginPage', () => {
 test('renders the login page', () => {
    render(<LoginPage />);

    // Check if the email input field is present
    expect(screen.getByPlaceholderText('Example.email@njit.edu')).toBeInTheDocument();

    // Check if the password input field is present
    expect(screen.getByPlaceholderText('SuperSecretPassword11!')).toBeInTheDocument();

    // Check if the continue button is present
    expect(screen.getByText('Continue')).toBeInTheDocument();

    // Check if the login button is present
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Check if the sign up button is present
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
 });
});
