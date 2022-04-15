const Razorpay = require('razorpay');

const instance = new Razorpay({ 
    key_id: process.env.key_id, 
    key_secret: process.env.key_secret 
});


exports.getOrderList = async(req,res) =>{
    try {
        let allOrders = await instance.orders.all(option);
        res.send({
            status: 200,
            message: "all Order",
            data: allOrders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error || "Internal Server Error",
        });
    }

}