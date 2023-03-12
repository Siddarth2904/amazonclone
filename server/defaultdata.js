const Products = require("./models/productsSchema")
const productsdata = require("./constant/productsdata");
const { connect } = require("mongoose");

const DefaultData = async () => {
    try {

        await Products.deleteMany({ status: "inactive" },
            { writeConcern: { w: "majority", wtimeout: 60000 } })

        const storeData = await Products.insertMany(productsdata)
        // console.log(storeData)
    } catch (error) {
        console.log('error' + error.message)
    }
};

module.exports = DefaultData;
