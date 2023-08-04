import {QueryDocumentSnapshot} from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

export const createEdition = (snapshot: QueryDocumentSnapshot) => {
  return snapshot.ref.collection('steps').add({
    label: 'todo'
  })
}
export const onEditionCreated = functions.firestore
  .document(`edition/{editionId}`)
  .onCreate(async (snapshot) => {
    return createEdition(snapshot);
  });
