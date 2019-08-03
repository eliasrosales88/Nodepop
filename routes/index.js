var express = require('express');
var Advert = require('../models/Advert');
var router = express.Router();

/* GET home page. */

router.get('/:page?', async (req, res, next) => {
    // Pagination
    let perPage = 5;
    let page = req.params.page || 1;
    const adverts = await Advert.find({});

    try {
        
        // Query string 
        const title = req.query.title;
        const price = req.query.price;
        const isSelled = req.query.isSelled;
        const picture = req.query.picture;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip)  || (perPage * page) - perPage;
        const limit = parseInt(req.query.limit) || perPage;
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};

        if (title) {
            filter.title = title;
        }

        // Check number type 
        if (typeof price !== 'undefined') {
            filter.price = price;
        }

        if (isSelled) {
            filter.isSelled = isSelled;
        }

    
        if (tags) {

            for (let i = 0; i < tags.length; i++) {

                filter.tags = tags[i];
            }

        }
    


        const advertsFilter = await Advert.list({ filter: filter, skip, limit, fields, sort });
        
        // console.log(advertsFilter);
        
        // Set locals to render
        if (advertsFilter.length === 0) {
            res.locals.advertsFilter = advertsFilter;
            res.locals.pages = Math.ceil(advertsFilter.length / perPage);
            res.locals.adverts = 'No results';
            
        } else {
            res.locals.advertsFilter = advertsFilter;
            res.locals.pages = Math.ceil(adverts.length / perPage);
            res.locals.adverts = advertsFilter.length;
        }
        res.locals.current = page;
        res.locals.filteredResults = Math.ceil(advertsFilter.length / perPage) ? Math.ceil(advertsFilter.length / perPage)  : 0 ;
        res.render('index', { title: 'Nodepop' });

    } catch (err) {
        next(err);
    }



});


module.exports = router;
