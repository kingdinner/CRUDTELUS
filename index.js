const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));

// In-memory data structure to store user data
let users = [];
// Get all users
app.get('/users', (req, res) => {
  console.log(users)
  res.json(users);
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.filter(user => user.id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
  const params = {
    id: users.length,
    ...req.body
  }
  users.push(params);
  res.status(201).json(params);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(user => user.id === parseInt(userId));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(user => user.id === parseInt(userId));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  res.json(deletedUser);
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app