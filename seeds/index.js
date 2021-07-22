const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '60f31fc8bd8d1d3da8f7574c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet rerum dignissimos mollitia repellat quae magni ut corrupti ea! Inventore unde quibusdam nam. Esse, numquam! Omnis temporibus nihil quae quis recusandae.',
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
              {
                url: 'https://res.cloudinary.com/sushanthja/image/upload/v1626730402/YelpCamp/niwdzwyzzuos2dhbjnpf.jpg',
                filename: 'YelpCamp/niwdzwyzzuos2dhbjnpf'
              },
              {
                url: 'https://res.cloudinary.com/sushanthja/image/upload/v1626730400/YelpCamp/ury0tho8zxnbqowfgr59.jpg',
                filename: 'YelpCamp/ury0tho8zxnbqowfgr59'
              },
              {
                url: 'https://res.cloudinary.com/sushanthja/image/upload/v1626730401/YelpCamp/brjv36jcc2fmxjdtymlz.jpg',
                filename: 'YelpCamp/brjv36jcc2fmxjdtymlz'
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});