const express = require('express');
const router = express.Router();
const crud = require('../controllers/crudController');
const verifyToken = require('../middleware/verifyJWT');

router.get('/view',crud.show);
router.get('/view/single/:id',crud.showsingle);
router.post('/add',crud.create);
router.put('/update/:id',crud.update);
router.delete('/delete/:id',crud.delete);

module.exports = router;