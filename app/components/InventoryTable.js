import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { categories } from '../data/categories';

const categoryColors = Object.fromEntries(categories.map(cat => [cat.name, cat.color]));

const InventoryTable = ({ inventory, addItem, removeItem }) => (

  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif' }}>Item Name</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif' }}>Quantity</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif' }}>Expiry Date</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif' }}>Category</TableCell>
          <TableCell sx={{ color: 'gray', fontFamily: 'Poppins, sans-serif' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inventory.map(({ name, quantity, expiryDate, category }) => (
          <TableRow key={name}>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </TableCell>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{quantity}</TableCell>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{expiryDate}</TableCell>
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
              <Chip
                label={category}
                sx={{
                  borderRadius: '20px',
                  backgroundColor: categoryColors[category] || '#e0e0e0', // Use predefined color or default to light gray
                  color: '#000', // Black text color
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
