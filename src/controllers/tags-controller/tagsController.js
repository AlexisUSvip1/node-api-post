// src/controllers/tag.controller.js
import { Tag } from "../../models/tags-models/tags.schema.js";

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return res.status(500).json({ message: "Error fetching tags", error });
  }
};

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const newTag = new Tag({ name });
    const savedTag = await newTag.save();

    return res.status(201).json(savedTag);
  } catch (error) {
    console.error("Error inserting tag:", error);
    return res.status(500).json({ message: "Error inserting tag", error });
  }
};
