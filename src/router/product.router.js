const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Products = require("../model/product.model");

router.get("/products", async (req, res) => {
    const products = await Products.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: products,
    });
});

router.get("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const product = await Products.findOne({
        where: {
            product_id: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: product,
    });
});

router.post("/products", async (req, res) => {
    const dataProducts = req.body;
    await Products.sync();
    const createProduct = await Products.create({
        product_name: dataProducts.product_name,
        price: dataProducts.price,
        is_stock: dataProducts.is_stock,
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Created Product",
    });
});

router.put("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const dataProducts = req.body;
    const updateProduct = await Products.update(
        {
            product_name: dataProducts.product_name,
            price: dataProducts.price,
            is_stock: dataProducts.is_stock,
        },
        {
            where: {
                product_id: id,
            },
        }
    );
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateProduct,
    });
});

router.delete("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const deleteProduct = await Products.destroy({
        where: {
            product_id: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: deleteProduct,
    });
});

module.exports = router;
