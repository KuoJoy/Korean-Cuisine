const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
const restaurList = require("./korea_restaurant.json");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurList.results });
});

app.get("/restaurants/:restaur_id", (req, res) => {
  const restaurant = restaurList.results.find(
    (restaur) => restaur.id.toString() === req.params.restaur_id
  );
  res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase(); // 利用trim將空白剔除以及將字母轉換為小寫
  const restaurants = restaurList.results.filter((restaurant) => {
    return (
      searchKeyword(restaurant.name, keyword) ||
      searchKeyword(restaurant.category, keyword)
    );
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

function searchKeyword(isSearchedItem, keyword) {
  return isSearchedItem.toLowerCase().includes(keyword);
}
