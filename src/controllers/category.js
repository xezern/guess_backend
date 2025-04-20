const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;

        if (!name || !slug) {
            res.status(400).json({ error: 'name and slug is required' });
            return;
        }

        const newCategory = await prisma.category.create({
            data: { name, slug },
        });

        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

const getCategories = async (req, res) => {
    try {
        
        const categories = await prisma.category.findMany(
            {
                include: {
                    Subcategory: true
                }
            }
        );
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

const getCategoriesById = async (req, res) => {
    try {
        const categoryId = parseInt(req.params.id);

        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            include: { Subcategory: true }
        });

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

const editCategoriesById = async (req, res) => {
    try {
        const categoryId = parseInt(req.params.id);
        const { name, slug } = req.body;

        if (!name || !slug) {
            res.status(400).json({ error: 'name and slug is required' });
            return;
        }

        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: { name, slug },
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(500).json({ error: 'Failed to update category' });
        }
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        const categoryId = parseInt(req.params.id);

        await prisma.category.delete({
            where: { id: categoryId },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete category' });
        }
    }
};

const createSubcategory = async (req, res) => {
    try {
        const { name, categoryId, slug } = req.body;

        if (!name || !categoryId) {
            res.status(400).json({ error: 'Name and Category ID are required' });
            return;
        }

        const newSubcategory = await prisma.subcategory.create({
            data: { name, categoryId, slug },
        });

        res.status(201).json(newSubcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create subcategory' });
    }
};

const getSubcategories = async (req, res) => {
    try {
        const subcategories = await prisma.subcategory.findMany();
        res.status(200).json(subcategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
};

const getSubcategoriesById = async (req, res) => {
    try {
        const subcategoryId = parseInt(req.params.id);

        const subcategory = await prisma.subcategory.findUnique({
            where: { id: subcategoryId },
        });

        if (subcategory) {
            res.status(200).json(subcategory);
        } else {
            res.status(404).json({ error: 'Subcategory not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch subcategory' });
    }
};

const editSubcategoriesById = async (req, res) => {
    try {
        const subcategoryId = parseInt(req.params.id);
        const { name, categoryId, slug } = req.body;

        if (!name || !categoryId) {
            res.status(400).json({ error: 'Name and Category ID are required' });
            return;
        }

        const updatedSubcategory = await prisma.subcategory.update({
            where: { id: subcategoryId },
            data: { name, categoryId, slug },
        });

        res.status(200).json(updatedSubcategory);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(404).json({ error: 'Subcategory not found' });
        } else {
            res.status(500).json({ error: 'Failed to update subcategory' });
        }
    }
};

const deleteSubcategoryById = async (req, res) => {
    try {
        const subcategoryId = parseInt(req.params.id);

        await prisma.subcategory.delete({
            where: { id: subcategoryId },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(404).json({ error: 'Subcategory not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete subcategory' });
        }
    }
};

const updateSubcategory = async (req, res) => {
    try {
        const subcategoryId = parseInt(req.params.id);
        const { name, categoryId, slug } = req.body;

        if (!name || !categoryId) {
            res.status(400).json({ error: 'Name and Category ID are required' });
            return;
        }

        const updatedSubcategory = await prisma.subcategory.update({
            where: { id: subcategoryId },
            data: {
                name,
                categoryId: parseInt(categoryId),
                slug
            },
        });
        res.status(200).json(updatedSubcategory);

    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(404).json({ error: 'Subcategory not found' });
        } else {
            res.status(500).json({ error: 'Failed to update subcategory' });
        }
    }
};

const deleteSubcategory = async (req, res) => {
    try {
        const subcategoryId = parseInt(req.params.id);

        const result = await prisma.subcategory.delete({
            where: { id: subcategoryId },
        });

        res.status(204).send(result);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(404).json({ error: 'Subcategory not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete subcategory' });
        }
    }
};


module.exports = {
    createSubcategory,
    createCategory,
    getCategories,
    editCategoriesById,
    getCategoriesById,
    deleteCategoryById,
    editSubcategoriesById,
    getSubcategories,
    deleteSubcategoryById,
    updateSubcategory,
    deleteSubcategory,
    getSubcategoriesById

}