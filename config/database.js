const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.error('Database connection error:', err);
});
