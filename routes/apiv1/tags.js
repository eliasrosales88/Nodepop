'use strict';

const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');

/* 
 * GET /adverts
 * return adverts list
 * Example
 * http://localhost:3000/apiv1/adverts?limit=2&skip=2&fields=name%20age%20-_id
 */

router.get('/',  async (req, res, next) =>{
  
    try {

        const title = req.query.title;
        const price = req.query.price;
        const isSold = req.query.isSold;
        const picture = req.query.picture;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit); // eliminamos parseInt y forzamos error con limit 
        const fields = req.query.fields;
        const sort = req.query.sort;

        let gte;
        let lte;
        let range;

        const filter = {};

        if (title) {
            filter.title = new RegExp('^' + req.query.title, "i");
        }
        if (typeof price !== 'undefined') {
            if (price.indexOf('-') != -1) {
                // GREATER THAN OR EQUAL GTE
                if ( price.indexOf('-') === price.length - 1 ) {
                    range = price.split('-');
                    gte = range[0];
                    
                    filter.price = { $gte: gte }
                
                // LOWER THAN OR EQUAL LTE
                }else if ( price.indexOf('-') === 0 ) {
                    range = price.split('-');
                    lte = range[1];
                    
                    filter.price = { $lte: lte }
                
                // BETWEEN RANGE     
                } else {
                    range = price.split('-');
                    gte = range[0];
                    lte = range[1];
                    
                    filter.price = { $gte: gte, $lte: lte }
                }
                
            } else {
            
                    filter.price = price;
            }
        }


        if (isSold) {
            filter.isSold = isSold;
        }

        if (tags ==='lifestyle' || tags ==='motor' || tags ==='mobile' || tags ==='work' ) {

            for (let i = 0; i < tags.length; i++) {
                
                 filter.tags = tags[i];
            }
        }


        const adverts = await Advert.tagsList({filter: filter});// si colocamos llaves dentro de list podemos decir que el orden ya no es relevante
        res.json({ success: true, results: adverts });
        
    } catch (err) {
        next(err);
    }
});


/**
 * Get /adverts:id
 * Gets one advert
 */

router.get('/:id', async (req, res, next) =>{
    try {
        const _id = req.params.id;
        let advert;
        if (_id.length === 24 ) {
            advert = await Advert.findById(_id).exec();//exec() sobraria ya que hay un await por delante
        }else{
            res.status(404).json({ success: false });// con 404 bastaria
            return;
        }

        if (!advert) {
            res.status(404).json({ success: false });// con 404 bastaria
            return;
        }

        res.json({ success: true, result: advert });

    } catch (err) {
        next(err);
    }
});


/**
 * POST /adverts
 * Crear un advert
 */
router.post('/', async (req, res, next) =>{
    try {
        const data = req.body;
        let advert;
        console.log('DATA',data);
        
        for (let i = 0; i < data.tags.length; i++) {
            const element = data.tags[i];
            if (data.tags[i] ==='lifestyle' || data.tags[i] ==='motor' || data.tags[i] ==='mobile' || data.tags[i] ==='work' ) {
                advert = new Advert(data);
            }else {

                res.json({ success: false });
            }
            
        }
            
        const advertSaved = await advert.save();

        res.json({ success: true, result: advertSaved });
    } catch (err) {
        next(err);    
    }
})

/**
 * PUT /adverts:id
 * Actualiza un advert
 */
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;
        let advertSaved;
        if (_id.length === 24 ) {
        advertSaved =  await Advert.findOneAndUpdate({_id: _id}, data, { new: true}).exec(); // new: true --> hace que retorne la version del agente guardada en la base de datos
        
        } else {
            res.status(404).json({ success: false });
            return;
        }
        res.json({ success: true, result: advertSaved });
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE /adverts:id 
 * Elimina un advert
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        await Advert.deleteOne({ _id: _id }).exec();

        res.json({ success: true });
    } catch (err) {
        next(err);
    }
})
module.exports = router;