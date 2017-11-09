const artikel = require('../models/artikel.js')
const mongoose = require('mongoose')

const addArtikel = (req,res) => {
  artikel.create({
    judul:req.body.judul,
    isi:req.body.isi,
    author:req.body.author
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}

const getArtikel = (req,res) => {
  artikel.find().then((data)=>{
    res.send(data)
  })
}

const findArtikel = (req,res) => {
  artikel.findById({
    _id:req.params.id
  }).then((artikel)=>{
    res.send(artikel)
  })
}

const updateArtikel = (req,res) => {
  artikel.update({
    _id:req.params.id
  },{
    judul:req.body.judul,
    isi:req.body.isi,
    author:req.body.author
  }).then((artikel)=>{
    res.send(artikel)
  })
}

const deleteArtikel = (req,res) => {
  artikel.remove({
    _id:req.params.id
  }).then((artikel)=>{
    res.send(artikel)
  })
}

module.exports = {
  addArtikel,
  getArtikel,
  findArtikel,
  updateArtikel,
  deleteArtikel
}
