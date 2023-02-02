import $ from 'miaoxing';
import {createContext, Component, useContext} from 'react';
import {Box} from '@mxjs/box';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import {spacing, createStyle} from '@mxjs/css';
import {withRouter} from 'react-router';
import {matchMenus} from './menus';

/**
 * @experimental 考虑将后台的 Layout 合并进来
 */
export const PageContext = createContext({
  menus: [],
});

/**
 * @experimental
 */
export const usePageContext = () => useContext(PageContext);

const hasVar = (path) => {
  return path.includes('[');
};

@withRouter
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
    location: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
  };

  getBreadcrumb() {
    const pathname = this.props.history.location.pathname.replace(/\/+$/, '');
    const menus = matchMenus(pathname, this.context.menus);
    if (this.context.menus.length) {
      menus.unshift({
        label: '首页',
        url: 'admin',
      });
    }
    return menus.map(menu => {
      return {
        label: menu.label,
        url: this.getUrl(menu),
      };
    });
  }

  getUrl(menu) {
    // 允许不显示地址
    if (typeof menu.url !== 'undefined' && !menu.url) {
      return null;
    }

    return hasVar(menu.url) ? null : $.url(menu.url);
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
            return <Breadcrumb.Item key={item.label}>
              {item.url ? <Link to={item.url}>{item.label}</Link> : item.label}
            </Breadcrumb.Item>;
          })}
        </Breadcrumb>
      </Box>
    );
  }

  render() {
    const {raw, breadcrumb, location, history, match, ...props} = this.props;

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
