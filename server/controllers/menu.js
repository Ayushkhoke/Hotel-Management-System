
const Menu=require('../model/Menu.js')
// CREATE MENU (admin)


exports.createMenu = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // image from multer
    const image = req.file?.path;

    if (!name || !price || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const alreadyExist = await Menu.findOne({ name });
    if (alreadyExist) {
      return res.status(400).json({
        success: false,
        message: "Food item already exists in menu",
      });
    }

    const menu = await Menu.create({
      name,
      price,
      description,
      image,              // saved from req.file
      orderby: req.user.id,
      date: new Date(),
    });

    res.status(200).json({
      success: true,
      menu,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL MENUS (public)
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find(); // ✅ get ALL menus

    res.status(200).json({
      success: true,
      menus, // always [] or data, never null
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE MENU (admin)
exports.deleteMenu = async (req, res) => {
  try {
    const { menuId } = req.body;

    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
