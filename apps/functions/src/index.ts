import * as functions from 'firebase-functions';

export const onEditionCreated = functions.firestore
  .document(`edition/{editionId}`)
  .onCreate(async (snapshot) => {
    return snapshot.ref.collection('steps').add({
      label: 'todo'
    })
  });
