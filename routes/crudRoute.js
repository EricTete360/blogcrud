const express = require('express');
const router = express.Router();
const crud = require('../controllers/crudController');
const verifyToken = require('../middleware/verifyJWT');

router.get('/view',crud.show);
router.get('/view/single/:id',crud.showsingle);
router.post('/add',verifyToken,crud.create);
router.put('/update/:id',verifyToken,crud.update);
router.delete('/delete/:id',verifyToken,crud.delete);

module.exports = router;