import React from "react";
import { Card } from "antd";
import Fire from "../Fire";

export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  confirm = () => {
    const { article } = this.props;
    const firebase = new Fire((error) => {
      if (error) {
        this.setState({ error: error });
      } else {
        firebase.deleteArticle(article);
      }
    });
  };

  cancel = (e) => {
    console.log(e);
  };

  render() {
    const { article, onEdit, onView, onDelete } = this.props;
    const created_at = new Date(article.created_at.seconds).toLocaleDateString(
      "fr"
    );

    return (
      <Card
        title={article.title}
        bordered={false}
        style={{ width: 300, margin: 15 }}
        cover={<img alt={article.title} src={article.imageUrl} />}
        actions={[]}
      >
        <p>
          {article.content.substring(0, 80)}
          {article.content.length > 80 ? "..." : ""}
        </p>
      </Card>
    );
  }
}
