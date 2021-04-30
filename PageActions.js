import React from 'react';
import {Actions} from '@mxjs/actions';
import PropTypes from 'prop-types';

export default class extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="page-actions">
        <Actions>
          {this.props.children}
        </Actions>
      </div>
    );
  }
}
