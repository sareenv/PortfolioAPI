
import express from 'express';
import bodyParser from 'body-parser';
import * as db from './projectsManager.js';
import multer from 'multer';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/api/v1/projects', async (_request, response) => {
    try {
        const content = await db.getProjects();
        response.send(content);
    } catch (error) {
        console.log(error);
        response.status(400).send({ error });
    }
});

app.get('/api/v1/project/:pid', async (request, response) => {
    const id = request.params.pid;
    try {
        const content = await db.getProjectByID(id);
        response.send({ content });
    } catch (error) {
        response.status(400).send(error);
    }
});

app.post('/api/v1/registerProjects', async (request, response) => {
    try {
        const body = request.body;
        await db.addOrUpdateProject(body);
        response.status(201).send({ message: 'Project is registered', status: '201' });
    } catch (error) {
        response.status(400).send({ error });
    }
});

app.delete('/api/v1/deleteProject/:pid', async (request, response) => {
    try {
        const projectID = request.params.pid;
        const deletion = await db.deleteProjectByID(projectID);
        const results = await db.getProjects();
        response.send({ deletion, results });
    } catch (error) {
        response.status(400).send(error);
    }
});

app.post('/api/v1/uploadProject', upload.single('file'), (request, response) => {
    try {
        const file = request.file;
        if (!file) { return response.status(400).send('No file uploaded.'); }
        response.send();
    } catch (error) {
        response.status(400).send(error);
    }
});

app.listen(port);