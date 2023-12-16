const express = require('express')
const router = express.Router()

const User = require('../model/user')



router.get('/' , (req,res)=>{
    User.findAll({
        raw : true,
        attributes : ['id' , 'name' ,'email' ]


    })
        .then((data)=>{
        console.log(data)
        return res.json({data : data})
    }).catch(e => {
        console.log(e)
        return res.status(500).json({data : []})
    })
})

router.post('/' , (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
  
    User.create({
        name : name , 
        email : email 
    },).then(data =>{
        
        console.log(data)
        return res.json({
            id : data.id,
            name : data.name,
            email : data.email,
            
        })
    }).catch(e =>{
        console.log(e)
        return res.status(404).json({success : false , data : {}})
    })
})

router.delete('/:id' , (req,res)=>{
    const id = req.params.id;

    User.findByPk(id).then(user =>{
        return user.destroy()
    }).then(()=>{
        return res.json({success : true})
    }).catch(e =>{
        console.log(e)
        return res.status(403).json({success : false})
    })

})


router.put('/:id',(req,res)=>{
    const id = req.params.id;
    User.findByPk(id).then((user)=>{
        user.name = req.body.name,
        user.email = req.body.email
        return user.save()
    }).then((data)=>{
        return res.json({
            id : data.id,
            name : data.name,
            email : data.email,
            phone : data.phone
        })
    }).catch(e =>{
        console.log(e)
        return res.status(403).json({success : false})
    })
})


module.exports = router;