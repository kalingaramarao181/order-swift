const Menu = require('../models/menuItemModel');

const createMenuItem = async (req, res) => {
    const { restaurantId, name, description, price, category, foodType } = req.body;
    const image = req.file ? `/uploads/menuItems/${req.file.filename}` : null;
  
    if (!restaurantId || !name || !price || !category || !foodType || !image) {
      return res.status(400).json({ message: "All fields including image are required" });
    }
  
    try {
      const result = await Menu.createMenuItem(restaurantId, name, description, price, category, foodType, image);
      res.status(201).json({ message: "Menu item created successfully", result });
    } catch (error) {
      console.error("Error creating menu item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const getMenuItems = (req, res) => {
    try {
        const menuItems = Menu.getMenuItems();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Failed to fetch menu items' });
    }
}

const getAllMenuItems = (req, res) => {
    try {
        const menuItems = Menu.getAllMenuItems();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Failed to fetch menu items' });
    }
}

const getMenuItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const menuItem = await Menu.getMenuItemById(id); // Use await here
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ message: 'Failed to fetch menu item' });
    }
};

const updateMenuItem = (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, foodType } = req.body;
    

    try {
        const menuItem = Menu.updateMenuItem(id, {  name, description, price, category, foodType });
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item updated successfully' });
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ message: 'Failed to update menu item' });
    }
}

const deleteMenuItem = (req, res) => {
    const { id } = req.params;
    try {
        const menuItem = Menu.deleteMenuItem(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Failed to delete menu item' });
    }
}

const getMenuItemsByCategory = (req, res) => {
    const { category } = req.params;
    try {
        const menuItems = Menu.getMenuItemsByCategory(category);
        if (!menuItems) {
            return res.status(404).json({ message: 'No menu items found for this category' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items by category:', error);
        res.status(500).json({ message: 'Failed to fetch menu items by category' });
    }
}

const getMenuItemsByFoodType = (req, res) => {
    const { foodType } = req.params;
    try {
        const menuItems = Menu.getMenuItemsByFoodType(foodType);
        if (!menuItems) {
            return res.status(404).json({ message: 'No menu items found for this food type' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items by food type:', error);
        res.status(500).json({ message: 'Failed to fetch menu items by food type' });
    }
}

const getMenuItemsByCategoryAndFoodType = (req, res) => {
    const { category, foodType } = req.params;
    try {
        const menuItems = Menu.getMenuItemsByCategoryAndFoodType(category, foodType);
        if (!menuItems) {
            return res.status(404).json({ message: 'No menu items found for this category and food type' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items by category and food type:', error);
        res.status(500).json({ message: 'Failed to fetch menu items by category and food type' });
    }
}


const getMenuItemsBySearch = (req, res) => {
    const { searchTerm } = req.params;
    try {
        const menuItems = Menu.getMenuItemsBySearch(searchTerm);
        if (!menuItems) {
            return res.status(404).json({ message: 'No menu items found for this search term' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items by search term:', error);
        res.status(500).json({ message: 'Failed to fetch menu items by search term' });
    }
}

const getMenuItemsByPriceRange = (req, res) => {
    const { minPrice, maxPrice } = req.params;
    try {
        const menuItems = Menu.getMenuItemsByPriceRange(minPrice, maxPrice);
        if (!menuItems) {
            return res.status(404).json({ message: 'No menu items found for this price range' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items by price range:', error);
        res.status(500).json({ message: 'Failed to fetch menu items by price range' });
    }
}

const getCategorys = async (req, res) => {
    try {
        const categories = await Menu.getCategorys();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

module.exports = {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getMenuItems,
    getMenuItemsByCategory,
    getMenuItemsByFoodType,
    getMenuItemsByCategoryAndFoodType,
    getMenuItemsBySearch,
    getMenuItemsByPriceRange,
    getCategorys,
};