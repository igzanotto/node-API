const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "enter a product name"]

        },
        quantity: {
            type: String,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "enter a price"]

        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product