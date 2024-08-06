import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";  // Add this import
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

// New routes matching main.jsx paths

// Handle user login (Assuming frontend handles actual auth)
app.post('/login', (req, res) => {
    res.status(200).send("Login handled on the frontend");
});

// Handle user registration (Assuming frontend handles actual auth)
app.post('/register', (req, res) => {
    res.status(200).send("Registration handled on the frontend");
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

// Checkout Processing
app.post('/checkoutprocessing', async (req, res) => {
    try {
        const { userId, itemIds } = req.body;
        const user = await records.findOneUser({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const items = await Promise.all(itemIds.map(itemId => records.findOneItem({ _id: new ObjectId(itemId) })));

        if (items.some(item => !item)) {
            return res.status(404).send("One or more items not found");
        }

        user.checked_out.push(...itemIds);
        await records.updateUser({ _id: new ObjectId(userId) }, { $set: user });

        for (const item of items) {
            item.copyNum -= 1;
            item.check_out_history.push(userId);
            await records.updateItem({ _id: new ObjectId(item._id) }, { $set: item });
        }

        res.status(200).send("Checkout processing successful");
    } catch (err) {
        res.status(500).send("Error during checkout processing");
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

//RSVP to an Event
app.post('/rsvp', async (req, res) => {
    try {
        const { userId, eventId } = req.body;
        const user = await records.findOneUser({ _id: new ObjectId(userId) });
        const event = await records.findOneEvent({ _id: new ObjectId(eventId) });

        if (!user || !event) {
            return res.status(404).send("User or Event not found");
        }

        event.attendees.push(userId);
        await records.updateEvent({ _id: new ObjectId(eventId) }, { $set: event });

        res.status(200).send("RSVP successful");
    } catch (err) {
        res.status(500).send("Error during RSVP");
    }
});

// Start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;
