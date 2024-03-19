import React from 'react';
import { render, waitFor } from '@testing-library/react';
import TranslationRequest from './TranslationRequest'; // Adjust the import path as necessary

// Mock the translate function if you're using a translation library
jest.mock('react-i18next', () => ({
 useTranslation: () => ({ t: key => key }),
}));

describe('TranslationRequest', () => {
 it('renders the loading state initially', () => {
    const { getByText } = render(<TranslationRequest text="Hello, world!" />);
    expect(getByText('Translating...')).toBeInTheDocument();
 });

 it('renders the translated text after loading', async () => {
    const { getByText } = render(<TranslationRequest text="Hello, world!" />);
    await waitFor(() => expect(getByText('Translated: Hello, world!')).toBeInTheDocument());
 });
});
