import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCJtNizyHKaNsDpJGzIb0tgq3hWagrIkY4",
  authDomain: "texnomart-e5905.firebaseapp.com",
  projectId: "texnomart-e5905",
  storageBucket: "texnomart-e5905.appspot.com",
  messagingSenderId: "839597348966",
  appId: "1:839597348966:web:e76019f7303be6564eb5a7",
  measurementId: "G-L9Q8PFDZF0"
};

const Backend = initializeApp(firebaseConfig);
const auth = getAuth();

export {
  Backend,
  auth
}