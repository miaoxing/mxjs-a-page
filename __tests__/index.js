import {Page, PageContext} from '..';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import {bootstrap} from '@mxjs/test';

bootstrap();

describe('Page', () => {
  test('basic', () => {
    const result = render(<MemoryRouter>
      <Page/>
    </MemoryRouter>);
    expect(result.container).toMatchSnapshot();
  });

  test('breadcrumb match menu', () => {
    const result = render(<MemoryRouter
      initialEntries={['/admin/test/child']}
    >
      <PageContext.Provider value={{
        menus: [
          {
            url: 'admin/test',
            label: 'Test Page',
            children: [
              {
                url: 'admin/test/child',
                label: 'Child Page',
              },
            ],
          },
        ],
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

