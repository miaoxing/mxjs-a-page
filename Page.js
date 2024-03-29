import $ from 'miaoxing';
import { useState, useEffect } from 'react';
import { Box } from '@mxjs/a-box';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usePageContext } from './PageContext';
import { matchMenus } from './menus';

const hasVar = (path) => {
  return path.includes('[');
};

const getUrl = (menu) => {
  // 允许不显示地址
  if (typeof menu.url !== 'undefined' && !menu.url) {
    return null;
  }

  return hasVar(menu.url) ? null : $.url(menu.url);
};

const renderBreadcrumb = (breadcrumb) => {
  if (breadcrumb) {
    return breadcrumb;
  }

  if (breadcrumb === false) {
    return '';
  }

  return <Breadcrumb/>;
};

const Breadcrumb = () => {
  const [items, setItems] = useState([]);
  const page = usePageContext();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/\/+$/, '');
    const menus = matchMenus(pathname, page.menus);
    if (page.menus.length) {
      menus.unshift({
        label: '首页',
        url: 'admin',
      });
    }
    setItems(menus.map(menu => {
      return {
        label: menu.label,
        url: getUrl(menu),
      };
    }));
  }, [page.menus.length]);

  return (
    <Box as={AntdBreadcrumb} minH="22px"> {/* 异步加载时先占好位置 */}
      {items.map((item) => {
        return <AntdBreadcrumb.Item key={item.label}>
          {item.url ? <Link to={item.url}>{item.label}</Link> : item.label}
        </AntdBreadcrumb.Item>;
      })}
    </Box>
  );
};

const Page = ({raw, breadcrumb, ...props}) => {
  return (
    <Box display="flex" gap={4} flexDirection="column">
      {renderBreadcrumb(breadcrumb)}
      {
        raw ? props.children :
          <Box p={4} bg="white" rounded="lg" {...props}>
            {props.children}
          </Box>
      }
    </Box>
  );
};

Page.propTypes = {
  breadcrumb: PropTypes.node,
  raw: PropTypes.bool,
  children: PropTypes.node,
};

export default Page;
