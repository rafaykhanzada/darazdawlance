const axios = require("axios");
const fs = require("fs");
const path = require("path");

const reviews = async () => {
  try {
    const directory = "./data/reviews";
    const products = fs.readFileSync("data/products.json");
    const productsJson = JSON.parse(products);
    for (let i = 0; i < productsJson.result.totalCount; i++) {
      let currentproduct = productsJson.result.data.products[i];
      const filePath = path.join(directory, `${currentproduct.auctionId}.json`);

      const response = await axios
        .get(
          `https://my.daraz.pk/pdp/review/getReviewList?itemId=${currentproduct.auctionId}&pageSize=100000&filter=0&sort=0&pageNo=1`
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      // Create the directory if it doesn't exist
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(response));
    }
    console.log("Completed");
    return true;
  } catch (error) {
    console.log(error);
  }
};

reviews();

