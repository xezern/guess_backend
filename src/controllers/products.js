const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const createProduct = async (req, res) => {
    const validSizes = ["L", "M", "S", "XL", "XXL"]
    const validColors = ["RED", "GREEN", "BLUE", "YELLOW", "BLACK", "WHITE", "ORANGE", "PURPLE", "INDIGO", "VIOLET"]



    try {

        // Enum uyğunluğu yoxlaması
        if (!Array.isArray(req.body.colors) || !req.body.colors.every(color => validColors.includes(color))) {
            return res.status(400).json({
                message: "Yanlış rəng dəyəri daxil edilib",
                allowedColors: validColors
            });
        }

        if (!Array.isArray(req.body.size) || !req.body.size.every(size => validSizes.includes(size))) {
            return res.status(400).json({
                message: "Yanlış ölçü dəyəri daxil edilib",
                allowedSizes: validSizes
            });
        }

        console.log(req.body)
        const newProduct = await prisma.product.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                discount: parseInt(req.body.discount, 10),
                images: req.body.images,
                categoryId: parseInt(req.body.categoryId, 10),
                subcategoryId: req.body.subcategoryId ? parseInt(req.body.subcategoryId, 10) : null,
                brandsId: parseInt(req.body.brandsId, 10),
                colors: req.body.colors,
                size: req.body.size,
            },
        });
        res.status(201).json({ message: "Succses", newProduct });
    } catch (error) {
        console.error(error);
        if (error.code == "P2003") {
            if (error.meta.field_name == "Product_brandsId_fkey (index)") return res.status(400).json({ message: "Bad request", error: "Daxil edilen id uzre brand yoxdur" });
            if (error.meta.field_name == "Product_categoryId_fkey (index)") return res.status(400).json({ message: "Bad request", error: "Daxil edilen id uzre category yoxdur" });
            if (error.meta.field_name == "Product_subcategoryId_fkey (index)") return res.status(400).json({ message: "Bad request", error: "Daxil edilen id uzre subcategory yoxdur" });

            return res.status(400).json({ message: "Bad request", error: "Daxil edilen id-lərdə yanlisliq var" });
        }
        res.status(500).json({ error: 'Failed to create product', mesaj: error });
    }
};

const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'price', sortOrder = 'asc', categoryId, subcategoryId, brandId, color, size, minPrice, maxPrice, discount } = req.query;

        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;

        const orderBy = {
            [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc'
        };

        const where = {};

        if (categoryId) where.categoryId = parseInt(categoryId, 10);
        if (subcategoryId) where.subcategoryId = parseInt(subcategoryId, 10);
        if (brandId) where.brandsId = parseInt(brandId, 10);

        if (color) {
            constcolorsArray = color.split(',').map(c => c.trim().toUpperCase());
            where.Colors = { hasSome: colorsArray };
        }

        if (size) {
            const sizeArray = size.split(',').map(s => s.trim().toUpperCase());
            where.Size = { hasSome: sizeArray };
        }

        if (minPrice && maxPrice) where.price = { gte: parseFloat(minPrice), lte: parseFloat(maxPrice) };
        else if (minPrice) where.price = { gte: parseFloat(minPrice) };
        else if (maxPrice) where.price = { lte: parseFloat(maxPrice) };

        if (discount === 'true') where.discount = { gt: 0 };
        else if (discount === 'false') where.discount = 0;

        const products = await prisma.product.findMany({
            where,
            orderBy,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            include: {
                category: true,
                subcategory: true,
                brands: true,
            }
        });

        const totalProducts = await prisma.product.count({ where });

        res.status(200).json({
            data: products,
            meta: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / pageSize),
                currentPage: pageNumber,
                pageSize
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                category: true,
                subcategory: true,
                brands: true,
            }
        });
        if (product) res.status(200).json(product);
        else res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const silinen = await prisma.product.delete({
            where: { id: Number(req.params.id) }
        });
        return res.status(203).json({
            message: "Melsul silindi!", silinen
        });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
};

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { category: { name: { contains: query, mode: 'insensitive' } } },
                    { subcategory: { name: { contains: query, mode: 'insensitive' } } }
                ]
            },
            include: {
                category: true,
                subcategory: true,
                brands: true,
            }
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search products' });
    }
};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const updatedProduct = await prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                price: +req.body.price,
                discount: +req.body.discount,
                images: req.body.images,
                category: {
                    connect: { id: req.body.categoryId }
                },
                subcategory: {
                    connect: { id: req.body.subcategoryId }
                },
                brands: {
                    connect: { id: req.body.brandsId }
                },
                colors: {
                    set: req.body.colors
                },
                size: {
                    set: req.body.size
                },
            }
        });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }

};

const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = Number(req.params.categoryId);

        if (isNaN(categoryId)) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }

        const products = await prisma.product.findMany({
            where: {
                categoryId: categoryId
            },
            include: {
                category: true,
                subcategory: true,
                brands: true,
                colors: true,
                size: true,
                User: true
            }
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products by category' });
    }
};

const getProductsBySubcategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const products = await prisma.product.findMany({
            where: {
                subcategoryId: Number(subcategoryId),
            },
            include: {
                category: true,
                subcategory: true,
                brands: true,
                colors: true,
                size: true,
                User: true
            },
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this subcategory' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByCategory,
    getProductsBySubcategory,
    deleteProductById,
    searchProduct,
    editProduct
};
