const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getMenuItemsByCategory,
    getMenuItemsByCategoryAndFoodType,
    getMenuItemsBySearch,
    getMenuItemsByPriceRange,
    getMenuItemsByFoodType,
    getCategorys
} = require('../controllers/menuItemController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

const uploadDir = './uploads/menuItems';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
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

const upload = multer({ storage, fileFilter });

router.post('/menu-items',upload.single('image'), createMenuItem); 
router.get('/menu-items', protect, getMenuItems);
router.get('/menu-items/category/:category', protect, getMenuItemsByCategory);
router.get('/menu-items/category/:category/food-type/:foodType', protect, getMenuItemsByCategoryAndFoodType);
router.get('/menu-items/search/:searchTerm', protect, getMenuItemsBySearch);
router.get('/menu-items/price-range/:minPrice/:maxPrice', protect, getMenuItemsByPriceRange);
router.get('/menu-items/food-type/:foodType', protect, getMenuItemsByFoodType);
router.get('/menu-items/:id', protect, getMenuItemById);
router.put('/menu-items/:id', protect, authorize(['super_admin', 'enterprise_admin']), updateMenuItem);
router.delete('/menu-items/:id', protect, authorize(['super_admin', 'enterprise_admin']), deleteMenuItem);
router.get('/categories', getCategorys);

module.exports = router;
