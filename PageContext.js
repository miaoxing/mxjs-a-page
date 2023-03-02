import {createContext, useContext} from 'react';

/**
 * @experimental 考虑将后台的 Layout 合并进来
 */
const PageContext = createContext({
  menus: [],
});
export default PageContext;

/**
 * @experimental
 */
export const usePageContext = () => useContext(PageContext);
