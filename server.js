const express = require("express");
const cors = require("cors");

const app = express();

const HOST = "127.0.0.1";
const PORT = 3000;

const orders = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server يعمل");
});

app.post("/orders", (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({
            success: false,
            message: "Email and code are required"
        });
    }

    const order = {
        id: orders.length + 1,
        email: email,
        code: code,
        date: new Date().toLocaleString()
    };

    orders.push(order);

    console.log("New order:", order);

    res.status(201).json({
        success: true,
        message: "Order saved",
        order: order
    });
});

app.get("/orders", (req, res) => {
    res.json(orders);
});

app.delete("/orders/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = orders.findIndex(order => order.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    orders.splice(index, 1);

    res.json({
        success: true,
        message: "Order deleted"
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Server يعمل على http://${HOST}:${PORT}`);
});