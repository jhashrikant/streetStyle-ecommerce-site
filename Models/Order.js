const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        Products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, required: true },
            },
        ],

        address: { type: String, required: true },
        total: { type: Number, required: true },
        Orderstatus: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

mongoose.models = {}
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
