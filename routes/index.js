var express = require('express');
// var adverts = require('../routes/apiv1/adverts')
var Advert = require('../models/Advert');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  
  const adverts = await Advert.find();

  try {

    const name = req.query.name;
    const price = req.query.price;
    const isSelled = req.query.isSelled;
    const isSearched = req.query.isSearched;
    const picture = req.query.picture;
    const tags = req.query.tags;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit); // eliminamos parseInt y forzamos error con limit 
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};
    
    if (name) {
        filter.name = name;
    }

    // Check number type 
    if (typeof price !== 'undefined') {
        filter.price = price;
    }

    if (isSelled) {
        filter.isSelled = isSelled;
    }

    if (isSearched) {
        filter.isSearched = isSearched;
    }
    
    if (tags) {

        for (let i = 0; i < tags.length; i++) {
            
             filter.tags = tags[i];
        }
    }


    const advertsFilter = await Advert.list({filter: filter, skip, limit, fields, sort});// si colocamos llaves dentro de list podemos decir que el orden ya no es relevante
    
    console.log(advertsFilter.length);
    
    res.locals.adverts = advertsFilter;
      
    res.render('index', { title: 'Nodepop' });


    // res.json({ success: true, results: adverts });
} catch (err) {
    next(err);
}

  

});



module.exports = router;
