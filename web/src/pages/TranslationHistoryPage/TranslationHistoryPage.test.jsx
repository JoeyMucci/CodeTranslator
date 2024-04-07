import { render,screen } from '@redwoodjs/testing/web'
import RecordsCell from 'web/src/components/RecordsCell/RecordsCell.jsx';
import TranslationHistoryPage from './TranslationHistoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TranslationHistoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TranslationHistoryPage />)
    }).not.toThrow()
  })

  test('renders RecordsCell component', async () => {

    const emil = 'dsternberg342@njit.edu';
    const DateAscending = true;
    const inputLanguage = 'Default';
    const outputLanguage = 'Default';

    mockGraphQLQuery('RecordsQuery', (variables, { context }) => {
      // Return mock records data
      return {
        records: [
          {
            id: 1,
            originalCode: 'originalCode1',
            translatedCode: 'translatedCode1',
            originalLanguage: 'C',
            translatedLanguage: 'Python',
            createdAt: '2024-04-01T23:24:15.276Z',
          },
          {
            id: 2,
            originalCode: 'originalCode2',
            translatedCode: 'translatedCode2',
            originalLanguage: 'Java',
            translatedLanguage: 'PHP',
            createdAt: '2024-04-06T01:12:22.112Z',
          },
          // Add more mock records as needed
        ],
      };
    });

    render(
      <RecordsCell
        goal={emil}
        DateAscending={DateAscending}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
      />
    );

    // Assert that an element with a specific data-testid is present
    await screen.findByText('Java')
    await screen.findByText('PHP')

    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();
  });


  test('tests filtering by inputLanguage', async () => {

    const emil = 'dsternberg342@njit.edu';
    const DateAscending = true;
    const inputLanguage = 'C';
    const outputLanguage = 'Default';

    mockGraphQLQuery('RecordsQuery', (variables, { context }) => {
      return {
        records: [
          {
            id: 1,
            originalCode: 'originalCode1',
            translatedCode: 'translatedCode1',
            originalLanguage: 'C',
            translatedLanguage: 'Python',
            createdAt: '2024-04-01T23:24:15.276Z',
          },
          {
            id: 2,
            originalCode: 'originalCode2',
            translatedCode: 'translatedCode2',
            originalLanguage: 'Java',
            translatedLanguage: 'PHP',
            createdAt: '2024-04-06T01:12:22.112Z',
          },
          {
            id: 2,
            originalCode: 'originalCode3',
            translatedCode: 'translatedCode3',
            originalLanguage: 'C++',
            translatedLanguage: 'C',
            createdAt: '2024-04-07T01:12:22.112Z',
          },
        ],
      };
    });

    render(
      <RecordsCell
        goal={emil}
        DateAscending={DateAscending}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
      />
    );

    // Assert that an element with a specific data-testid is present
    await screen.findByText('C')
    await screen.findByText('Python')

    expect(screen.queryByText('Java')).not.toBeInTheDocument();
    expect(screen.queryByText('C++')).not.toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();

  });


  test('tests filtering by OutputLanguage', async () => {

    const emil = 'dsternberg342@njit.edu';
    const DateAscending = true;
    const inputLanguage = 'Default';
    const outputLanguage = 'C';

    mockGraphQLQuery('RecordsQuery', (variables, { context }) => {
      return {
        records: [
          {
            id: 1,
            originalCode: 'originalCode1',
            translatedCode: 'translatedCode1',
            originalLanguage: 'C',
            translatedLanguage: 'Python',
            createdAt: '2024-04-01T23:24:15.276Z',
          },
          {
            id: 2,
            originalCode: 'originalCode2',
            translatedCode: 'translatedCode2',
            originalLanguage: 'Java',
            translatedLanguage: 'PHP',
            createdAt: '2024-04-06T01:12:22.112Z',
          },
          {
            id: 3,
            originalCode: 'originalCode3',
            translatedCode: 'translatedCode3',
            originalLanguage: 'C++',
            translatedLanguage: 'C',
            createdAt: '2024-04-07T01:12:22.112Z',
          },
          {
            id: 4,
            originalCode: 'originalCode4',
            translatedCode: 'translatedCode4',
            originalLanguage: 'Java',
            translatedLanguage: 'C',
            createdAt: '2024-04-07T01:12:22.112Z',
          },
        ],
      };
    });

    render(
      <RecordsCell
        goal={emil}
        DateAscending={DateAscending}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
      />
    );

    // Assert that an element with a specific data-testid is present
    await screen.findByText('C++')
    const elementsWithC = screen.getAllByText('C');
    //SHOWS THAT THERE IS EXACTLY TWO RECORDS WITH C IN IT
    expect(elementsWithC.length).toBeGreaterThan(1);
    expect(elementsWithC.length).toBeLessThan(3);
    //SHOWS THAT THE RECORDS DISPLAYED DO NOT HAVE PHP OR PYTHON
    expect(screen.queryByText('PHP')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
    //SHOWS THAT THE RECORDS DISPLAYED INPUT LANGUAGES ARE CORRECT
    expect(screen.getByText('C++')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  test('tests filtering by both Input and Output Language', async () => {

    const emil = 'dsternberg342@njit.edu';
    const DateAscending = true;
    const inputLanguage = 'Java';
    const outputLanguage = 'C';

    mockGraphQLQuery('RecordsQuery', (variables, { context }) => {
      return {
        records: [
          {
            id: 1,
            originalCode: 'originalCode1',
            translatedCode: 'translatedCode1',
            originalLanguage: 'C',
            translatedLanguage: 'Python',
            createdAt: '2024-04-01T23:24:15.276Z',
          },
          {
            id: 2,
            originalCode: 'originalCode2',
            translatedCode: 'translatedCode2',
            originalLanguage: 'Java',
            translatedLanguage: 'PHP',
            createdAt: '2024-04-06T01:12:22.112Z',
          },
          {
            id: 3,
            originalCode: 'originalCode3',
            translatedCode: 'translatedCode3',
            originalLanguage: 'C++',
            translatedLanguage: 'C',
            createdAt: '2024-04-07T01:12:22.112Z',
          },
          {
            id: 4,
            originalCode: 'originalCode4',
            translatedCode: 'translatedCode4',
            originalLanguage: 'Java',
            translatedLanguage: 'C',
            createdAt: '2024-04-07T01:12:22.112Z',
          },
        ],
      };
    });

    render(
      <RecordsCell
        goal={emil}
        DateAscending={DateAscending}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
      />
    );

    // Assert that an element with a specific data-testid is present
    await screen.findByText('Java')
    const elementsWithC = screen.getAllByText('C');
    //SHOWS THAT THERE IS EXACTLY 1 RECORD WITH C IN IT
    expect(elementsWithC.length).toBeLessThan(2);
    //SHOWS THAT THE RECORDS DISPLAYED DO NOT HAVE C++, PYTHON, or PHP
    expect(screen.queryByText('C++')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
    expect(screen.queryByText('PHP')).not.toBeInTheDocument();
    //SHOWS THAT THE RECORDS DISPLAYED INPUT LANGUAGES ARE CORRECT
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });




})




