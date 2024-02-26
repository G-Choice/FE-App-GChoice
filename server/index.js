const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock login route
app.post('/auth/login', (req, res) => {

  res.status(201).json({
    data: {
      accessToken: "abc"
    }
  });
});
app.get ('product', (req,res)=>{
  res.status(201).json({
    data: [
      {
          "id": 1,
          "product_name": "Bowl",
          "price": 23,
          "status": "active",
          "description": "A good product",
          "brand": "GUCCI",
          "quantity_sold": 0,
          "quantity_inventory": 30,
          "created_at": "2024-02-21T02:22:50.234Z",
          "delete_At": null,
          "category_id": 1,
          "shop_id": 10,
          "images": [
              "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e",
              "https://down-vn.img.susercontent.com/file/sg-11134201-7qvds-lhyh9z2ofpve3d",
              "https://down-vn.img.susercontent.com/file/sg-11134201-7rbk0-lkm4xvkp7ezy4e"
          ],
          "product_id": 1,
          "product_quantity_sold": 0,
          "product_price": 23,
          "avgRating": "4.0000000000000000"
      },
      {
          "id": 3,
          "product_name": "Hat",
          "price": 25,
          "status": "active",
          "description": "A good product",
          "brand": "ADIAS",
          "quantity_sold": 0,
          "quantity_inventory": 20,
          "created_at": "2024-02-21T02:30:06.283Z",
          "delete_At": null,
          "category_id": 1,
          "shop_id": 11,
          "images": [],
          "product_id": 3,
          "product_quantity_sold": 0,
          "product_price": 25,
          "avgRating": "5.0000000000000000"
      }
  ],
  meta: {
      "itemCount": 2,
      "pageCount": null,
      "hasPreviousPage": false,
      "hasNextPage": false
  },
  message: "Success"

  })}
)


// Start the server
app.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});