import React from "react";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Fire from "../Fire";

export default class ArticleForm extends React.Component {
  contructor(props) {
    this.state = {
      article: props.article,
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="titre">Titre</label>
        <Input
          placeholder="Mon super article"
          name="titre"
          value={this.props.article.title}
          id="titre"
          onChange={this.props.handleChange}
        ></Input>
        <label htmlFor="contenu">Contenu</label>
        <TextArea
          rows={4}
          placeholder="Contenu de mon article"
          name="contenu"
          value={this.props.article.content}
          id="contenu"
          onChange={this.props.handleChange}
        ></TextArea>
        <label htmlFor="imageUrl">URL de votre image</label>
        <Input
          placeholder="https://www.exemple.com/image..."
          name="imageUrl"
          value={this.props.article.imageUrl}
          id="imageUrl"
          onChange={this.props.handleChange}
        ></Input>
      </form>
    );
  }
}
