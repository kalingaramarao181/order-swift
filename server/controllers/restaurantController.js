const Menu = require('../models/menuItemModel');
const Restaurant = require('../models/restaurantModel');
const Tables = require('../models/tableModel');

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


const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.getAllRestaurants();
        const grouped = {};
        restaurants.forEach(row => {
            const id = row.restaurant_id;
            if (!grouped[id]) {
              grouped[id] = {
                id,
                name: row.name,
                description: row.description,
                location: row.location,
                logo: row.logo,
                images: []
              };
            }
            if (row.restaurant_image) {
              grouped[id].images.push(row.restaurant_image);
            }
        });
        const formattedRestaurants = Object.values(grouped).map(rest => ({
            ...rest,
            image: rest.images[0] || null, 
            images: undefined 
          }));
        res.status(200).json(Object.values(formattedRestaurants));
    } catch (error) {
        console.error("Error fetching all restaurants:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getRestaurantDetails = async (req, res) => {
    const { restaurantId } = req.params;

  try {
    const restaurant = await Restaurant.getRestaurantProfileByRestaurantId(restaurantId);
    
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const images = await Restaurant.getRestaurantImagesById(restaurantId);
    const foodItems = await Menu.getMenuItemById(restaurantId);
    const tables = await Tables.getTablesByRestaurantId(restaurantId);

    res.status(200).json({
      name: restaurant[0].name,
      restaurantId: restaurant[0].id,
      logo: restaurant[0].image_url,
      description: restaurant[0].description,
      images: images.map((img) => img.image_url),
      tables: tables.map((table) => ({
        tableNumber: table.table_number,
        seats: table.seats,
        isAvailable: table.is_available,
        tableId: table.id,
      })),
      foodItems: foodItems.map((item) => ({
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
      })),
    });
  } catch (error) {
    console.error("Error in getRestaurantDetails:", error);
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
    getRestaurantDetails,
    getAllRestaurants
};