const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const authRouters = require('./routes/authRoutes');
const menuItemRouters = require('./routes/menuItemRoutes');
const restaurantRouters = require('./routes/restaurantRoutes');
const userRouters = require('./routes/userRoutes');
const bookingRouters = require('./routes/bookingRoutes');
const tableRouters = require('./routes/tableRoutes');
const offerRouters = require('./routes/offerRoutes');
const orderRouters = require('./routes/orderRoutes');
const customerRouters = require('./routes/customerRoutes');

dotenv.config();
const app = express();
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRouters);
app.use('/api', userRouters)
app.use('/api', menuItemRouters);
app.use('/api', restaurantRouters);
app.use('/api', tableRouters);
app.use('/api', bookingRouters);
app.use('/api', offerRouters);
app.use('/api', orderRouters)
app.use('/api', customerRouters)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
