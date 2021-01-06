const app = require('./src/app');

// Connect to port
app.listen(7050, () => {
  console.log('Server started on port 7050...');
});
