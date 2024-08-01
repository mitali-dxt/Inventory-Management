'use client'
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Header from './components/Header';
import AddItemModal from './components/AddItemModal';
import InventoryTable from './components/InventoryTable';
import ShoppingList from './components/ShoppingList'; 
import { fetchInventory, addItemToInventory, removeItemFromInventory } from './firebase/utils';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemExpiryDate, setItemExpiryDate] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  const updateInventory = async () => {
    const inventoryList = await fetchInventory();
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async () => {
    await addItemToInventory(itemName, itemQuantity, itemExpiryDate, itemCategory);
    await updateInventory();
    handleClose();
  };

  const removeItem = async (name) => {
    await removeItemFromInventory(name);
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="150vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Header />
      <Box
        width="50%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={5}
        gap={2}
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="background.paper"
          p={2}
        >
          <InventoryTable
            inventory={inventory}
            addItem={addItem}
            removeItem={removeItem}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ mt: 2 }} // Add margin-top to separate from table
          >
            Add New Item
            </Button>
            <AddItemModal
            open={open}
            handleClose={handleClose}
            itemName={itemName}
            setItemName={setItemName}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
            itemExpiryDate={itemExpiryDate}
            setItemExpiryDate={setItemExpiryDate}
            itemCategory={itemCategory}
            setItemCategory={setItemCategory}
            addItem={addItem}
          />
        </Box>
        <Box
          width="100%"
          mt={2}
        >
          <ShoppingList />
        </Box>
      </Box>
    </Box>
  );
}
