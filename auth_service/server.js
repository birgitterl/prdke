const app = require('./src/app');
const connectDB = require('./src/config/db');

const port = process.env.PORT || 8080;

// Connect to MongoDB with restart on failure options
connectDB();

// Start the server
app.listen(port, () => {
  console.log('Server startet on port ' + port);
});
