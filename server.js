const express = require('express'); //express provides more features than http, so we are using express
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./model/Student'); //add this line to require the Student model
const app = express();  //this will initialize our application
const PORT = 5000;
// const index = require('./index');
mongoose.connect('mongodb://localhost:27017/StudentDB');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
    const students1 = await Student.find();
    res.render('index', { students1, studentToEdit:null });
})
app.post('/save', async (req, res) => {

    const { RollNo, name, degree, city } = req.body;

    // console.log(RollNo, name, degree, city);
    const students = new Student({ RollNo, name, degree, city });
    await students.save();
    res.redirect('/');
})

app.get('/edit/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    const students1 = await Student.find();
    res.render('index', { students1, studentToEdit: student });
});


app.post('/delete/:id', async (req, res) => {
    const { RollNo, name, degree, city } = req.body;
    await Student.findByIdAndDelete(req.params.id, { RollNo, name, degree, city });
    res.redirect('/');
});
app.post('/edit/:id', async (req, res) => {
    const { RollNo, name, degree, city } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { RollNo, name, degree, city });
    res.redirect('/');
})

app.listen((PORT), () => {
    console.log(`Server run on Port: ${PORT}`);
})