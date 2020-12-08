
const express = require('express');
const app = express();
const SubscriberModel = require('./models/subscribers');

// Your code goes here
app.get('/subscribers', async(req, res) => {
    res.send(await SubscriberModel.find());
});

app.get('/subscribers/names', async(req, res) => {
    const allData = await SubscriberModel.find();
    const requiredData = allData.map(data => {
        return({
            name: data.name,
            subscribedChannel: data.subscribedChannel
        });
    });
    res.send(requiredData);
});

app.get('/subscribers/:id', async(req, res) => {
    const searchId = req.params.id;
    try {
        const reqData = await SubscriberModel.findOne( { _id: searchId });
        if(reqData == null) {
            res.sendStatus(400).send({ message: "Not found" });
        } else {
            res.send(reqData);
        }
    }
    catch(err) {
        res.sendStatus(400).send({ message: err.message });
    }
});


















module.exports = app;
