import { Button, Modal } from "antd";
import React from "react";
import ArticleForm from "./ArticleForm";
import Fire from "../Fire";
import CommentCard from "./CommentCard";

export default class ArticleView extends React.Component {
  constructor() {
    super();
    this.state = {
      titre: "",
      contenu: "",
      imageUrl: "",
    };
  }
  handleArticle = () => {
    const { article, onCancel } = this.props;
    const firebase = new Fire((error) => {
      if (error) {
        this.setState({ error: error });
      } else {
        if (article.created_at) {
          article.created_at = new Date();
          firebase.updateArticle(article);
        } else {
          article.created_at = new Date();
          article.comments = [];
          firebase.addArticle(article);
        }
      }
    });
    onCancel();
  };

  handleChange = (e) => {
    switch (e.target.name) {
      case "titre":
        this.setState({ titre: e.target.value });
        break;
      case "contenu":
        this.setState({ contenu: e.target.value });
        break;
      case "imageUrl":
        this.setState({ titre: e.target.value });
        break;
      default:
        break;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Titre : " + this.state.titre + "\r\nContenu : " + this.state.contenu
    );
    this.props.switchModal();
  };

  render() {
    const { isVisible, title, article } = this.props;
    console.log(this.state.titre + "\n" + this.state.contenu);
    return (
      <Modal
        visible={isVisible}
        title={title}
        onCancel={this.props.switchModal}
        footer={
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={this.handleSubmit}
            htmlType="submit"
          >
            Valider
          </Button>
        }
      >
        <ArticleForm
          handleChange={this.handleChange}
          title={this.state.title}
          contenu={this.state.contenu}
          imageUrl={this.state.imageUrl}
        />
      </Modal>
    );
  }
}
