// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useSignOut, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs'
import { getFirestore, addDoc, collection } from 'firebase/firestore';

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
const db = getFirestore(firebaseApp);

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

type Edition = {
  label: string;
  partenershipStartDate: Date;
  cfpStartDate: Date;
  cfpEndDate: Date;
  installDate: Date;
  startDate: Date;
  endDate: Date;
}

const CreateEdition = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const edition: Edition = {
      label: `Devfest Lille ${startDate?.getFullYear()}`,
      partenershipStartDate: new Date(startDate!.getFullYear(), 0, 1),
      cfpStartDate: new Date(startDate!.getFullYear(), 0, 1),
      cfpEndDate: new Date(startDate!.getFullYear(), 2, 31),
      installDate: dayjs(startDate).subtract(1).toDate(),
      startDate: startDate!,
      endDate: endDate!
    }
    addDoc(collection(db, 'editions'), edition)
  };
  return (
    <>
      <h1> Créer une nouvelle édition du Devfest Lille </h1>
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DatePicker label="Date de Début" onChange={(value: any) => setStartDate(value.toDate())}/>
            <DatePicker label="Date de Fin" onChange={(value: any) => setEndDate(value.toDate())}/>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Créer
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>,
  },
  {
    path: '/admin/create',
    element: <CreateEdition></CreateEdition>,
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </React.StrictMode>
  );
};

/** Wrap it */
export default App;
