const Client = require('../../models/orders/client')
const Order = require('../../models/orders/order')

var fs = require('fs');
const mongoose = require('mongoose')
const crypto = require('crypto');
const asyncHandler = require("express-async-handler");

module.exports = class Order {
    static getAllClients = async (req, res) => {
        try {
            const client = await Client.find()
            res.status(200).json(client)
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
    static fetchClientId = asyncHandler(async (req, res) => {
        const id = req.params.id
        // hashing incoming client id
        const hashed_id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(id).digest('hex').substring(0, 24))
        // console.log(hashed_id);

        try {


            const client = await Client.findById(hashed_id)
            res.status(200).json(client)
        } catch (error) {
            res.status(404).json({ message: error.message })
            console.log(error.message);
        }
    })
    static async updateClient(req, res) {
        const id = req.params.id
        const hashed_id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(id).digest('hex').substring(0, 24))

        let newClient = req.body
        try {
            await Client.findByIdAndUpdate(hashed_id, newClient)
            res.status(200).json({ message: 'updated successfully lin' })
        } catch (error) {
            res.status(404).json({ message: error.message })
            console.log(error);
        }
    }
    static async deleteClient(req, res) {
        const id = req.params.id;
        try {
            const result = await Client.findByIdAndDelete(id)

            res.status(200).json({ message: 'deleted successfully', result })
        } catch (err) {
            res.status(404).json({ message: err })
        }
    }
    static createClient = asyncHandler(async (req, res) => {
        const clientData = req.body;

        try {
            console.log(req.body);
            console.log(Client);

            // set the value of the _id field to the value of the clientId field
            clientData._id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(clientData.clientId).digest('hex').substring(0, 24))
            console.log(clientData._id);

            await Client.create(clientData);
            res.status(201).json({ clientData });
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(error.message)
        }
    });
    static createOrderedProducts = asyncHandler(async (req, res) => {
        const client_id = req.body.parent_id
        const orders = req.body
        const hashed_id = crypto.createHash('md5').update(client_id).digest('hex').substring(0, 24)
        try {
            // find day by id and add product to sold products
            await Client.findByIdAndUpdate(
                hashed_id,
                { $push: { orders: orders } },
                { new: true }
            );
            console.log(orders);
            res.status(201).json({ orders })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
    static createReturnProducts = asyncHandler(async (req, res) => {
        const client_id = req.body.parent_id
        const returns = req.body
        const hashed_id = crypto.createHash('md5').update(client_id).digest('hex').substring(0, 24)
        try {
            // find day by id and add product to return products
            await Client.findByIdAndUpdate(
                hashed_id,
                { $push: { returns: returns } },
                { new: true }
            );
            console.log(returns);
            res.status(201).json({ message: 'ordered product created', returns })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })

    static updateOrderQuantity = asyncHandler(async (req, res) => {
        const { clientId, status, orderId, newQuantity, newTotalPrice } = req.body;
        const hashed_id = new mongoose.Types.ObjectId(crypto.createHash('md5').update(clientId).digest('hex').substring(0, 24))

        console.log(req.body, 'rq boy');
        try {
            const client = await Client.findById(hashed_id);

            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            const order = client.orders.id(orderId);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            client.total_order_price = newTotalPrice
            order.quantity = newQuantity;
            client.status = status
            await client.save();

            res.status(200).json({ message: 'Order quantity updated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });




}