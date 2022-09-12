const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./dynamo')
const { response } = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/api/v1/projects', async (_request, response) => {
    try {
        const content = await db.getProjects()
        response.send(content) 
    } catch(error) {
        response.status(400).send({error})
    }
})
    

app.get('/api/v1/project/:pid', async(request, response) => {
    const id = request.params.pid
    try {
        const content = await db.getProjectByID(id)
        response.send({content})
    } catch(error) {
        response.status(400).send(error)
    }
})

app.post('/api/v1/registerProjects', async (request, response) => {
    try {
        const body = request.body
        await db.addOrUpdateProject(body)
        response.status(201).send({message: "Project is registered", status: "201"})
    } catch (error) {
        response.status(400).send({error})
    }
})

app.delete("/api/v1/deleteProject/:pid", async(request, response) => {
    try {
        const projectID = request.params.pid
        const deletion = await db.deleteProjectByID(projectID)
        const results = await db.getProjects()
        response.send({deletion, results})
    } catch(error) {
        response.status(400).send(error)
    }
})




app.listen(port)