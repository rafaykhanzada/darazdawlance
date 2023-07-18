const axios=require('axios');
const fs = require('fs');
const path = require("path");


const reviews = async () => {
    try {
    const directory = "/data/reviews";
        const products = fs.readFileSync('data/products.json');
        const productsJson = JSON.parse(products);
        for (let i = 0; i < productsJson.length; i++) {
            let currentproduct = productsJson.result.data.products[i];
            const filePath = path.join(directory, `${currentproduct.auctionId.toString()}.json`);
            console.log(filePath)
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
              }
        
        }
        console.log("Completed");
        return true;
    } catch (error) {
        console.log(error);
    }
}

reviews();