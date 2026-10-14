
import Category from "../models/category.model.js";
import { AppError } from "../utils/appError.js";

export const createCategory = async (data) => {
  // Check if the parent category exists
  if (data.parent) {
    const parent = await Category.findById(data.parent);

    if (!parent) {
      throw new AppError("Parent category not found", 404);
    }
  }

  // Generate a slug from the category name
  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Save category in the database
  const category = await Category.create({
    ...data,
    slug,
  });

  return category;
};

export const getCategories = async () => {
  return await Category.find()
    .populate("parent", "name slug")
    .sort({ name: 1 });
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id)
    .populate("parent", "name slug");

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};



export const updateCategory = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  // Check the parent if one was provided
  if (data.parent) {
    const parent = await Category.findById(data.parent);

    if (!parent) {
      throw new AppError("Parent category not found", 404);
    }

    if (parent._id.equals(category._id)) {
      throw new AppError(
        "A category cannot be its own parent",
        400,
      );
    }
  }

  // Update only the fields sent by the client
  Object.assign(category, data);

  // Update slug if the name changes
  if (data.name) {
    category.slug = data.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  await category.save();

  return category;
};




export const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  // Don't delete a category that has child categories
  const hasChildren = await Category.exists({
    parent: category._id,
  });

  if (hasChildren) {
    throw new AppError(
      "Cannot delete a category that has child categories",
      409,
    );
  }

  await category.deleteOne();

  return { message: "Category deleted successfully" };
};
