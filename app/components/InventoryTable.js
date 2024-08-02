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
            sx: { height: '30px' } // Adjust height of the search input
          }}
          sx={{ width: '50%' }} // Adjust width of the search input
        />
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ height: '30px', backgroundColor: '#362312', color: 'white', marginLeft: 'auto' }}
        >
          Add New Item
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '16px',
          boxShadow: 3,
          overflow: 'auto', // Enable scrolling
          maxHeight: '400px', // Adjust height as needed
          width: '100%', // Set the width of the TableContainer
        }}
      >
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>Item Name</TableCell>
              <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>Expiry Date</TableCell>
              <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>Category</TableCell>
              <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map(({ name, quantity, expiryDate, category }) => (
              <TableRow key={name}>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>{quantity}</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>{expiryDate}</TableCell>
                <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', height: '30px' }}>
                  <Chip
                    label={category}
                    sx={{
                      borderRadius: '20px',
                      backgroundColor: categoryColors[category] || '#e0e0e0',
                      color: '#000',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ height: '30px' }}>
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
