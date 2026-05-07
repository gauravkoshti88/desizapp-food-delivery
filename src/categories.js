import Snacks from "./assets/category/Snacks.png";
import MainCourse from "./assets/category/Main_Course.png";
import Desserts from "./assets/category/Desserts.png";
import Pizza from "./assets/category/Pizza.png";
import Burgers from "./assets/category/Burgers.png";
import Sandwiches from "./assets/category/Sandwiches.png";
import SouthIndian from "./assets/category/South_Indian.png";
import Chinese from "./assets/category/Chinese.png";
import FastFood from "./assets/category/Fast_Food.png";
import All from "./assets/category/All.png";

const categories = [
  { category: "Snacks", image: Snacks },
  { category: "Main Course", image: MainCourse },
  { category: "Pizza", image: Pizza },
  { category: "Burger", image: Burgers },
  { category: "Dessert", image: Desserts },
  { category: "Drink", image: Desserts }, // ✅ using existing image name
  { category: "Sandwich", image: Sandwiches },
  { category: "Salad", image: Chinese }, // ✅ reusing Chinese image variable
  { category: "Fast-Food", image: FastFood },
  { category: "South-Indian", image: SouthIndian },
  { category: "All", image: All },
];

export default categories;
