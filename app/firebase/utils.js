import { collection, doc, getDocs, updateDoc,query, setDoc, deleteDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
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

const storage = getStorage();

const uploadImageToFirebase = async (base64Image) => {
  const timestamp = Date.now();
  const storageRef = ref(storage, `gallery/photo_${timestamp}.jpg`);
  await uploadString(storageRef, base64Image, 'data_url');
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};

const addImageUrlToFirestore = async (imageUrl) => {
  const galleryRef = doc(firestore, 'gallery', 'itemgallery');
  await updateDoc(galleryRef, {
    imgURL: arrayUnion(imageUrl),
  });
};

const fetchImageUrls = async () => {
  const galleryRef = doc(firestore, 'gallery', 'itemgallery');
  const galleryDoc = await getDoc(galleryRef);
  if (galleryDoc.exists()) {
    return galleryDoc.data().imgURL;
  } else {
    console.log('No such document!');
    return [];
  }
};

export {
  uploadImageToFirebase,
  addImageUrlToFirestore,
  fetchImageUrls,
};
