import $ from 'miaoxing';
import { useState, useEffect, Suspense } from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usePage } from './PageContext';
import { matchMenus } from './menus';
import { PageLoading } from '@mxjs/a-loading';

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

function itemRender(item, params, items) {
  const last = items.indexOf(item) === items.length - 1;
  return (item.href && !last) ? <Link to={item.href}>{item.title}</Link> : item.title;
}

const Breadcrumb = () => {
  const [items, setItems] = useState([]);
  const page = usePage();
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
        title: menu.label,
        href: getUrl(menu),
      };
    }));
  }, [page.menus.length]);

  // 异步加载时先占好位置
  return (
    <AntdBreadcrumb items={items} itemRender={itemRender} className="min-h-[22px] mb-6"/>
  );
};

const Page = ({ breadcrumb, children, ...props }) => {
  return (
    <Suspense fallback={<PageLoading/>}>
      <div {...props}>
        {renderBreadcrumb(breadcrumb)}
        {children}
      </div>
    </Suspense>
  );
};

Page.propTypes = {
  breadcrumb: PropTypes.node,
  children: PropTypes.node,
};

export default Page;
