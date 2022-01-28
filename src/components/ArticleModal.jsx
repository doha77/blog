import { Button, Modal } from "antd";
import React from "react";
import ArticleForm from "./ArticleForm";
import Fire from "../Fire";

export default class ArticleModal extends React.Component {
  constructor() {
    super();
    this.state = {
      article: {
        title: "",
        content: "",
        imageUrl: "",
      },
    };
  }

  componentDidMount() {
    if (this.props.article) {
      this.setState({ article: this.props.article });
    }
  }

  handleChange = (e) => {
    const article = this.props.article;
    console.log(article);
    switch (e.target.name) {
      case "titre":
        article.title = e.target.value;
        break;
      case "contenu":
        article.content = e.target.value;
        break;
      case "imageUrl":
        article.imageUrl = e.target.value;
        break;
      default:
        break;
    }
    this.setState({ article });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'Votre article "' +
        this.state.article.title +
        '" a été créé avec succès !'
    );
    const firebase = new Fire((error) => {
      if (error) {
        console.log(error);
      } else {
        const article = this.state.article;
        console.log(article);
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
    this.props.switchModal();
  };

  render() {
    const { isVisible, title } = this.props;
    console.log(this.props.article);
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
          article={this.props.article}
        />
      </Modal>
    );
  }
}
