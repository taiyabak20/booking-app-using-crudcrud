const User = require('../model/user')

exports.postUsers = (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name: name,
        email: email
    }).then(result =>{
        console.log(result)
    }).catch(err =>{
        console.log(err)
    })
};

exports.deleteUsers = (req, res, next)=>{
    const userId = req.body.userId;
    User.deleteById(userId);
    res.redirect('/')
}

exports.getUsers = (req, res, next) => {
    User.findAll()
    .then(users =>{
        res.render('/'),{
            prods: users,
            
        }
        console.log(users)
    })
    .catch(err=>{
        console.log(err)
    })
}