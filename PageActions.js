import React from 'react';
import {Actions} from '@mxjs/actions';
import PropTypes from 'prop-types';
import {Box} from '@mxjs/box';

export default class extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {children, ...props} = this.props;

    return (
      <Box className="page-actions" {...props}>
        <Actions>
          {children}
        </Actions>
      </Box>
    );
  }
}
