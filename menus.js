import $ from 'miaoxing';

/**
 * @experimental
 */
export const matchMenus = (pathname, menus, parents = []) => {
  for (const menu of menus) {
    if (matchPath(pathname, menu.url)) {
      return [...parents, menu];
    }
    if (menu.children) {
      const result = matchMenus(pathname, menu.children, [...parents, menu]);
      if (result.length) {
        return result;
      }
    }
  }
  return [];
};

const matchPath = (pathname, url) => {
  if (!url) {
    return false;
  }

  const fullUrl = $.url(url);

  if (fullUrl.includes('[id]')) {
    const regex = new RegExp(fullUrl.replace('[id]', '(.+?)'));
    return regex.test(pathname);
  }

  return fullUrl === pathname;
};
