'use client'
import Head from 'next/head';
import {
  GoogleGenerativeAI,
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
import CameraComponent from './components/CameraComponent'; 
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
    const message = `Suggest a few recipes based on these ingredients: ${inventoryItems}. Keep the suggestions concise and practical. It is not necessary to include all the ingredients in the recipe. Give recipe name and a brief description. add 👩🏻‍🍳 emoji in beginning of response`;

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
      height="270vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
       <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+BE+VLG:wght@100..400&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <Box
        width="50%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="60vh"
        gap={2}
      >
        <Box
            width="120%"
            display="flex"
            alignItems="center"
            bgcolor="#EFDECD"
            mt={3}
            p={2}
            borderLeft="4px solid #000000"
            mb={2}
            boxShadow={1}
          >
            <Typography
              variant="body1"
              sx={{ 
                fontFamily: 'Playwrite BE VLG, sans-serif', 
                fontStyle: 'italic', 
                textAlign: 'center',
                flexGrow: 1
              }}
            >
              "Finding exciting ways to use leftovers is what we all struggle with. There's one simple thing that you can do to transform them: Stock your pantry."
            </Typography>
          </Box>
        
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="background.paper"
         
        >
           
          <InventoryTable
            inventory={inventory}
            addItem={addItem}
            removeItem={removeItem}
            handleOpen={handleOpen}
          />
          
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
          mt={4}
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
                sx={{ fontFamily: 'Playwrite BE VLG, sans-serif', fontStyle:'italics' }}
              >
                Recipe Suggestions 
              </Typography>
              <Button
                variant="contained"
                onClick={getRecipeSuggestions}
                sx={{ ml: 2, backgroundColor: '#362312', color: 'white',":hover": { backgroundColor: '#795C32' }}}
              >
                Get Suggestions
              </Button>
            </Box>
            <Typography
              variant="body2"
              mt={-2}
              sx={{
                fontFamily: 'Playwrite BE VLG, sans-serif',
                fontStyle: 'italic',
                textAlign: 'center',
                color: '#333',
              }}
            >
              Discover delicious recipes with what you already have in your pantry! 
            </Typography>
            {recipeSuggestions.length > 0 && (
              <Box width="100%">
                <Paper elevation={3} sx={{ p: 2 }}>
                  {recipeSuggestions.map((suggestion, index) => {
                    const [title, ...description] = suggestion.split('\n');
                    return (
                      <Box key={index} mb={2}>
                        <Typography  sx={{ fontFamily: 'Playwrite BE VLG, cursive',fontOpticalSizing: 'auto', fontWeight:'400',fontStyle: 'italic' }}>
                          {title}
                        </Typography>
                        <Typography  color="textSecondary" sx={{ fontFamily: 'Playwrite BE VLG, cursive', fontOpticalSizing: 'auto', fontWeight:'200',fontStyle: 'italic'}}>
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
        <CameraComponent />
      </Box>
    </Box>
  );
}
