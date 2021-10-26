require("./db/conn")
const express = require("express")
const Register = require("./models/register")
const multer = require("multer")

const path = require("path")
const hbs = require("hbs")


const { dirname } = require("path")

const app = express()
const port = process.env.PORT || 3000


const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

// FILES UPLOADS

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploadsFiles/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })




// Static Files
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use(express.static(static_path))

// Set Views
app.set('views', '../views')
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/registerEmp", (req, res) => {
    res.render("registerEmp")
})



// create a new employee in our database
app.post("/registerEmp", upload.array('applications', 5), async (req, res) => {
    try {
        console.log(req.files)
        const registerEmp = new Register({
            name: req.body.name,
            empId: req.body.empId,
            filename:req.body.empId
        })
        const registered = await registerEmp.save()
        res.status(201).render("index")


    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})