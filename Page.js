import $ from 'miaoxing';
import {createContext, Component} from 'react';
import {router} from '@mxjs/app';
import {Box} from '@mxjs/box';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import {spacing, createStyle} from '@mxjs/css';

/**
 * @experimental 考虑将后台的 Layout 合并进来
 */
export const PageContext = createContext({
  pages: {},
});

const hasVar = (path) => {
  return path.includes('[');
};

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
      if (hasVar(path)) {
        return;
      }

      // 忽略中间的空白路径
      if (!next.name) {
        return;
      }

      breadcrumb.push({
        name: next.name,
        url: hasVar(url) ? null : $.url(url.substr(1)), // 移除 '/' 前缀
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
      <Box mt={-spacing(4)} mx={-spacing(4)} mb4 bgWhite
        sx={{
          '.ant-breadcrumb': createStyle('py3', 'pl4', {minH: 46}), // 异步加载时先占好位置
        }}
      >
        <Breadcrumb>
          {items.map((item) => {
            return <Breadcrumb.Item key={item.name}>
              {item.url ? <Link to={item.url}>{item.name}</Link> : item.name}
            </Breadcrumb.Item>;
          })}
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
          p4={!raw}
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
