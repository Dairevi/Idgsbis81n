const express = require('express');
const Post =require('../Models/posts');
const router = express.Router();

router.post('/post', (req, res, next) => {
    const post =new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(createdPost => {
        console.log(createdPost.id);
        res.status(200).json({
            message: "Post added successfully",
            postId: createdPost.id
        })
    })
})

router.get('/get', (req, res, next) => {
    Post.find({}).then(function(Post){
        res.send(Post);
    }).catch(next);
})

router.put('/put/:id', (req,res,next) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update id=${id}.`
        });
      } else res.send({ message: "Updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating id=" + id
      });
    });
});

router.delete('/delete/:id',function(req,res,next){
    const id = req.params.id;
    Post.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete id=${id}.`
        });
      } else {
        res.send({
          message: "Deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete id=" + id
      });
    });
});

module.exports = router;