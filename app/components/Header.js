import { Box, Typography } from '@mui/material';

const Header = () => (
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
            fontFamily: 'Poppins, sans-serif',
          }}
        >
      Welcome to Your Pantry 🍽
    </Typography>
  </Box>
);

export default Header;
