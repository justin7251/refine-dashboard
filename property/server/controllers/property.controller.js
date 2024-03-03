import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const getAllProperties = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        propertyType = "",
    } = req.query;

    const query = {};

    if (propertyType !== "") {
        query.propertyType = propertyType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await Property.countDocuments({ query });

        const properties = await Property.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getPropertyDetail = async (req, res) => {};
const createProperty = async (req, res) => {};
const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};

export {
    getAllProperties,
    getPropertyDetail,
    createProperty,
    updateProperty,
    deleteProperty,
};