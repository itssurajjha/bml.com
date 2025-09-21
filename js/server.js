const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Save quote form
app.post('/save-quote', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'bml.com', 'user_data', 'quote_submissions.json');

  // Ensure folder exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Append data
  let existing = [];
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath));
  }
  existing.push(data);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.json({ message: 'Quote saved successfully!' });
});

// Save contact form
app.post('/save-contact', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'bml.com', 'user_data', 'contact_submissions.json');

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  let existing = [];
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath));
  }
  existing.push(data);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.json({ message: 'Contact saved successfully!' });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
