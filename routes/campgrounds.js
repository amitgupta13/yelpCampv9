const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

router.get('/', function(req, res){
    Campground.find({},function(err, campgrounds){
        if(err) return console.log(err);
        res.render('campgrounds/index', {campgrounds:campgrounds});
    });
});

router.post('/', function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const newCampground = {
                name:name,
                image:image,
                description:description
            }

        Campground.create(newCampground,(err, campground)=>{
            if(err) return console.log(err);
                res.redirect('/campgrounds');
        });
});

router.get('/new', function(req, res){
    res.render('campgrounds/new');
});

//Show - show more info about one campground
router.get('/:id', function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, campground){
        if(err) return console.log(err);
            res.render('campgrounds/show', {campground:campground});
    });
});

module.exports = router;