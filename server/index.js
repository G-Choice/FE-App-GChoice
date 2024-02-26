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


// Start the server
app.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});