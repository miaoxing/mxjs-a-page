import $ from 'miaoxing';
import { createContext, Fragment, Component } from 'react';
import {Breadcrumb} from '@mxjs/bootstrap';
import {router} from '@mxjs/app';
import {LinkContainer} from 'react-router-bootstrap';
import {Box} from '@mxjs/box';
import {invisible} from '@mxjs/css';
import PropTypes from 'prop-types';
import '@mxjs/bootstrap-antd/Breadcrumb/style';

/**
 * @experimental 考虑将后台的 Layout 合并进来
 */
export const PageContext = createContext({
  pages: {},
});

class Page extends Component {
  static contextType = PageContext;

  static defaultProps = {
    breadcrumb: null,
    raw: false,
  };

  static propTypes = {
    breadcrumb: PropTypes.node,
    raw: PropTypes.bool,
    children: PropTypes.node,
  };

  state = {
    breadcrumb: [],
  };

  constructor(props) {
    super(props);

    this.router = new router.constructor();
  }

  getBreadcrumb() {
    this.router.setPages(this.context.pages);
    const page = this.router.match(window.location.pathname);
    if (!page) {
      return [];
    }

    const breadcrumb = [];
    let url = '';
    let next = this.context.pages;
    page.paths.forEach(path => {
      url += path;
      next = next[path];

      // 忽略变量
      if (path.includes('[')) {
        return;
      }

      // 忽略中间的空白路径
      if (!next.name) {
        return;
      }

      breadcrumb.push({
        name: next.name,
        url: url.includes('[') ? null : $.url(url.substr(1)), // 移除 '/' 前缀
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

    return (
      <Box mt={-4} mx={-4} mb={4} bg="white"
        sx={{
          '.breadcrumb': {
            py: 3,
            pl: 4,
          },
        }}
      >
        <Breadcrumb>
          {items.map((item, index) => {
            const Child = item.url ? LinkContainer : Fragment;
            const props = item.url ? {to: item.url} : {};
            return <Child key={item.name} {...props}>
              <Breadcrumb.Item active={items.length === index + 1}>
                {item.name}
              </Breadcrumb.Item>
            </Child>;
          })}
          {this.state.breadcrumb.length === 0 && <Breadcrumb.Item css={invisible()}>...</Breadcrumb.Item>}
        </Breadcrumb>
      </Box>
    );
  }

  render() {
    const {raw, breadcrumb, ...props} = this.props;

    return (
      <>
        {this.renderBreadcrumb()}
        <Box
          p={raw ? null : '4'}
          bg={raw ? null : 'white'}
          {...props}
        >
          {this.props.children}
        </Box>
      </>
    );
  }
}

export default Page;
