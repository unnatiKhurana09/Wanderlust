const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main()
.then((res)=> console.log("connected to DB"))
.catch((err) => console.log(err));

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "65b4d2649e284f6d098e6015" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();