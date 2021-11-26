import * as admin from 'firebase-admin';
import { firestore } from 'utils/firebase';


export function getContentById(ids:string[], path: string) : Promise<admin.firestore.DocumentData[]>{
    return new Promise((res) => {
      // don't run if there aren't any ids or a path for the collection
      if (!ids || !ids.length || !path) return res([]);
  
      const collectionPath = firestore.collection(path);
      let batches = [];
  
      while (ids.length) {
        // firestore limits batches to 10
        const batch = ids.splice(0, 10);
  
        // add the batch request to to a queue
        batches.push(
          new Promise((response) => {
            collectionPath
              .where(admin.firestore.FieldPath.documentId(), 'in', [...batch])
              .get()
              .then((results) =>
                response(results.docs.map((result) => ({ ...result.data() })))
              );
          })
        );
      }
  
      // after all of the data is fetched, return it
      Promise.all(batches).then((content) => {
        res(content.flat());
      });
    });
  }
  