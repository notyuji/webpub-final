const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

let products = [];
fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading products.json:', err);
    return;
  }
  products = JSON.parse(data);
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'order.html'));
});
app.get('/messages', (req, res) => {
  res.sendFile(path.join(__dirname, 'messages.html'));
});
app.get('/customers', (req, res) => {
  res.sendFile(path.join(__dirname, 'customers.html'));
});
app.get('/social-media', (req, res) => {
    res.sendFile(path.join(__dirname, '/marketing/social_media.html'));
  });
  app.get('/email', (req, res) => {
    res.sendFile(path.join(__dirname, '/marketing/email.html'));
  });
app.post('/api/register', (req, res) => {
  const newCustomer = req.body;
  const filePath = path.join(__dirname, 'data', 'customers.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ message: 'Error reading customers file' });
      }

      let customers;

      try {
          customers = JSON.parse(data);
      } catch (parseError) {
          console.warn('Failed to parse JSON:', parseError);
          customers = [];
      }

      newCustomer.registrationDate = new Date().toISOString();
      customers.push(newCustomer);

      fs.writeFile(filePath, JSON.stringify(customers, null, 2), (err) => {
          if (err) {
              return res.status(500).json({ message: 'Error saving customer' });
          }
          res.json({ message: 'Customer registered successfully' });
      });
  });
});

app.get('/api/customers', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'customers.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ message: 'Error reading customers file' });
      }

      let customers;

      try {
          customers = JSON.parse(data);
      } catch (parseError) {
          console.warn('Failed to parse JSON:', parseError);
          customers = [];
      }

      res.json(customers);
  });
});
app.delete('/api/customers/:index', (req, res) => {
  const customerIndex = parseInt(req.params.index, 10);
  const filePath = path.join(__dirname, 'data', 'customers.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ message: 'Error reading customers file' });
      }

      let customers;

      try {
          customers = JSON.parse(data);
      } catch (parseError) {
          console.warn('Failed to parse JSON:', parseError);
          return res.status(500).json({ message: 'Error parsing customers data' });
      }

      if (customerIndex < 0 || customerIndex >= customers.length) {
          return res.status(404).json({ message: 'Customer not found' });
      }

      customers.splice(customerIndex, 1);

      fs.writeFile(filePath, JSON.stringify(customers, null, 2), (writeErr) => {
          if (writeErr) {
              return res.status(500).json({ message: 'Error updating customers file' });
          }
          res.json({ message: 'Customer deleted successfully' });
      });
  });
});

app.post('/api/contact', (req, res) => {
  const newMessage = {
      name: req.body.name,
      email: req.body.email,
      platform: req.body.platform,
      message: req.body.message,
      date: new Date()
  };

  const filePath = path.join(__dirname, 'data', 'messages.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ message: 'Error saving message' });
      }

      let messages;

      try {
          messages = JSON.parse(data);
          if (!Array.isArray(messages)) {
              throw new Error('Data is not an array');
          }
      } catch (parseError) {
          console.warn('Failed to parse JSON, initializing an empty array:', parseError);
          messages = [];
      }

      messages.push(newMessage);

      fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
          if (err) {
              console.error('Error writing file:', err);
              return res.status(500).json({ message: 'Error saving message' });
          }

          res.json({ message: 'Message saved successfully' });
      });
  });
});

app.get('/api/messages', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'messages.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ message: 'Error retrieving messages' });
      }

      let messages;

      try {
          messages = JSON.parse(data);
          if (!Array.isArray(messages)) {
              throw new Error('Data is not an array');
          }
      } catch (parseError) {
          console.warn('Failed to parse JSON, sending an empty array:', parseError);
          messages = [];
      }

      res.json(messages);
  });
});

app.delete('/api/messages/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const filePath = path.join(__dirname, 'data', 'messages.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ message: 'Error deleting message' });
      }

      let messages;

      try {
          messages = JSON.parse(data);
          if (!Array.isArray(messages)) {
              throw new Error('Data is not an array');
          }
      } catch (parseError) {
          console.warn('Failed to parse JSON, sending an empty array:', parseError);
          messages = [];
      }

      if (index < 0 || index >= messages.length) {
          return res.status(400).json({ message: 'Invalid index' });
      }

      messages.splice(index, 1);

      fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
          if (err) {
              console.error('Error writing file:', err);
              return res.status(500).json({ message: 'Error deleting message' });
          }

          res.json({ message: 'Message deleted successfully' });
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
