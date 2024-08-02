import React, { useRef, useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { Box, Button, Typography, IconButton, ImageList, ImageListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { uploadImageToFirebase, addImageUrlToFirestore, fetchImageUrls } from '../firebase/utils';

const CameraComponent = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);

  const handleOpenCamera = () => setShowCamera(true);
  const handleCloseCamera = () => setShowCamera(false);

  const handleTakePhoto = async () => {
    const photo = camera.current.takePhoto();
    setImage(photo);

    const imageUrl = await uploadImageToFirebase(photo);
    await addImageUrlToFirestore(imageUrl);

    // Update gallery images after uploading new image
    const updatedGalleryImages = await fetchImageUrls();
    setGalleryImages(updatedGalleryImages);

    handleCloseCamera(); // Close camera after taking photo
  };

  useEffect(() => {
    const loadGalleryImages = async () => {
      const images = await fetchImageUrls();
      setGalleryImages(images);
    };

    loadGalleryImages();
  }, []);

  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      sx={{ width: '100%' }}
    >
      <Box
        mt={4}
        p={2}
        width="100%"
        maxWidth="800px"
        borderRadius="16px"
        bgcolor='#2B1700'
        boxShadow={3}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}>
            Gallery
          </Typography>
          {!showCamera && (
            <IconButton
              onClick={handleOpenCamera}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                ":hover": { backgroundColor: '#F5F5DC' },
                borderRadius: '8px',
                padding: '8px'
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>

        {showCamera ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box
              sx={{
                width: '100%',
                height: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '2px solid #ccc'
              }}
            >
              <Camera ref={camera} aspectRatio={16 / 9} />
            </Box>
            <Button
              variant="contained"
              onClick={handleTakePhoto}
              sx={{ backgroundColor: '#F5F5DC', color: 'black', ":hover": { backgroundColor: '#C2B280' } }}
            >
              Take Photo
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseCamera}
              sx={{ backgroundColor: '#A52A2A', color: 'white', ":hover": { backgroundColor: '#c62828' } }}
            >
              Close Camera
            </Button>
          </Box>
        ) : (
          <ImageList cols={3} gap={8} rowHeight={200} sx={{ width: '100%' }}>
            {galleryImages.map((imgUrl, index) => (
              <ImageListItem key={index} sx={{ overflow: 'hidden', borderRadius: '8px' }}>
                <img
                  src={imgUrl}
                  alt={`Gallery item ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Box>
  );
};

export default CameraComponent;
