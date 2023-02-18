
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGiFmaitc87ksbCL9mKfAWjFvNW4XGVhc",
  authDomain: "cflow-prod.firebaseapp.com",
  databaseURL: "https://cflow-prod-default-rtdb.firebaseio.com",
  projectId: "cflow-prod",
  storageBucket: "cflow-prod.appspot.com",
  messagingSenderId: "422652989354",
  appId: "1:422652989354:web:eb166c3f6f807da66525d3",
  measurementId: "G-18X2P35G1F"
}

// Initialize Firebase
// if (!firebaseApp.apps.length) {
//   initializeApp({});
// }else {
//   app(); // if already initialized, use that one
// }
const firebaseApp = initializeApp(firebaseConfig)

// google sign in

const googleProvider = new GoogleAuthProvider()

// force the user to select their account in the provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()

export const signInWithGooglePopuop = () => signInWithPopup(auth, googleProvider)

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// get database instance
export const db = getFirestore()


export const createUserDocumentFromAuth = async (userObj, additionalInformation) => {
  // returns an object: doc instance gets three arguments: database, collectionName, identifier
  const userDocRef = doc(db, 'Users', userObj.uid)

  /// returns data object: special of the document for us
  const userSnapShot = await getDoc(userDocRef)

  // we can also check the to check document is exists or not
  // userSnapShot.exists()

  // we should at first check the user data is exists
  if (!userSnapShot.exists()) {
    const { displayName, email } = userObj
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.error('error in the create a document', error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const addCollectionAndDocument = async (collectionKey, docObjToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  docObjToAdd.forEach(obj => {
    const docRef = doc(collectionRef, obj.title.toLowerCase())
    batch.set(docRef, obj)
  })

  try {
    await batch.commit()
  } catch (error) {
    console.log(error)
  }
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')

  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)

  const categoryMap = querySnapshot.docs.reduce((acc, docSnap) => {
    const { title, items } = docSnap.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

export default firebaseApp
