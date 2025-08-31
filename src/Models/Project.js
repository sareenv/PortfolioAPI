import { Sequelize } from "sequelize";
import sequelize from "../database.js"

const Project = (sequelize) => {
    return sequelize.define("Project", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        projectName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tagLine: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        github: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        featured: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false,
        },
        conceptsUsed: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false,
        }, 
        images: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        configuration: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false,
        },
        video: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
}

const ProjectModel = Project(sequelize);
await sequelize.sync();
export { ProjectModel };