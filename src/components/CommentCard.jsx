import React from "react";
import { Card } from "antd";

export default class CommentCard extends React.Component {
  render() {
    return (
      <Card title={this.props.comment.author} className="m-2">
        <p>{this.props.comment.content}</p>
      </Card>
    );
  }
}
