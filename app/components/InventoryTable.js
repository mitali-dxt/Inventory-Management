import { useState } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Box,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search'; // Import Search icon
import { categories } from '../data/categories';

const categoryColors = Object.fromEntries(categories.map(cat => [cat.name, cat.color]));

const InventoryTable = ({ inventory, addItem, removeItem, handleOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box display="flex" alignItems="center" mb={2} gap={1}>
        <TextField
          label="Search Items"
          variant='standard'
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
            sx: { height: '30px' } 
          }}
          sx={{ width: '50%' }} 
        />
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ height: '30px', backgroundColor: '#362312', color: 'white', marginLeft: 'auto', ":hover": { backgroundColor: '#795C32' } }}
        >
          Add New Item
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '16px',
          boxShadow: 0,
          overflow: 'auto', // Enable scrolling
          maxHeight: '400px', // Adjust height as needed
          width: '100%', // Set the width of the TableContainer
        }}
      >
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow >
              <TableCell sx={{ color: 'black', fontFamily: 'Poppins, sans-serif',fontWeight:'bold', fontSize: '14px', height: '20px' , paddingTop: 0.8, paddingBottom: 0.8 }}>Item Name</TableCell>
              <TableCell sx={{ color: 'black', fontFamily: 'Poppins, sans-serif',fontWeight:'bold', fontSize: '14px', height: '20px' , paddingTop: 0.8, paddingBottom: 0.8 }}>Quantity</TableCell>
              <TableCell sx={{ color: 'black', fontFamily: 'Poppins, sans-serif', fontWeight:'bold',fontSize: '14px', height: '20px' , paddingTop: 0.8, paddingBottom: 0.8 }}>Expiry Date</TableCell>
              <TableCell sx={{ color: 'black', fontFamily: 'Poppins, sans-serif', fontWeight:'bold',fontSize: '14px', height: '20px' , paddingTop: 0.8, paddingBottom: 0.8 }}>Category</TableCell>
              <TableCell sx={{ color: 'black', fontFamily: 'Poppins, sans-serif', fontWeight:'bold',fontSize: '14px', height: '20px' ,paddingTop: 0.8, paddingBottom: 0.8 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map(({ name, quantity, expiryDate, category }) => (
              <TableRow key={name}>
                <TableCell sx={{ color:'gray',fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '20px', paddingTop: 0.8, paddingBottom: 0.8  }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </TableCell>
                <TableCell sx={{ color:'gray',fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '20px' , paddingTop: 0.8, paddingBottom: 0.8 }}>{quantity}</TableCell>
                <TableCell sx={{ color:'gray',fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '20px' , paddingTop: 0.8, paddingBottom: 0.8  }}>{expiryDate}</TableCell>
                <TableCell sx={{ color:'gray',fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '20px', paddingTop: 0.8, paddingBottom: 0.8  }}>
                  <Chip
                    label={category}
                    sx={{
                      borderRadius: '20px',
                      backgroundColor: categoryColors[category] || '#e0e0e0',
                      color: '#000',
                    }}
                  />
                </TableCell>
                <TableCell sx={{color:'gray', height: '20px', paddingTop: 0.8, paddingBottom: 0.8}}>
                  <IconButton onClick={() => addItem(name)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => removeItem(name)}>
                    <RemoveIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventoryTable;
