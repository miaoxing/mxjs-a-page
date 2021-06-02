import React from 'react';
import {Page, PageContext} from '..';
import {render} from '@testing-library/react';
import {setUrl, resetUrl} from '@mxjs/test';

describe('Page', () => {
  test('basic', () => {
    const result = render(<Page/>);
    expect(result.container).toMatchSnapshot();
  });

  test('breadcrumb ignore empty path name', () => {
    setUrl('/admin/test/child');

    const result = render(<PageContext.Provider value={{
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
    </PageContext.Provider>);

    expect(result.container).toMatchSnapshot();

    resetUrl();
  });
});

