const express = require('express')
const path = require('path')
const fs = require('fs')
const { error } = require('console')

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res)=>{
    fs.readdir("./files", function(err, files){
        res.render("index", {files:files})
    })
})

app.post("/create", (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.desc, (err)=>{
        console.error(error)
        res.redirect("/")
    } )
})

app.get("/file/:filename", (req, res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render("show", {filename: req.params.filename, filedata: filedata})
        console.log(filedata)
    })
})

app.get("/edit/:filename", (req, res)=>{
    res.render("edit", {filename: req.params.filename})
})

app.post("/edit/:filename", (req, res)=>{
    fs.rename(`files/${req.params.filename}`, `files/${req.body.new}`, function(err) {
        console.error(err)
        res.redirect("/")
    })
})

app.listen(3000, (req, res)=>{
    console.log("Created")
})
