const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');

const app = express();
app.use(express.json());    //use to convert json to readable object
app.use(cors());

// schema for foods collection

const foodSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    fiber: Number,
    weight: Number,

})

const FoodModel = new mongoose.model("foods", foodSchema);

//Mongo Connection
mongoose.connect("mongodb://127.0.0.1:27017/Build-Nutrition-WebApp", {  //To connect MongoDb with the file
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("connected");
    })


app.post("/food/create", (req, res) => {

    // console.log(req.body);
    const food = req.body;

    let foodObj = new FoodModel(food);

    foodObj.save().then(() => {
        res.send({ status: "food stored" });
    })

})

app.get("/foods", async (req, res) => {

    let foods = await FoodModel.find();

    res.send({ foods: foods });
})

// app.get('/demo', (req, res) => {
//     consolelog("get request called")
// })

// localhost:/8000/demo

app.listen(8000);

