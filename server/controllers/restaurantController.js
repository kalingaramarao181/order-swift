const Restaurant = require('../models/restaurantModel');

const createRestaurantProfile = async (req, res) => {
    const { ownerId, name, description, address } = req.body;
    
    const image = req.file ? `/uploads/restaurantLogo/${req.file.filename}` : null;
    
    try {
        const result = await Restaurant.createRestaurant(ownerId, name, description, address, image);
        res.status(200).json({ message: "Restaurant profile updated successfully", result });
    } catch (error) {
        console.error("Error updating restaurant profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const uploadRestaurantImages = async (req, res) => {
    const { restaurantId } = req.body;
    
    const files = req.files;
  
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }
  
    try {
      const imageEntries = files.map(file => {
        return {
          restaurant_id: restaurantId,
          image_url: `/uploads/restaurantImages/${file.filename}`,
          description: '', 
          created_at: new Date()
        };
      });
  
      const result = await Restaurant.uploadMultipleRestaurantImages(imageEntries);
  
      res.status(200).json({
        message: 'Restaurant images uploaded successfully',
        images: result
      });
    } catch (error) {
      console.error('Error uploading restaurant images:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const getRestaurantProfile = async (req, res) => {
    try {
        const restaurantProfile = await Restaurant.getRestaurantProfile();
        res.status(200).json(restaurantProfile);
    } catch (error) {
        console.error("Error fetching restaurant profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getRestaurantImagesById = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const restaurantImages = await Restaurant.getRestaurantImagesById(restaurantId);
        if (!restaurantImages) {
            return res.status(404).json({ message: 'Restaurant images not found' });
        }
        res.status(200).json(restaurantImages);
    } catch (error) {
        console.error("Error fetching restaurant images:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getRestaurantProfileById = async (req, res) => {
    const { ownerId } = req.params;
    try {
        const restaurantProfile = await Restaurant.getRestaurantProfileById(ownerId);
        if (!restaurantProfile) {
            return res.status(404).json({ message: 'Restaurant profile not found' });
        }
        res.status(200).json(restaurantProfile);
    } catch (error) {
        console.error("Error fetching restaurant profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};





module.exports = {
    createRestaurantProfile,
    getRestaurantProfile,
    getRestaurantProfileById,
    uploadRestaurantImages,
    getRestaurantImagesById,
};