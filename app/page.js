'use client'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, Card, CardContent, CardActions, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { firestore } from '@/firebase'
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  
  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 }, { merge: true })
    } else {
      await setDoc(docRef, { quantity: 1, name: item })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 }, { merge: true })
      }
    }
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        width="100%"
        height="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        bgcolor="lightblue"
      >
        <img
          src="/images/Pantry.png" 
          alt="Pantry"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
        <Typography
          variant="h4"
          zIndex={2}
          sx={{
            position: 'relative',
            fontWeight: 'bold',
            fontSize: '3rem',
            fontStyle: 'italic',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Welcome to Your Pantry 👩‍🍳
        </Typography>
      </Box>
      <Box
        width="100%"
        height="50%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#f5f5f5"
        p={2}
      >
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Item
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: 'none',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Typography id="modal-title" variant="h6">
              Add Item
            </Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Box width="800px" height="300px" mt={2}>
          <Typography variant="h5" mb={2}>
            Inventory Items
          </Typography>
          <Stack spacing={2} overflow="auto">
            {inventory.map(({ name, quantity }) => (
              <Card key={name} sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography color="textSecondary">
                    Quantity: {quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => addItem(name)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => removeItem(name)}>
                    <RemoveIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
