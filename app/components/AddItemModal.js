import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';

const AddItemModal = ({ open, handleClose, itemName, setItemName, itemQuantity, setItemQuantity, itemExpiryDate, setItemExpiryDate, itemCategory, setItemCategory, addItem }) => (
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
      <Stack width="100%" direction="column" spacing={2}>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          fullWidth
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <TextField
          label="Expiry Date"
          variant="outlined"
          type="date"
          fullWidth
          value={itemExpiryDate}
          onChange={(e) => setItemExpiryDate(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <Button variant="contained" onClick={addItem}>
          Add
        </Button>
      </Stack>
    </Box>
  </Modal>
);

export default AddItemModal;
