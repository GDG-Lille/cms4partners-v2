import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { createEdition } from '.';

describe('onEditionCreated', () => {
  it('should add an edition', () => {
    const add = jest.fn();
    const collection = jest.fn().mockImplementation(() => {
      return {
        add
      }
    });
    createEdition({
        ref: {
            collection
        }
    } as unknown as QueryDocumentSnapshot);

    expect(collection).toHaveBeenCalledWith('steps');
    expect(add).toHaveBeenCalledWith({ label: 'todo' });
  });
});
