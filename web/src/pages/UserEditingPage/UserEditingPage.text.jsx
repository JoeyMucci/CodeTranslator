// UserEditingPage.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import UserEditingPage from './UserEditingPage';
import { UPDATE_USER } from './UserEditingPage'; // Ensure this import path is correct

const mocks = [
 {
    request: {
      query: UPDATE_USER,
      variables: {
        id: 1,
        input: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
    },
    result: {
      data: {
        updateUser: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      },
    },
 },
];

test('renders UserEditingPage and submits form', async () => {
 const { getByLabelText, getByText, getByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserEditingPage />
    </MockedProvider>
 );

 
 const nameInput = getByLabelText('Name');
 fireEvent.change(nameInput, { target: { value: 'John Doe' } });

 
 const emailInput = getByLabelText('Email');
 fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

 const submitButton = getByRole('button', { name: /submit/i });
 fireEvent.click(submitButton);

 await waitFor(() => {
    expect(getByText('Your profile has been updated!')).toBeInTheDocument();
 });
});
