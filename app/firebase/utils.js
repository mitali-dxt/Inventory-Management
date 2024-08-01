import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';

export const fetchInventory = async () => {
  const snapshot = query(collection(firestore, 'inventory'));
  const docs = await getDocs(snapshot);
  const inventoryList = [];
  docs.forEach((doc) => {
    inventoryList.push({ name: doc.id, ...doc.data() });
  });
  return inventoryList;
};

export const addItemToInventory = async (itemName, itemQuantity, itemExpiryDate, itemCategory) => {
  const docRef = doc(collection(firestore, 'inventory'), itemName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { quantity } = docSnap.data();
    await setDoc(docRef, { quantity: quantity + itemQuantity, expiryDate: itemExpiryDate, category: itemCategory }, { merge: true });
  } else {
    await setDoc(docRef, { quantity: itemQuantity, expiryDate: itemExpiryDate, category: itemCategory });
  }
};

export const removeItemFromInventory = async (name) => {
  const docRef = doc(collection(firestore, 'inventory'), name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { quantity } = docSnap.data();
    if (quantity === 1) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { quantity: quantity - 1 }, { merge: true });
    }
  }
};
