import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyABTRDqxiaQOQESav65RixkF8GQ1J_wGV4",
  authDomain: "fir-9a20a.firebaseapp.com",
  projectId: "fir-9a20a",
  storageBucket: "fir-9a20a.appspot.com",
  messagingSenderId: "29483728856",
  appId: "1:29483728856:web:60e8f26c2fc8a573133cad",
};

export default class Fire {
  constructor(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  get ref() {
    return firebase.firestore().collection("articles");
  }

  getArticles(callback) {
    let ref = this.ref.orderBy("created_at");
    this.unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let articles = [];
        snapshot.forEach((doc) => {
          articles.push({ id: doc.id, ...doc.data() });
        });
        console.log(articles);
        callback(articles.reverse());
      },
      function (error) {
        callback(error);
      }
    );
  }

  addArticle(article) {
    this.ref.add(article);
  }

  deleteArticle(article) {
    this.ref.doc(article.id).delete();
  }

  updateArticle(article) {
    this.ref.doc(article.id).update(article);
  }
}
