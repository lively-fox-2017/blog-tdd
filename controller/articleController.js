const Article = require('../models/article')
const helper = require('../helpers/helper')

module.exports = {
  findAll: (req, res) => {
    Article.find().sort('judul').then((rowsArticle) => {
      // console.log("HHHHHHHHHHHHAAAAAAAAAAAAAAAAAAA");
      res.status(200).json({
        message: "Tampil Semua Article",
        data: rowsArticle
      })
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  findOne: (req, res) => {
    Article.findOne({_id: req.params.id}).then((rowArticle) => {
      // console.log("HAIIIIIIIIIIIIIIIIIII", req.params.id);
      // console.log("-------------------->", rowArticle);
      if (rowArticle) {
        res.status(200).json({
          message: "Tampil Satu Data Product",
          data: rowArticle
        })
      } else {
        res.status(400).json({
          message: "Maaf Id tersebut tidak ada"
        })
      }
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    // console.log("HHHHHHHHHHHHAAAAAAAAAAAAAAAAAAA", req.body);
    Article.create(helper.dataArticle(req.body)).then((result) => {
      // console.log("------------------------------ID ", result);
      res.status(200).json({
        message: "Berhasil Menambah Article",
        data: result
      })
    }).catch((reason) => {
      res.status(400).json({
        message: reason
      })
    })
  },

  update: (req, res) => {
    Article.findOne({_id: req.params.id}).then((rowArticle) => {
      let userId = helper.authorization(req.headers.token)
      if (rowArticle.user !== userId) {
        res.status(403).json({
          message: "Maaf anda tidak berhak merubah data tersebut"
        })
      } else {
        Article.update({_id: req.params.id}, {
          $set: {
            judul: req.body.judul,
            deskripsi: req.body.deskripsi,
            updatedAt: new Date()
          }
        })
        .then((rowUpdateArticle) => {
          if (rowUpdateArticle.n != 0) {
            res.status(200).json({
              message: "Berhasil Update",
              data: rowUpdateArticle
            })
          } else {
            res.status(400).json({
              message: "Data tidak ditemukan"
            })
          }
        }).catch((reason) => {
          res.status(404).json({
            message: reason
          })
        })
      }
    })
  },
  //
  // delete: (req, res) => {
  //   // console.log(req.body.imgName);
  //   Product.remove({_id: req.params.id}).then((rowDeleteProduct) => {
  //     if (rowDeleteProduct.result.n != 0) {
  //       image.deleteFile(req.body.imgName)
  //       res.json({
  //         message: "Berhasil Hapus",
  //         data: rowDeleteProduct
  //       })
  //     } else {
  //       res.json({
  //         message: "Maaf Id tersebut tidak ada"
  //       })
  //     }
  //   }).catch((reason) => {
  //     res.json({
  //       message: reason
  //     })
  //   })
  // }
}
