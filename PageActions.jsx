import PropTypes from 'prop-types';
import { Box } from '@mxjs/a-box';

const PageActions = ({children, ...props}) => {
  return (
    <Box
      mb={4} pb={4} borderBottom="1px dotted" borderColor="gray.200" display="flex" gap={2}
      sx={{
        // @experimental
        '&:empty': {
          display: 'none',
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

PageActions.propTypes = {
  children: PropTypes.node,
};

export default PageActions;
