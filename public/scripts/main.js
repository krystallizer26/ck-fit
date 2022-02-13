const quotes = document.getElementById('quotes');
const error = document.getElementById('error');

var firebaseConfig = {
    apiKey: "AIzaSyCxj_kMmRtOj0eBzzrMMjw9wBs3hx7N13g",
    authDomain: "react-firechat-fc9d6.firebaseapp.com",
    projectId: "ckfit-wittech",
    storageBucket: "ckfit-wittech.appspot.com",
    messagingSenderId: "985195112419",
    appId: "1:985195112419:android:7cf5dbd1cf3d2c3e8362d6"
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