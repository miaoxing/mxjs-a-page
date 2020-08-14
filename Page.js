import React from 'react';
import {Breadcrumb} from '@mxjs/bootstrap';
import app from '@mxjs/app';
import {LinkContainer} from 'react-router-bootstrap';
import {Box} from 'rebass';
import http from '@mxjs/http';
import {invisible} from '@mxjs/css';
import '@mxjs/bootstrap-antd/Breadcrumb/style';

class Page extends React.Component {
  static defaultProps = {
    breadcrumb: null,
    raw: false,
  };

  state = {
    breadcrumb: [],
  };

  componentDidMount() {
    if (this.props.breadcrumb !== false) {
      http.get('admin-page/breadcrumb', {
        params: {
          ctrl: app.namespace + '/' + app.controller,
          act: app.action,
        },
      })
        .then(ret => {
          if (ret.code !== 1) {
            // 忽略错误未找到的情况
            return;
          }
          this.setState({breadcrumb: ret.data});
        });
    }
  }

  renderBreadcrumb() {
    if (this.props.breadcrumb) {
      return this.props.breadcrumb;
    }

    if (this.props.breadcrumb === false) {
      return '';
    }

    return <Box mt={-4} mx={-4} mb={4} bg="white"
      sx={{
        '.breadcrumb': {
          py: 3,
          pl: 4,
        },
      }}
    >
      <Breadcrumb>
        {this.state.breadcrumb.map((breadcrumb, index) => (
          <LinkContainer key={breadcrumb.name} to={breadcrumb.url}>
            <Breadcrumb.Item active={this.state.breadcrumb.length === index + 1}>
              {breadcrumb.name}
            </Breadcrumb.Item>
          </LinkContainer>
        ))}
        {this.state.breadcrumb.length === 0 && <Breadcrumb.Item css={invisible()}>...</Breadcrumb.Item>}
      </Breadcrumb>
    </Box>;
  }

  render() {
    return (
      <>'       '{this.renderBreadcrumb()}'       '<Box
          p={this.props.raw ? null : '4'}
          bg={this.props.raw ? null : 'white'}
        >
          {this.props.children}
        </Box>'     '</>
    );
  }
}

export default Page;
