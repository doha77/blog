import React from "react";
import { Button, Tooltip } from "antd";
import { FormOutlined } from "@ant-design/icons";

export default class AddButton extends React.Component {
  render() {
    return (
      <Tooltip title="Rédiger un article">
        <Button
          type="default"
          size="large"
          shape="round"
          onClick={this.props.onClick}
        >
          <FormOutlined />
          {this.props.content}
        </Button>
      </Tooltip>
    );
  }
}
