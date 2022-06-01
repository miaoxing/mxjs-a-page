import {Page, PageContext} from '..';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';

describe('Page', () => {
  test('basic', () => {
    const result = render(<MemoryRouter>
      <Page/>
    </MemoryRouter>);
    expect(result.container).toMatchSnapshot();
  });

  test('breadcrumb ignore empty path name', () => {
    const result = render(<MemoryRouter
      initialEntries={['/admin/test/child']}
    >
      <PageContext.Provider value={{
        pages: {
          '/admin': {
            name: 'Home',
            '/test': {
              '/child': {
                name: 'Child Page',
              },
            },
          },
        },
      }}>
        <Page/>
      </PageContext.Provider>
    </MemoryRouter>);

    expect(result.container).toMatchSnapshot();
  });

  test('page with css props', () => {
    const {container} = render(<MemoryRouter>
      <Page mb={2}/>
    </MemoryRouter>);

    expect(container).toMatchSnapshot();
  });
});

