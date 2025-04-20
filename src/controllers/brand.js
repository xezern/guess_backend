const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBrand = async (req, res) => {
    try {
        const { name, slug } = req.body; 

        if (!name) {
            res.status(400).json({ error: 'Brand name is required' });
            return;
        }

        const newBrand = await prisma.brands.create({
            data: {
                name, slug
            },
        });

        res.status(201).json({ message: 'Brand created successfully', brand: newBrand });
    } catch (error) {
        console.error("Create brand error:", error);
        res.status(500).json({ error: 'Failed to create brand' });
    }
};

const getBrands = async (req, res) => {
    try {
        const brands = await prisma.brands.findMany();
        res.status(200).json(brands);
    } catch (error) {
        console.error("Get brands error:", error);
        res.status(500).json({ error: 'Failed to fetch brands' });
    }
};

const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await prisma.brands.findUnique({
            where: { id: Number(id) },
        });

        if (!brand) {
            res.status(404).json({ error: 'Brand not found' });
            return;
        }

        res.status(200).json(brand);
    } catch (error) {
        console.error("Get brand by ID error:", error);
        res.status(500).json({ error: 'Failed to fetch brand' });
    }
};

const updateBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug } = req.body;

        const brand = await prisma.brands.findUnique({
            where: { id: +id },
        });

        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        const updatedBrand = await prisma.brands.update({
            where: { id: Number(id) },
            data: { name, slug },
        });

        res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
    } catch (error) {
        console.error("Update brand error:", error);
        res.status(500).json({ error: 'Failed to update brand' });
    }
};

const deleteBrandById = async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await prisma.brands.findUnique({
            where: { id: Number(id) },
        });

        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        await prisma.brands.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error("Delete brand error:", error);
        res.status(500).json({ error: 'Failed to delete brand' });
    }
};

module.exports = { createBrand, getBrands, getBrandById, updateBrandById, deleteBrandById };
