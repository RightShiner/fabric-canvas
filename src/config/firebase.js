import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2Kn2GVwZ3U_IMik9XOM-TlC7hAEqZROY",
  authDomain: "socialflow-8e80f.firebaseapp.com",
  databaseURL: "https://socialflow-8e80f-default-rtdb.firebaseio.com",
  projectId: "socialflow-8e80f",
  storageBucket: "socialflow-8e80f.appspot.com",
  messagingSenderId: "497949644278",
  appId: "1:497949644278:web:a99b2e76c5647ea4e2a3d7",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();

