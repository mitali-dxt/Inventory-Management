import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const InventoryTable = ({ inventory, addItem, removeItem }) => (
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Item Name</TableCell>
          <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Quantity</TableCell>
          <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Expiry Date</TableCell>
          <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Category</TableCell>
          <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>Actions</TableCell>
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
            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{category}</TableCell>
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
