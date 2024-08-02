'use client'

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
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
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);

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

  const getRecipeSuggestions = async () => {
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      history: [],
    });

    const inventoryItems = inventory.map(item => item.name).slice(0, 5).join(", ");
    const message = `Suggest a few recipes based on these ingredients: ${inventoryItems}. Keep the suggestions concise and practical. It is not necessary to include all the ingredients in the recipe. Give recipe name and a brief description.`;

    try {
      const result = await chatSession.sendMessage(message);
      const suggestions = result.response.text()
        .split('\n')
        .filter(suggestion => suggestion.trim() !== '')
        .map(suggestion => suggestion.replace(/(\*\*.*?\*\*)/g, '')); // Remove ** ** formatting
      setRecipeSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching recipe suggestions:", error);
    }
  };

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
          display="flex"
          mt={2}
          gap={4}
        >
          <ShoppingList />
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              width="100%"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="black"
                flexGrow={1}
              >
                Recipe Suggestions
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={getRecipeSuggestions}
                sx={{ ml: 2 }}
              >
                Get Suggestions
              </Button>
            </Box>
            {recipeSuggestions.length > 0 && (
              <Box width="100%">
                <Paper elevation={3} sx={{ p: 2 }}>
                  {recipeSuggestions.map((suggestion, index) => {
                    const [title, ...description] = suggestion.split('\n');
                    return (
                      <Box key={index} mb={2}>
                        <Typography variant="h8">
                          {title}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          {description.join('\n')}
                        </Typography>
                      </Box>
                    );
                  })}
                </Paper>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
