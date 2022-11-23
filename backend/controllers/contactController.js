const asyncHandler = require("express-async-handler")
const ContactSchema = require('../models/contactModel')

const createContactForm = asyncHandler(async(req, res) => {
    const {fullName, phone, email, description, terms} = req.body

    if(!fullName || !email || !description || !terms  ){
        res.status(400)
        throw new Error('please complete all fields')
    }

    const found = await ContactSchema.findOne({email, description})
    console.log(found)
    if(found){
        res.status(400)
        throw new Error('message already exist')
    }

    const createContact = await ContactSchema.create({
        fullName,
        phone,
        email,
        description, 
        terms
    })
    console.log(createContact)
    if(createContact){
        res.status(201).json(createContact)
    }else{
        res.status(400)
        throw new Error('something went wrong')
    }

    

})

const getContactForm = asyncHandler(async(req, res)=>{
   const getContacts = await ContactSchema.find()

   res.status(200).json(getContacts)
})

module.exports={
    createContactForm,
    getContactForm
}