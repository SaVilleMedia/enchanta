const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Api Is running!');
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})