

import * as categoryServices from "../services/category.service.js"

import { createCategorySchema,updateCategorySchema } from "../schemas/category.schema.js";


// POST: Create a category
export const createCategory = async (req, res, next) => {
  try {
    // Validate request body with Zod
    const result = createCategorySchema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    // Call service with validated data
    const category = await categoryServices.createCategory(result.data);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// GET: Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryServices.getCategories();

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// GET: Get a single category
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await categoryServices.getCategoryById(id);

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};



export const updateCategory = async (req, res, next) => {
  try {
    const result = updateCategorySchema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    const category = await categoryServices.updateCategory(
      req.params.id,
      result.data,
    );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};



export const deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.deleteCategory(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
