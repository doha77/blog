import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment,
    };
  }

  handleChange(event, field) {
    const { comment } = this.props;
    let newComment = comment;
    switch (field) {
      case "content":
        newComment.content = event.target.value;
        break;
      case "author":
        newComment.author = event.target.value;
        break;
      default:
        break;
    }
    this.setState({ comment: newComment });
  }

  render() {
    const { comment } = this.props;
    return (
      <form>
        <label htmlFor="content">Contenu</label>
        <TextArea
          name="content"
          placeholder="Contenu du commentaire"
          value={comment.content}
          onChange={(event) => this.handleChange(event, "content")}
          required
        />
        <label htmlFor="author">Auteur</label>
        <Input
          name="author"
          placeholder="Auteur du commentaire"
          value={comment.author}
          onChange={(event) => this.handleChange(event, "author")}
        />
      </form>
    );
  }
}
