import { Modal } from "antd";
import React from "react";
import Fire from "../Fire";
import CommentForm from "./CommentForm";
import AddButton from "./AddButton";

export default class CommentModal extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }

  handleComment = () => {
    const { article, comment, onClose } = this.props;
    const firebase = new Fire((error) => {
      if (error) {
        this.setState({ error: error });
      } else {
        article.comments = [...article.comments, comment];
        firebase.updateArticle(article);
      }
    });
    onClose();
  };

  render() {
    const { comment, isVisible, onClose } = this.props;
    return (
      <Modal
        visible={isVisible}
        onCancel={onClose}
        title="Commenter l'article"
        footer={
          <AddButton
            type="primary"
            tooltip="Commenter l'article"
            onClick={this.handleComment}
          >
            Valider
          </AddButton>
        }
      >
        <CommentForm comment={comment} />
      </Modal>
    );
  }
}
