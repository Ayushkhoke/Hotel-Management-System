const Order=require("../model/Order");
const Menu=require( "../model/Menu");

// PLACE ORDER (user)
exports.placeOrder = async (req, res) => {
  try {
    console.log("hit the order controller ");
    const { items } = req.body;


       if (!items || items.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Order items are required"
  });
}

    let totalAmount = 0;
    for (const item of items) {
      const menu = await Menu.findById(item.menuItem);
      if (!menu) {
        return res.status(400).json({
          success: false,
          message: "Menu item not found"
        });
      }
      totalAmount += menu.price * item.quantity;
    }
 


    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount
    });
   console.log("order data ",order);
    res.status(200).json({
      success: true,
      data:order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET USER ORDERS
// exports.getMyOrders = async (req, res) => {
//   try {
//     // const {orderId}=req.body;
//     const orders = await Order.find();

//     res.status(200).json({
//       success: true,
//       data:orders
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.menuItem")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CANCEL ORDER
// exports.cancelOrder = async (req, res) => {
//   try {
//     const { order_id } = req.body;

//     const order = await Order.findById(order_id);
//     if (!order) {
//       return res.status(400).json({
//         success: false,
//         message: "Order not found"
//       });
//     }

//     if (order.user.toString() !== req.user.id) {
//       return res.status(400).json({
//         success: false,
//         message: "Not authorized"
//       });
//     }

//     order.status = "cancelled";
//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Order cancelled"
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// CANCEL ORDER
exports.cancelOrder = async (req, res) => {
  try {
    const { order_id } = req.body;

    const order = await Order.findOneAndUpdate(
      {
        _id: order_id,
        user: req.user.id
      },
      { status: "cancelled" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or not authorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled",
      data:order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
