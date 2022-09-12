const AWS = require('aws-sdk');
const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const {v4: uuidv4} = require('uuid')
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../config/config.env')})

// ! NEVER SHARE THE CREDENTIALS.
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION, 
    accessKeyId: process.env.accessKeyId, 
    secretAccessKey: process.env.secretAccessKey
})

const dynamoClient = new DocumentClient()

const getProjects = async () => {
    const params = { TableName: "Projects"}
    try {
        const response = await dynamoClient.scan(params).promise()
        return response
    } catch(exception) {
        throw new Error(expception)
    }
}

const getProjectByID = async (projectID) => {
    const params = {TableName: "Projects", 
        Key: { "ID": projectID } }
    try {
        const response  = await dynamoClient.get(params).promise()
        return response.Item
    }catch(error) {
        throw new Error(error)
    }
}

const deleteProjectByID = async (projectID) => {
    const params = {TableName: "Projects", Key: { "ID": projectID }}
    try {
        const response = await dynamoClient.delete(params).promise()
        return response
    } catch(error) {
        console.log(error)
    }
}


const addOrUpdateProject = async (body) => {
    const {projectName, github, deployedLink, description,
        configuration, tagLine, conceptsUsed, tags, thumbnail, isFeatured} = body
    const featured = isFeatured === undefined ? false : true
    const uuid = uuidv4()
    try {
        const project = {
            ID: uuid,
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
            isFeatured
        }
        const params = {
            TableName: "Projects", 
            Item: project
        }
        return await dynamoClient.put(params).promise().Items
    } catch(expception) {
        const message = "Error uploading the project details to the database"
        throw new Error(message)
    }
}

module.exports = {
    getProjectByID,
    getProjects, 
    addOrUpdateProject, 
    deleteProjectByID
}