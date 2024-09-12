import { Firestore } from '@google-cloud/firestore';
import config from '../config';

const { projectId, firestoreCollection } = config;

class FirestoreClient {
  private firestore: Firestore;

  constructor() {
    this.firestore = new Firestore({
      projectId,
    });
  }

  async getDocuments(): Promise<FirebaseFirestore.DocumentData[]> {
    const collectionReference = this.firestore.collection(firestoreCollection);
    const response = await collectionReference.get();
    return response.docs
  }
}

export default new FirestoreClient();
