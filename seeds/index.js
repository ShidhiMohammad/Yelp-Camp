const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Datatbase connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USERID
            author: '61d8cfd5b0d173f1f89bb635',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laborum accusamus deleniti accusantium. Eos magni exercitationem dignissimos voluptatem magnam a quas numquam sunt facilis deleniti laboriosam consectetur, ut, similique voluptatum?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/shidhi/image/upload/v1641493976/YelpCamp/tjbgezcuvlcxkqoynxru.jpg',
                    filename: 'YelpCamp/tjbgezcuvlcxkqoynxru',
                }
            ]

        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})