import { Actions } from '@mxjs/actions';
import PropTypes from 'prop-types';
import { Box } from '@mxjs/a-box';

const PageAction = ({children, ...props}) => {
  return (
    <Box className="page-actions" {...props}>
      <Actions>
        {children}
      </Actions>
    </Box>
  );
};

PageAction.propTypes = {
  children: PropTypes.node,
};

export default PageAction;
