//sk_test_51NltvWKJmiKIX4GA4uFNQmFazLijOGOvfBcmX1WiR85DAHuvSuMhBZFMtDioMzjZChfeP7BvPgOhmULIZZIVkEJE00RSlHwRwQ
//Watch: price_1NlucRKJmiKIX4GAzWLZgdhv
//Sunglasses: price_1NlueiKJmiKIX4GAgQhDtCDU
//Camera: price_1NlufVKJmiKIX4GA9rEAYgPM

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51NltvWKJmiKIX4GA4uFNQmFazLijOGOvfBcmX1WiR85DAHuvSuMhBZFMtDioMzjZChfeP7BvPgOhmULIZZIVkEJE00RSlHwRwQ');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//stripe server request
app.post("/checkout", async(req, res) => {
    /*
        req.body.items
        [
            {
                id: 1,
                quantity: 3
            }
        ]

        stripe wants
        [
            {
                price: 1,
                quantity: 3
            }
        ]
    */

    const items = req.body.items;       //from client
    const lineItems = [];     //for stripe
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }))
})

app.listen(4000, () => console.log("Listening on port 4000!"));