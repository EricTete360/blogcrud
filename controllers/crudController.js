const Crud = require('../models/CrudModel');



exports.show = (req,res) => {
    Crud.find().then(obj=>{
        res.status(200).json(obj);
    }).catch(err=>{
        res.status(300).send({
            message: err.message || "Something went wrong"
        });
    })
}

exports.create = (req,res) => {

    if(!req.body){
        return res.status(400).send({
            message:"Please fill all required field"
        });
    }

    const crud = new Crud({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        image: req.body.image,
        isVerified:req.body.isVerified,
    })

    crud.save().then(data=>{
        res.status(201).send(data);
    }).catch(err=>{
        res.status(300).send({
            message: err.message || "Something went wrong"
        });
    });
}

exports.showsingle = (req,res) => {
    Crud.findById(req.params.id).then(obj=>{
        res.status(200).json(obj);
    }).catch(err=>{
        res.status(300).send({
            message: err.message || "Something went wrong"
        });
    })
}

exports.update = (req,res) => {

    if(!req.body){
        return res.status(400).send({
            message:"Please fill all required field"
        });
    }
    Crud.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        image: req.body.image,
        isVerified:req.body.isVerified,
    }, {new: true})
    .then(obj => {
        if(!obj) {
            return res.status(404).send({
                message: "obj not found with id " + req.params.id
            });
        }
        res.send(obj);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "obj not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating obj with id " + req.params.id
        });
    });

}

exports.delete = (req, res) => {
    Crud.findByIdAndRemove(req.params.id)
    .then(obj => {
        if(!obj) {
            return res.status(404).send({
                message: "obj not found with id " + req.params.id
            });
        }
        res.send({message: "obj deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "obj not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete obj with id " + req.params.id
        });
    });
};