import React from 'react';
import {Breadcrumb} from '@mxjs/bootstrap';
import app, {Router} from '@mxjs/app';
import {LinkContainer} from 'react-router-bootstrap';
import {Box} from 'rebass';
import {invisible} from '@mxjs/css';
import '@mxjs/bootstrap-antd/Breadcrumb/style';

class Page extends React.Component {
  static defaultProps = {
    breadcrumb: null,
    raw: false,
  };

  state = {
    breadcrumb: [],
  };

  constructor(props) {
    super(props);

    this.router = new Router();
    this.router.setPages(miaoxing.pages);
  }

  getBreadcrumb() {
    const page = this.router.match(window.location.pathname);
    if (!page) {
      return [];
    }

    const breadcrumb = [];
    let url = '';
    let next = miaoxing.pages;
    page.paths.forEach(path => {
      url += path;
      next = next[path];

      // 忽略变量
      if (path.includes('[')) {
        return;
      }

      breadcrumb.push({
        name: next.name,
        url: url.includes('[') ? null : app.url(url.substr(1)), // 移除 '/' 前缀
      });
    });
    return breadcrumb;
  }

  renderBreadcrumb() {
    if (this.props.breadcrumb) {
      return this.props.breadcrumb;
    }

    if (this.props.breadcrumb === false) {
      return '';
    }

    const items = this.getBreadcrumb();

    return <Box mt={-4} mx={-4} mb={4} bg="white"
      sx={{
        '.breadcrumb': {
          py: 3,
          pl: 4,
        },
      }}
    >
      <Breadcrumb>
        {items.map((item, index) => {
          const Child = item.url ? LinkContainer : React.Fragment;
          const props = item.url ? {to: item.url} : {};
          return <Child key={item.name} {...props}>
            <Breadcrumb.Item active={items.length === index + 1}>
              {item.name}
            </Breadcrumb.Item>
          </Child>
        })}
        {this.state.breadcrumb.length === 0 && <Breadcrumb.Item css={invisible()}>...</Breadcrumb.Item>}
      </Breadcrumb>
    </Box>;
  }

  render() {
    return (
      <>
        {this.renderBreadcrumb()}
        <Box
          p={this.props.raw ? null : '4'}
          bg={this.props.raw ? null : 'white'}
        >
          {this.props.children}
        </Box>
      </>
    );
  }
}

export default Page;
