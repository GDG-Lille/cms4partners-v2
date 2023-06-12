// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useSignOut, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as React from "react";

const firebaseConfig = {
  apiKey: 'AIzaSyBzwfrmAx8unwKnGq7DBzu0PD2qlvxcExs',
  authDomain: 'cms4devfest-v2.firebaseapp.com',
  projectId: 'cms4devfest-v2',
  storageBucket: 'cms4devfest-v2.appspot.com',
  messagingSenderId: '204563655625',
  appId: '1:204563655625:web:0a23dbae1d0ef27cec9618',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = getAuth(firebaseApp);

const HomePage = () => {
  const [signOut] = useSignOut(firebaseAppAuth);
  const [signInWithGoogle, user, loading, error] =
    useSignInWithGoogle(firebaseAppAuth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <p>Current User: {user.user.email}</p>
        <button onClick={signOut}>Log out</button>
      </div>
    );
  }
  return <button onClick={() => signInWithGoogle()}>Log in</button>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>,
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

/** Wrap it */
export default App;
