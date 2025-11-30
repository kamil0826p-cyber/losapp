import { doc, getFirestore, onSnapshot, type Unsubscribe } from 'firebase/firestore'

export class UserService {
  static subscribeToCredits(uid: string, callback: (credits: number) => void): Unsubscribe {
    const db = getFirestore()
    const userDocRef = doc(db, 'users', uid)

    return onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data()
          callback(userData?.credits || 0)
        } else {
          callback(0)
        }
      },
      (error) => {
        console.error('Error listening to credits:', error)
        callback(0)
      },
    )
  }
}
