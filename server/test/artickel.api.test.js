const chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();
//jangan lupa require app.js-nya
var app = require('../app');

chai.use(chaiHttp);

let artikelNya = {
  judul: 'Bunga-bunga ditaman',
  isi: 'Bunga ditaman bermekaran berwarna hitam pekat menandakan kehidupan yang gelap',
  author: 'Bang Miun'
}

let id = ''

let edit = {
  judul: 'Edited',
  isi: 'Edited',
  author: 'Edited'
}

describe('API buat artikel baru',function(){
  it('Kembalikan data artikel yang di post',function(done){
    chai.request(app)
    .post('/artikel')
    .send(artikelNya)
    .end(function(err,res){
      console.log(res.body);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('isi');
      res.body.should.have.property('author');
      done()
    })
  }),
  it('Mendapatkan data Semua artikel',function(done){
    chai.request(app)
    .get('/artikel')
    .end(function(err,res){
      id = res.body[0]._id
      console.log(id);
      res.should.have.status(200);
      done();
    })
  }),
  it('Mendapatkan data satu artikel',function(done){
    chai.request(app)
    .get('/artikel/'+id)
    .end(function(err,res){
      res.should.have.status(200);
      res.body.should.have.property('_id');
      console.log(res.body);
      done()
    })
  }),
  it('Edit data satu artikel',function(done){
    chai.request(app)
    .put('/artikel/'+id)
    .send(edit)
    .end(function(err,res){
      res.should.have.status(200);
      console.log(res.body);
      done()
    })
  }),
  it('Delete data satu artikel',function(done){
    chai.request(app)
    .delete('/artikel/'+id)
    .end(function(err,res){
      res.should.have.status(200);
      console.log(res.body);
      done()
    })
  })
})
