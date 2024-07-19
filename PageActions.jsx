import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const PageActions = ({className, children, ...props}) => {
  return (
    <div
      // @experimental empty:hidden
      className={twMerge(clsx('mb-4 flex gap-2 empty:hidden', className))}
      {...props}
    >
      {children}
    </div>
  );
};

PageActions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PageActions;
