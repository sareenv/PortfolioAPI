

import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { ProjectModel } from './Models/Project.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

const getProjects = async () => {
    try {
        const projects = await ProjectModel.findAll();
        return projects;
    } catch (error) {
        throw new Error(error);
    }
};

const getProjectByID = async (projectID) => {
    try {
        const project = await ProjectModel.findByPk(projectID);
        return project;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteProjectByID = async (projectID) => {
    try {
        const response = await ProjectModel.destroy({ where: { id: projectID } });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const addOrUpdateProject = async (body) => {
    const {
        projectName,
        github,
        deployedLink,
        description,
        configuration = [],
        tagLine,
        conceptsUsed = [],
        tags = [],
        thumbnail,
        isFeatured,
        images = [],
        video
    } = body;
    const featured = isFeatured === undefined ? false : isFeatured;
    const uuid = uuidv4();

    try {
        const project = await ProjectModel.create({
            id: uuid,
            description,
            featured,
            projectName,
            thumbnail,
            github,
            configuration,
            tagLine,
            deployedLink,
            conceptsUsed,
            tags,
            images,
            video
        });
        return project;
    } catch (error) {
        const message = "Error uploading the project details to the database";
        throw new Error(message);
    }
};

export { getProjectByID, getProjects, addOrUpdateProject, deleteProjectByID };