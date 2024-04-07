// UserEditingForm.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import UserEditingForm from './UserEditingForm';
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
          preferences: 'Test preferences',
        },
      },
    },
    result: {
      data: {
        updateUser: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          preferences: 'Test preferences',
        },
      },
    },
 },
];

test('renders UserEditingForm and submits form', async () => {
 const { getByLabelText, getByText, getByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserEditingForm onSubmit={() => {}} error={null} loading={false} formMethods={{ register: () => {}, handleSubmit: () => {}, formState: { errors: {} } }} />
    </MockedProvider>
 );

 
 const nameInput = getByLabelText('Name');
 fireEvent.change(nameInput, { target: { value: 'John Doe' } });

 
 const emailInput = getByLabelText('Email');
 fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

 
 const preferencesInput = getByLabelText('Preferences');
 fireEvent.change(preferencesInput, { target: { value: 'Test preferences' } });

 const submitButton = getByRole('button', { name: /submit/i });
 fireEvent.click(submitButton);

 await waitFor(() => {
    expect(getByText('Your profile has been updated!')).toBeInTheDocument();
 });
});
