import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import records from "./routes/record.js";
import items from "./routes/item.js";
import users from "./routes/user.js";
import events from "./routes/event.js";

const app = express();

app.use(cors());
app.use(express.json());

// Existing routes
app.use("/item", items.router);
app.use("/user", users.router);
app.use("/event", events.router);
app.use("/record", records.router);

// Middleware to protect routes
const authenticateUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await users.findOneUser({ username });
        if (!user) return res.status(401).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid password");

        req.user = user; // Attach user to request object
        next();
    } catch (err) {
        res.status(500).send("Error during authentication");
    }
};

// User login and authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await users.findOneUser({ username });
        if (!user) return res.status(401).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid password");

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
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

// Homepage (Return all items and events as a starting point)
app.get('/homepage', async (req, res) => {
    try {
        const itemsList = await items.findAllItems();
        const eventsList = await events.findAllEvents();
        res.status(200).json({ items: itemsList, events: eventsList });
    } catch (err) {
        res.status(500).send("Error fetching homepage data");
    }
});

// Checkout (Mock, assumes items are checked out)
app.post('/checkout', async (req, res) => {
    try {
        // Checkout login here
        res.status(200).send("Checkout successful");
    } catch (err) {
        res.status(500).send("Error during checkout");
    }
});

// Search Inventory
app.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const itemsList = await items.findAllItems(); // Adjust with actual search logic?
        const filteredItems = itemsList.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        res.status(200).send(filteredItems);
    } catch (err) {
        res.status(500).send("Error during search");
    }
});

// Checked Out Items for a Member (Mock)
app.get('/member/checkedout', authenticateUser, async (req, res) => {
    try {
        // Need logic to return checked out items for the authenticated user
        res.status(200).send("Checked out items data");
    } catch (err) {
        res.status(500).send("Error fetching checked out items");
    }
});

// Member Events Page
app.get('/member/eventspage', async (req, res) => {
    try {
        const eventsList = await events.findAllEvents();
        res.status(200).send(eventsList);
    } catch (err) {
        res.status(500).send("Error fetching member events");
    }
});

// Process Returns (Mock)
app.post('/processreturn', authenticateUser, async (req, res) => {
    try {
        // Need return processing logic here
        res.status(200).send("Return processed successfully");
    } catch (err) {
        res.status(500).send("Error during return processing");
    }
});

// Create Member (Admin only, protected)
app.post('/createmember', authenticateUser, async (req, res) => {
    try {
        if (req.user.permission !== "admin") return res.status(403).send("Forbidden");

        const newUser = req.body;
        const result = await users.addOneUser(newUser);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send("Error creating member");
    }
});

// Employee Calendar (Mock)
app.get('/employee/calendar', authenticateUser, async (req, res) => {
    try {
        // Logic for returning employee calendar data needed
        res.status(200).send("Employee calendar data");
    } catch (err) {
        res.status(500).send("Error fetching employee calendar");
    }
});

// Admin Delete Account (Protected)
app.delete('/admin/deleteaccount', authenticateUser, async (req, res) => {
    try {
        if (req.user.permission !== "admin") return res.status(403).send("Forbidden");

        const { userId } = req.body;
        const result = await users.removeUser({ _id: userId });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error deleting account");
    }
});

// Admin Calendar (Mock)
app.get('/admin/calendar', authenticateUser, async (req, res) => {
    try {
        // Logic for returning admin calendar data needed
        res.status(200).send("Admin calendar data");
    } catch (err) {
        res.status(500).send("Error fetching admin calendar");
    }
});

// Modify Inventory (Protected)
app.patch('/modifyinventory', authenticateUser, async (req, res) => {
    try {
        if (req.user.permission !== "admin") return res.status(403).send("Forbidden");

        const { itemId, updates } = req.body;
        const result = await items.updateItem({ _id: itemId }, { $set: updates });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error modifying inventory");
    }
});

// Update Item by ID
app.get('/updateitem/:id', async (req, res) => {
    try {
        const result = await items.findOneItem({ _id: req.params.id });
        if (!result) return res.status(404).send("Item not found");
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error fetching item");
    }
});

// Update Event by ID
app.get('/updateevent', async (req, res) => {
    try {
        const result = await events.findOneEvent({ _id: req.query.id });
        if (!result) return res.status(404).send("Event not found");
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error fetching event");
    }
});

// Start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;
