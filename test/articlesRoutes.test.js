const chai = require('chai')
const should = chai.should()
const chaiHTTP = require('chai-http')

const app = require('../app')
const User = require('../models/user')
const Article = require('../models/article')
const helper = require('../helpers/helper')

chai.use(chaiHTTP)

var dummyDataUser = {
  _id: "59f72ccaa06261535e60a3c8",
  username: "anton",
  password: "anton",
  secret: "hacktiv8",
  email: "anton@antonCorp.com"
}

var dummyDataArticle = {
  _id: "59f75dddfd45eb73f44332f6",
  user: "59f72ccaa06261535e60a3c8",
  judul: "Polisi menangkap Ian JR sebagai pelaku pemerkosaan anak TK",
  deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit tempus augue eu accumsan. Duis eget odio tellus. Fusce elit.",
  createdAt: new Date(),
  updatedAt: null,
}

describe('Article Routes result', function() {

  before(function() {
    dummyDataUser.password = helper.secretHash(dummyDataUser.secret, dummyDataUser.password)
    // console.log(res.body);
    User.create(dummyDataUser)
    .then((result) => {
      // console.log(result);
      console.log("Berhasil Add Dummy Data");
      // User.findOne({username: "anton"}).then((result) => {
      //   if (result) {
      //     let secret = result.secret
      //     let password = helper.secretHash(secret, "anton")
      //     // console.log("ini "+password);
      //     // console.log("itu "+result.password);
      //     if(result.password === password) {
      //       // console.log("ni token ", process.env.token_secret);
      //       let token = helper.authentication(result)
      //       console.log(token);
      //     } else {
      //       console.log("Sorry, wrong password");
      //     }
      //   } else {
      //     console.log("Sorry, wrong username");
      //   }
      // }).catch((reason) => {
      //   console.log("ERRROORRRR");
      // })
    }).catch((reason) => {
      console.log(reason);
    })
  })

  after(function() {
    User.remove().then((result) => {
      console.log("Berhasil Hapus");
    }).catch((reason) => {
      console.log(reason);
    })

    Article.remove().then((result) => {
      console.log("Berhasil Hapus Article");
    }).catch((reason) => {
      console.log(reason);
    })
  })

  it('Should return error when user data is empty', function(done) {
    chai.request(app)
    .post('/articles/insert')
    .send({
      judul: "Polisi menangkap Ian JR sebagai pelaku pemerkosaan anak TK",
      deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit tempus augue eu accumsan. Duis eget odio tellus. Fusce elit.",
      createdAt: new Date(),
      updatedAt: null,
    })
    .end((err, res) => {
      res.status.should.equal(400)
      res.body.should.be.an('object')
      done()
    })
  })

  it('Should return data and message', function(done) {
    chai.request(app)
    .post('/articles/insert')
    .send(dummyDataArticle)
    .end((err, res) => {
      // console.log("---------->", res.body);
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('user')
      res.body.data.should.have.property('judul')
      res.body.data.should.have.property('deskripsi')
      res.body.data.should.have.property('createdAt')
      res.body.data.user.should.equal("59f72ccaa06261535e60a3c8")
      res.body.data.judul.should.equal('Polisi menangkap Ian JR sebagai pelaku pemerkosaan anak TK')
      res.body.data.deskripsi.should.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit tempus augue eu accumsan. Duis eget odio tellus. Fusce elit.')
      done()
    })
  })

  it('Should return All Article', function(done) {
    chai.request(app)
    .get('/articles')
    .end((err, res) => {
      // console.log("---------->", res.body);
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.equal("Tampil Semua Article")
      res.body.data.should.be.an('array')
      done()
    })
  })

  it('Should return error when article id is not find', function(done) {
    chai.request(app)
    .get('/articles/79f72ccaa06261535e60a4d2')
    .end((err, res) => {
      // console.log("---------->", res.body);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      res.body.message.should.equal("Maaf Id tersebut tidak ada")
      done()
    })
  })

  it('Should return One Article', function(done) {
    chai.request(app)
    .get('/articles/59f75dddfd45eb73f44332f6')
    .end((err, res) => {
      // console.log("---------->", res.body);
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.equal("Tampil Satu Data Product")
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('user')
      res.body.data.should.have.property('judul')
      res.body.data.should.have.property('deskripsi')
      res.body.data.should.have.property('createdAt')
      res.body.data.should.have.property('updatedAt')
      done()
    })
  })

  it('Should return error when user trying to update article that not match his ID', function(done) {
    chai.request(app)
    .put('/articles/update/59f75dddfd45eb73f44332f6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ')
    .end((err, res) => {
      // console.log(res.body);
      res.status.should.equal(403)
      res.body.should.be.an('object')
      res.body.message.should.equal("Maaf anda tidak berhak merubah data tersebut")
      done()
    })
  })

  it('Should return error when article id is not found', function(done) {
    chai.request(app)
    .put('/articles/update/59f73940bc28be5c02328ada')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY3MmNjYWEwNjI2MTUzNWU2MGEzYzgiLCJ1c2VybmFtZSI6ImFudG9uIiwiaWF0IjoxNTA5Mzc2ODUxfQ.GSF3RYblfFstACVDSdllryzO2ga-SHHkxwR9U9e4zSM')
    .send({
      judul: "Polisi menangkap Ian JR sebagai pelaku pemerkosaan anak TK",
      deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit tempus augue eu accumsan. Duis eget odio tellus. Fusce elit."
    })
    .end((err, res) => {
      // console.log(res);
      res.status.should.equal(400)
      res.body.should.be.an('object')
      res.body.message.should.equal("Data tidak ditemukan")
      done()
    })
  })

  it('Should return true / total updated data', function(done) {
    chai.request(app)
    .put('/articles/update/59f75dddfd45eb73f44332f6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY3MmNjYWEwNjI2MTUzNWU2MGEzYzgiLCJ1c2VybmFtZSI6ImFudG9uIiwiaWF0IjoxNTA5Mzc2ODUxfQ.GSF3RYblfFstACVDSdllryzO2ga-SHHkxwR9U9e4zSM')
    .send({
      judul: "Polisi menangkap Ian JR sebagai pelaku pemerkosaan anak SD",
      deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit tempus augue eu accumsan. Duis eget odio tellus. Fusce elit."
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.equal("Berhasil Update")
      res.body.data.should.have.property('n')
      res.body.data.should.have.property('ok')
      done()
    })
  })

  it('Should return error when user trying to delete article that not match his ID', function(done) {
    chai.request(app)
    .delete('/articles/delete/59f75dddfd45eb73f44332f6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ')
    .end((err, res) => {
      res.status.should.equal(403)
      res.body.should.be.an('object')
      res.body.message.should.equal("Maaf anda tidak berhak menghapus data tersebut")
      done()
    })
  })

  it('Should return error when article id is not found', function(done) {
    chai.request(app)
    .delete('/articles/delete/59f73940bc28be5c02328ada')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY3MmNjYWEwNjI2MTUzNWU2MGEzYzgiLCJ1c2VybmFtZSI6ImFudG9uIiwiaWF0IjoxNTA5Mzc2ODUxfQ.GSF3RYblfFstACVDSdllryzO2ga-SHHkxwR9U9e4zSM')
    .end((err, res) => {
      res.status.should.equal(400)
      res.body.should.be.an('object')
      res.body.message.should.equal("Data tidak ditemukan")
      done()
    })
  })

  it('Should return true / total deleted data', function(done) {
    chai.request(app)
    .delete('/articles/delete/59f75dddfd45eb73f44332f6')
    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY3MmNjYWEwNjI2MTUzNWU2MGEzYzgiLCJ1c2VybmFtZSI6ImFudG9uIiwiaWF0IjoxNTA5Mzc2ODUxfQ.GSF3RYblfFstACVDSdllryzO2ga-SHHkxwR9U9e4zSM')
    .end((err, res) => {
      // console.log(res.body);
      res.status.should.equal(200)
      res.body.should.be.an('object')
      res.body.message.should.equal("Berhasil Hapus")
      res.body.data.should.have.property('n')
      res.body.data.should.have.property('ok')
      done()
    })
  })
})
