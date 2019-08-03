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
        const isSelled = req.query.isSelled;
        const picture = req.query.picture;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit); // eliminamos parseInt y forzamos error con limit 
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


        const adverts = await Advert.list({filter: filter, skip, limit, fields, sort});// si colocamos llaves dentro de list podemos decir que el orden ya no es relevante
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

        const advert = new Advert(data);

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