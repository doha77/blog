import React from "react";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

export default class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="titre">Titre</label>
        <Input
          placeholder="titre"
          name="titre"
          value={this.props.titre}
          id="titre"
          onChange={this.props.handleChange}
        ></Input>
        <label htmlFor="contenu">Contenu</label>
        <TextArea
          rows={4}
          placeholder="contenu"
          name="contenu"
          value={this.props.contenu}
          id="contenu"
          onChange={this.props.handleChange}
        ></TextArea>
        <label htmlFor="imageUrl">Image</label>
      </form>
    );
  }
}
