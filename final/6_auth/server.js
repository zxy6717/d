const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Dummy user data (ideally this should be stored in a database)
const users = [];

// Endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data (ideally this should be stored in a database)
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




// for testing
// login: Invoke-RestMethod -Method POST -Uri "http://localhost:3000/login" -ContentType "application/json" -Body '{"username": "exampleuser", "password": "password123"}'
//register:Invoke-RestMethod -Method POST -Uri "http://localhost:3000/register" -ContentType "application/json" -Body '{"username": "exampleuser", "password": "password123"}'
 