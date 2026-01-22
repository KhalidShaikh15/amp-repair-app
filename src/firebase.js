import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6l7mswTnvNi2ovEzujB23UUp3vWYUMDA",
  authDomain: "amp-repair-app.firebaseapp.com",
  projectId: "amp-repair-app",
  storageBucket: "amp-repair-app.firebasestorage.app",
  messagingSenderId: "925618915545",
  appId: "1:925618915545:web:57b33b16d3cb8533af16c8"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
