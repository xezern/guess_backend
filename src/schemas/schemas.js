const { z } = require("zod");

const eColors = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'BLACK', 'WHITE', 'ORANGE', 'PURPLE', 'INDIGO', 'VIOLET'];
const eSize = ['S', 'M', 'L', 'XL', 'XXL'];

// Brand schema validation
const brandSchema = z.object({
    name: z.string().min(1, { message: "Invalid Brand Name" }).optional(),
    slug: z.string().min(1, { message: "Invalid Brand Slug" }).optional()
});

// Add to cart schema validation
const addToCartSchema = z.object({
    productId: z.preprocess((value) => parseInt(value, 10), z.number({ message: "Product ID is required" }).positive({ message: "Product ID must be a positive number" })),
    count: z.number().int().positive({ message: "Count must be a positive integer" }).default(1),
    color: z.enum(eColors).optional(),
    size: z.enum(eSize).optional(),
});

// Category schema validation
const categorySchema = z.object({
    name: z.string().min(1, { message: "Invalid Category Name" }).optional(),
    slug: z.string().min(1, { message: "Invalid Category Slug" }).optional()
});

// Subcategory schema validation
const subcategorySchema = z.object({
    name: z.string().min(1, { message: "Invalid Subcategory Name" }).optional(),
    slug: z.string().min(1, { message: "Invalid Subcategory Slug" }).optional(),
    categoryId: z.preprocess((value) => parseInt(value, 10), z.number().int().positive({ message: "Invalid Category ID for Subcategory" }))
});

// Product schema validation
const productSchema = z.object({
    name: z.string().min(1, { message: "Invalid Product Name" }).optional(),
    description: z.string().min(1, { message: "Invalid Product Description" }).optional(),
    price: z.preprocess((value) => parseFloat(value), z.number().positive({ message: "Invalid Product Price" })),
    discount: z.preprocess((value) => parseInt(value, 10), z.number().int().nonnegative({ message: "Invalid Product Discount" })),
    images: z.array(z.string()).min(1, { message: "Invalid Product Images" }),
    categoryId: z.preprocess((value) => parseInt(value, 10), z.number().int().positive({ message: "Invalid Category ID for Product" })),
    subcategoryId: z.preprocess((value) => value ? parseInt(value, 10) : undefined, z.number().int().optional()),
    brandsId: z.preprocess((value) => parseInt(value, 10), z.number().int().positive({ message: "Invalid Brand ID for Product" })),
    Colors: z.enum(eColors, { message: "Invalid Product Color" }).optional(),
    Size: z.enum(eSize, { message: "Invalid Product Size" }).optional()
});


// User registration schema validation
const registerSchema = z.object({
    username: z.string().min(1, { message: "Invalid Username" }),
    email: z.string().email({ message: "Invalid Email" }),
    user_img: z.array(z.string()).optional(),
    name: z.string().min(1, { message: "Invalid Name" }),
    phone: z.string().min(1, { message: "Invalid Phone Number" }),
    address: z.string().optional(),
    dob: z.string().optional(),
    
    // Gender validation with various options
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'GAY', 'TRANS'], { message: "Invalid Gender" }),
    password: z.string().min(1, { message: "Invalid Password" })
});

// User login schema validation
const loginSchema = z.object({
    username: z.string().min(1, { message: "Invalid Username" }),
    password: z.string().min(1, { message: "Invalid Password" })
});

module.exports = {
    brandSchema,
    categorySchema,
    subcategorySchema,
    loginSchema,
    productSchema,
    registerSchema,
    addToCartSchema,

    eColors,
    eSize
};
