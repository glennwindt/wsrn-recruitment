import { db } from './firebase'; // assumes Firebase is configured
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const EMAIL_COLLECTION = 'emailRegistry';

export const activateEmail = async ({ email, role, domain }) => {
  try {
    await addDoc(collection(db, EMAIL_COLLECTION), {
      email,
      role,
      domain,
      isActive: true,
      routedTo: role === 'Owner' ? 'OwnerPane' : 'StaffPane',
      createdAt: new Date(),
    });
    console.log(`Activated: ${email}`);
  } catch (error) {
    console.error('Activation failed:', error);
  }
};

export const fetchEmailRegistry = async () => {
  try {
    const snapshot = await getDocs(collection(db, EMAIL_COLLECTION));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Fetch failed:', error);
    return [];
  }
};

