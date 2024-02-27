import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const getAllProperties = async (req, res) => {};
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