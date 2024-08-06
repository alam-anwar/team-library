import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";  // Add this import
import records from "./routes/record.js";
import items from "./routes/item.js";
import users from "./routes/user.js";
import events from "./routes/event.js";
import findOneUser from './routes/record.js';
import bcrypt from 'bcryptjs';


const app = express();

app.use(cors());
app.use(express.json());

// Existing routes
app.use("/item", items.router);
app.use("/user", users.router);
app.use("/event", events.router);
app.use("/record", records.router);

/*/ Middleware to protect routes
const authenticateUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await findOneUser({ username });
        if (!user) return res.status(401).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid password");

        req.user = user; // Attach user to request object
        next();
    } catch (err) {
        res.status(500).send("Error during authentication");
    }
};
*/

// User login and authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await records.findOneUser({username});
        if (!user) return res.status(401).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid password");
        
        res.status(200).json({ loginSuccess: true, user });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error during login");
    }
});

// Register new user
app.post('/register', async (req, res) => {
    try {
        const { username, password, name, email, permission } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword, name, email, permission };
        const result = await users.addOneUser(newUser);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send("Error during registration");
    }
});

// Homepage: Return all items and events
app.get('/homepage', async (req, res) => {
    try {
        const itemsList = await records.findAllItems();
        const eventsList = await records.findAllEvents();
        res.status(200).json({ items: itemsList, events: eventsList });
    } catch (err) {
        console.error("Error fetching homepage data:", err);
        res.status(500).send("Error fetching homepage data");
    }
});

// Checkout: Assuming this handles checkout functionality
app.post('/checkout', async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Log the received IDs
        console.log("Received userId:", userId);
        console.log("Received itemId:", itemId);

        // Fetch user and item from the database
        const user = await records.findOneUser({ _id: new ObjectId(userId) });
        const item = await records.findOneItem({ _id: new ObjectId(itemId) });

        // Log the fetched user and item
        console.log("Fetched user:", user);
        console.log("Fetched item:", item);

        // Check if user or item is not found
        if (!user) {
            console.error("User not found:", userId);
            return res.status(404).send("User not found");
        }

        if (!item) {
            console.error("Item not found:", itemId);
            return res.status(404).send("Item not found");
        }

        // Update user and item data
        user.checked_out.push(itemId);
        item.copyNum -= 1;
        item.check_out_history.push(userId);

        // Log updated data
        console.log("Updated user data:", user);
        console.log("Updated item data:", item);

        // Update the database
        const updateUserResult = await records.updateUser({ _id: new ObjectId(userId) }, { $set: user });
        const updateItemResult = await records.updateItem({ _id: new ObjectId(itemId) }, { $set: item });

        // Log the results of the database update
        console.log("Update user result:", updateUserResult);
        console.log("Update item result:", updateItemResult);

        res.status(200).send("Checkout successful");
    } catch (err) {
        console.error("Error during checkout:", err);
        res.status(500).send("Error during checkout");
    }
});

// Profile: Fetch user's data
app.get('/profile/:id', async (req, res) => {
    try {
        const user = await records.findOneUser({ _id: new ObjectId(req.params.id) });
        if (!user) return res.status(404).send("User not found");

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send("Error fetching profile data");
    }
});

// Search Inventory
app.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const itemsList = await records.findAllItems();
        const filteredItems = itemsList.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        res.status(200).send(filteredItems);
    } catch (err) {
        res.status(500).send("Error during search");
    }
});

// Create Item
app.post('/create', async (req, res) => {
    try {
        const newItem = req.body;
        const result = await records.addOneItem(newItem);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send("Error creating item");
    }
});

// Member Checked Out Items
app.get('/member/checkedout/:id', async (req, res) => {
    try {
        const user = await records.findOneUser({ _id: new ObjectId(req.params.id) });
        if (!user) return res.status(404).send("User not found");

        const checkedOutItems = await Promise.all(
            user.checked_out.map(itemId => records.findOneItem({ _id: new ObjectId(itemId) }))
        );

        res.status(200).send(checkedOutItems);
    } catch (err) {
        res.status(500).send("Error fetching checked out items");
    }
});

// Member Events Page
app.get('/member/eventspage', async (req, res) => {
    try {
        const eventsList = await records.findAllEvents();
        res.status(200).send(eventsList);
    } catch (err) {
        res.status(500).send("Error fetching member events");
    }
});

// Process Returns
app.post('/processreturn', async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await records.findOneUser({ _id: new ObjectId(userId) });
        const item = await records.findOneItem({ _id: new ObjectId(itemId) });

        if (!user || !item) {
            return res.status(404).send("User or Item not found");
        }

        user.checked_out = user.checked_out.filter(id => id !== itemId);
        item.copyNum += 1;

        await records.updateUser({ _id: new ObjectId(userId) }, { $set: user });
        await records.updateItem({ _id: new ObjectId(itemId) }, { $set: item });

        res.status(200).send("Return processed successfully");
    } catch (err) {
        res.status(500).send("Error processing return");
    }
});

// Create Member (Admin only)
app.post('/createmember', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await records.addOneUser(newUser);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send("Error creating member");
    }
});

// Employee Calendar (example implementation)
app.get('/employee/calendar', async (req, res) => {
    try {
        const calendarEvents = await records.findAllEvents(); // Modify this based on your calendar data structure
        res.status(200).json(calendarEvents);
    } catch (err) {
        res.status(500).send("Error fetching calendar events");
    }
});


// Admin Delete Account
app.delete('/admin/deleteaccount', async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await records.removeUser({ _id: new ObjectId(userId) });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error deleting account");
    }
});

// Admin Calendar (example implementation)
app.get('/admin/calendar', async (req, res) => {
    try {
        const calendarEvents = await records.findAllEvents(); // Replace 'records' with the actual model/method you use to fetch events
        res.status(200).json(calendarEvents);
    } catch (err) {
        res.status(500).send("Error fetching admin calendar events");
    }
});

// Modify Inventory
app.patch('/modifyinventory', async (req, res) => {
    try {
        const { itemId, updates } = req.body;
        const result = await records.updateItem({ _id: new ObjectId(itemId) }, { $set: updates });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error modifying inventory");
    }
});

// Update Item by ID
app.get('/updateitem/:id', async (req, res) => {
    try {
        const result = await records.findOneItem({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).send("Item not found");
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error fetching item");
    }
});

// Update Event by ID
app.get('/updateevent', async (req, res) => {
    try {
        const result = await records.findOneEvent({ _id: new ObjectId(req.query.id) });
        if (!result) return res.status(404).send("Event not found");
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error fetching event");
    }
});

/************************** USER AUTHENTIFICATION **************************
router.post('/compare-password', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const currUser = await user.findOne({ username });
      if (!currUser) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, currUser.password);
      if (isMatch) {
        return res.status(200).json({ msg: 'Password matches' });
      } else {
        return res.status(400).json({ msg: 'Password does not match' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});
/************************** USER AUTHENTIFICATION **************************/

// Start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;
