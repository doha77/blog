import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDx-6XbKw7pMrChICi0k2i-dLbl9Ga66pc",
  authDomain: "bolg1-2266d.firebaseapp.com",
  projectId: "bolg1-2266d",
  storageBucket: "bolg1-2266d.appspot.com",
  messagingSenderId: "824591482043",
  appId: "1:824591482043:web:45816ddbdfa7e40f3b7d9e",
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
