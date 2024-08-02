import React, { useRef, useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { Box, Button, Typography, ImageList, ImageListItem } from '@mui/material';
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
    <Box>
      {!showCamera ? (
        <Button variant="contained" onClick={handleOpenCamera}>
          Upload Photo
        </Button>
      ) : (
        <>
          <Camera ref={camera} />
          <Button variant="contained" onClick={handleTakePhoto}>
            Take Photo
          </Button>
          <Button variant="contained" onClick={handleCloseCamera}>
            Close Camera
          </Button>
        </>
      )}
      {image && <img src={image} alt='Taken photo' />}
      <Typography variant="h6" mt={2}>Gallery</Typography>
      <ImageList cols={3} rowHeight={164}>
        {galleryImages.map((imgUrl, index) => (
          <ImageListItem key={index}>
            <img src={imgUrl} alt={`Gallery item ${index}`} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default CameraComponent;
