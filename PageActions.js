import PropTypes from 'prop-types';
import { Box } from '@mxjs/a-box';

const PageAction = ({children, ...props}) => {
  return (
    <Box className="page-actions" display="flex" gap={2} {...props}>
      {children}
    </Box>
  );
};

PageAction.propTypes = {
  children: PropTypes.node,
};

export default PageAction;
