const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {
  createRestaurantProfile,
  getRestaurantProfile,
  uploadRestaurantImages,
  getRestaurantImagesById,
  getRestaurantDetails,
  getAllRestaurants,
  getRestaurantByUserId,
} = require('../controllers/restaurantController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

const logoUploadDir = './uploads/restaurantLogo';
if (!fs.existsSync(logoUploadDir)) {
  fs.mkdirSync(logoUploadDir, { recursive: true });
}

const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, logoUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const imagesUploadDir = './uploads/restaurantImages';
if (!fs.existsSync(imagesUploadDir)) {
  fs.mkdirSync(imagesUploadDir, { recursive: true });
}

const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only JPG/PNG files are allowed"));
};

const uploadLogo = multer({ storage: logoStorage, fileFilter });
const uploadImages = multer({ storage: imagesStorage, fileFilter });


router.post('/restaurant-profile', protect, uploadLogo.single('image'), createRestaurantProfile);

router.get('/restaurent/by-user-id/:userId', getRestaurantByUserId);

router.get('/restaurant-profile/:ownerId', protect, getRestaurantProfile);

router.get('/restaurans/all', getAllRestaurants);

router.get('/restaurant-details/:restaurantId', getRestaurantDetails)

router.get('/restaurant-profile/images/:restaurantId', protect, getRestaurantImagesById);

router.post('/restaurant-profile/images', protect, uploadImages.array('images'), uploadRestaurantImages);


module.exports = router;
