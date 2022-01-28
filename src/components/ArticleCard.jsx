import React from "react";
import { Card, Popconfirm, Tooltip } from "antd";
import Fire from "../Fire";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  confirmDelete = () => {
    const { article } = this.props;
    const firebase = new Fire((error) => {
      if (error) {
        this.setState({ error: error });
      } else {
        firebase.deleteArticle(article);
      }
    });
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
        actions={[
          <Tooltip title="Lire">
            <EyeOutlined
              onClick={() => onView(article)}
              style={{ color: "#0E1428" }}
            />
          </Tooltip>,
          <Tooltip title="Modifier">
            <EditOutlined
              style={{ color: "#CB429F" }}
              onClick={() => onEdit(article)}
            />
          </Tooltip>,
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet article ?"
            onConfirm={this.confirmDelete}
            okText="Oui"
            cancelText="Non"
          >
            <a href="javascript">
              <Tooltip title="Supprimer">
                <DeleteOutlined style={{ color: "red" }} />
              </Tooltip>
            </a>
          </Popconfirm>,
        ]}
      >
        <p>
          {article.content.substring(0, 80)}
          {article.content.length > 80 ? "..." : ""}
        </p>
      </Card>
    );
  }
}
