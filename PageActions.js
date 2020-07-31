import React from "react";
import {Actions} from "@mxjs/actions";

export default class extends React.Component {
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
