const productModel = require("../models/product")
const categoryModel = require("../models/category")
async function createProduct(req, res, next) {
    const { category } = req.body
    try {
        const categoriExists = await categoryModel.findOne({ _id: category })


        if (!categoriExists) {
            return res.status(400).json({ message: "không tìm thấy danh mục" })
        }

        const created = await productModel.create(req.body)
        return res.json({ message: "tạo sản phẩm thành công", data: created })
    }
    catch (err) {
        return res.json({ message: "tạo sản phẩm thất bại", error: err})
    }

}

async function getAllProduct(req, res, next) {
    const product = await productModel.find().populate('category')
    return res.json({ data: product })
}


module.exports = {
    createProduct,
    getAllProduct 
}