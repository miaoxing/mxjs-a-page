import {Page, PageContext} from '..';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import {bootstrap} from '@mxjs/test';
import {ConfigProvider} from 'antd';

bootstrap();

describe('Page', () => {
  test('basic', () => {
    const result = render(
      <ConfigProvider theme={{hashed: false}}>
        <MemoryRouter>
          <Page/>
        </MemoryRouter>
      </ConfigProvider>
    );
    expect(result.container).toMatchSnapshot();
  });

  test('breadcrumb match menu', () => {
    const result = render(
      <ConfigProvider theme={{hashed: false}}>
        <MemoryRouter
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
        </MemoryRouter>
      </ConfigProvider>
    );

    expect(result.container).toMatchSnapshot();
  });

  test('page with css props', () => {
    const {container} = render(
      <ConfigProvider theme={{hashed: false}}>
        <MemoryRouter>
          <Page mb={2}/>
        </MemoryRouter>
      </ConfigProvider>
    );

    expect(container).toMatchSnapshot();
  });
});

