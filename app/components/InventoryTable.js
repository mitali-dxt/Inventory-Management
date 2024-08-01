import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { categories } from '../data/categories';

const categoryColors = Object.fromEntries(categories.map(cat => [cat.name, cat.color]));

const InventoryTable = ({ inventory, addItem, removeItem }) => (
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: '16px',
      boxShadow: 3,
      overflow: 'hidden',
      maxHeight: '400px', // Adjust height as needed
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>Item Name</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>Quantity</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>Expiry Date</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>Category</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inventory.map(({ name, quantity, expiryDate, category }) => (
          <TableRow key={name}>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </TableCell>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>{quantity}</TableCell>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>{expiryDate}</TableCell>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
              <Chip
                label={category}
                sx={{
                  borderRadius: '20px',
                  backgroundColor: categoryColors[category] || '#e0e0e0',
                  color: '#000',
                }}
              />
            </TableCell>
            <TableCell>
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
);

export default InventoryTable;
