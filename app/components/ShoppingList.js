import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore } from '@/firebase'; 
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const shoppingItemsDocRef = doc(firestore, 'shoppingList', 'shoppingItems');

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const docSnap = await getDoc(shoppingItemsDocRef);
      if (docSnap.exists()) {
        setItems(docSnap.data().Items || []);
      }
    };

    fetchItems();
  }, []);

  const addItem = async () => {
    if (newItem.trim()) {
      await updateDoc(shoppingItemsDocRef, {
        Items: arrayUnion(newItem.trim())
      });
      setNewItem('');
      const docSnap = await getDoc(shoppingItemsDocRef);
      setItems(docSnap.data().Items || []);
    }
  };

  const removeItem = async (item) => {
    await updateDoc(shoppingItemsDocRef, {
      Items: arrayRemove(item)
    });
    const docSnap = await getDoc(shoppingItemsDocRef);
    setItems(docSnap.data().Items || []);
  };

  return (
    <Box sx={{ width: '300px', p: 2, bgcolor: 'white', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h6" mb={2}>Shopping List</Typography>
      <TextField
        label="Add item"
        variant="outlined"
        fullWidth
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={addItem}>
        Add
      </Button>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ShoppingList;
