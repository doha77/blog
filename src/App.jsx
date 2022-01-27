import logo from "./logo.svg";
import "./App.css";
import React from "react";
import AddButton from "./components/AddButton";
import ArticleForm from "./components/ArticleForm";
import ArticleModal from "./components/ArticleModal";
import Fire from "./Fire";
import ArticleCard from "./components/ArticleCard";
import CommentModal from "./components/CommentModal.jsx";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      titre: "Rediger un article",
      isArticleModalVisible: false,
      isCommentModalVisible: false,
      articles: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    console.log("avant le render");
    const firebase = new Fire((error) => {
      if (error) {
        console.log(error);
        this.setState({
          error: error,
        });
      } else {
        firebase.getArticles((articles) => {
          console.log(articles);
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

  render() {
    console.log("apres le render");
    const { isArticleModalVisible } = this.state;
    console.log("====================================");
    console.log(isArticleModalVisible);
    console.log("====================================");
    return (
      <div className="App">
        <header className="App-header">
          <img src={"blog-logo.png"} className="App-logo" alt="logo" />
          <p> {this.state.titre} </p>

          <AddButton
            content="Rédiger un article"
            onClick={() => this.setState({ isArticleModalVisible: true })}
          />
          <ArticleModal
            isVisible={isArticleModalVisible}
            title="Mon article"
            okText="Soumettre"
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
