const express = require('express');
require('dotenv').config();
const app = express();
const Notes = require('./notesSchema');
const dbConnect = require('./dbConnect');
const cors = require('cors');

dbConnect();
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
  try {
    res.send('Server is running').status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/notes', async (req, res) => {
    try {
        const response = await Notes.find();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/notes', async (req, res) => {
    try {
        const { title, desc } = req.body;
        const newNote = new Notes({ title, desc })
        const savedNote = await newNote.save();  
        res.status(200)
        res.send('Todo added')
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.delete('/api/notes/:id', async (req, res) => {
    try {
        const  id  = req.params.id;
        console.log(id);
        await Notes.findByIdAndDelete(id)  
       
        res.status(200)
        res.send(`Todo deleted of id : ${id}`)
        
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});