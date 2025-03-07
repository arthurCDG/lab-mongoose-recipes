const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((db) => {
    console.log(`Connected to the database: "${db.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    (async function loadAllPromises() {
      try {
        /* ----------------------------- ITERATION 2 -------------------------------------- */
        const oneRecipe = await Recipe.create({
          title: "The Best Vegetable Lasagna",
          level: "Amateur Chef",
          ingredients: [
            "6 peeled tomatoes",
            "4 zucchinis",
            "pepper",
            "salt",
            "italian herbs",
            "lasagna pasta",
            "fresh basil",
            "400g of grated cheese",
            "200g of tomato sauce",
            "4 onions",
            "50cl of white sauce",
          ],
          cuisine: "italian",
          dishType: "main_course",
          image:
            "https://assets.afcdn.com/recipe/20210212/117942_w96h96c1cx1060cy707cxb2121cyb1414.webp",
          duration: 45,
          creator: "Arthur",
        });

        console.log(oneRecipe.title);

        /* ----------------------------- ITERATION 3 -------------------------------------- */
        const allRecipes = await Recipe.insertMany(data);
        allRecipes.forEach((recipe) => console.log(recipe.title));

        /* ----------------------------- ITERATION 4 -------------------------------------- */
        const findRigatoniAndUpdate = await Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        );
        console.log("updated this recipe: ", findRigatoniAndUpdate.title);

        /* ----------------------------- ITERATION 5 -------------------------------------- */
        const deleteCarrotCake = await Recipe.deleteOne({
          title: "Carrot Cake",
        });
        console.log("Deleted this recipe: ", deleteCarrotCake.title);

        /* ----------------------------- ITERATION 6 -------------------------------------- */
        const closeMongoose = await mongoose.connection.close();
        console.log("Disconnected!", closeMongoose);
      } catch (err) {
        console.error(err);
      }
    })();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
