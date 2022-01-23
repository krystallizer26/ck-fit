const quotes = document.getElementById('quotes');
const error = document.getElementById('error');

var firebaseConfig = {
    apiKey: "AIzaSyBtJxZv-qZ6um5yU-Q_Ae0j6OZm42o9eXU",
    authDomain: "react-firechat-fc9d6.firebaseapp.com",
    projectId: "react-firechat-fc9d6",
    storageBucket: "react-firechat-fc9d6.appspot.com",
    messagingSenderId: "213071801235",
    appId: "1:213071801235:web:4fb43fa2c9a18015415666"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const displayQuotes = (allQuotes) => {
  let html = '';
  for (const quote of allQuotes) {
    html += `<blockquote class="wp-block-quote">
                <p>${quote.quote}. </p><cite>${quote.character}</cite>
            </blockquote>`;
  }

  return html;
};