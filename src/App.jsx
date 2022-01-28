import "./App.css";
import React from "react";
import AddButton from "./components/AddButton";
import ArticleModal from "./components/ArticleModal";
import Fire from "./Fire";
import ArticleCard from "./components/ArticleCard";
import { Col, Row } from "antd";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      titre: "Blogify",
      isArticleModalVisible: false,
      isCommentModalVisible: false,
      articles: [],
      article: { title: "", content: "", imageUrl: "" },
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const firebase = new Fire((error) => {
      if (error) {
        console.log(error);
        this.setState({
          error: error,
        });
      } else {
        firebase.getArticles((articles) => {
          this.setState({
            articles: articles,
            loading: false,
          });
        });
      }
    });
  }

  switchModal() {
    this.state.isArticleModalVisible === true
      ? this.setState({ isArticleModalVisible: false })
      : this.setState({ isArticleModalVisible: true });
  }

  viewArticle(article) {
    console.log(article);
  }

  editArticle = (article) => {
    this.setState({
      article: article,
      isArticleModalVisible: true,
    });
  };

  deleteArticle(article) {
    console.log(article);
  }

  render() {
    const { isArticleModalVisible } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={"blog-logo.png"} className="App-logo" alt="logo" />
          <p> {this.state.titre} </p>
          <Row justify="space-between">
            {this.state.articles.map((article) => (
              <Col>
                <ArticleCard
                  article={article}
                  key={article.id}
                  onEdit={this.editArticle}
                  onView={this.viewArticle}
                />
              </Col>
            ))}
          </Row>

          <AddButton
            content="Rédiger un article"
            onClick={() => this.setState({ isArticleModalVisible: true })}
          />

          <ArticleModal
            isVisible={isArticleModalVisible}
            title="Mon article"
            okText="Soumettre"
            article={this.state.article}
            switchModal={() => this.switchModal()}
            onCommentClick={() => {
              this.setState({
                isCommentModalVisible: true,
                comment: { content: "", author: "" },
              });
            }}
          />
        </header>
      </div>
    );
  }
}
