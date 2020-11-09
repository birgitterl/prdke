const app = require('./src/app')

// Connect to port
app.listen(5000, () => {
    console.log('Server started on port 5000...');
});
