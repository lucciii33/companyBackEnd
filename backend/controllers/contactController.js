const asyncHandler = require("express-async-handler")
const ContactSchema = require('../models/contactModel')
const nodemailer = require("nodemailer");

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
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD
            },

        });
        //Here we send the email to US!
        const mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: ["brandon.f.creed@gmail.com","angelomaiele@gmail.com"],
            subject: `NEW CONTACT CREATED: ${email}`,
            html:
                `
            <h1>A new contact has been created!</h1>
            <h3>Full Name: ${fullName}</h3>
            <h3>Email: ${email}</h3>
            <h3>Phone: ${phone}</h3>
            <h1>Description: ${description}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        //Here we send the email to users!

        const mailOptionsTwo = {
            from: process.env.GOOGLE_EMAIL,
            to: `${email}`,
            subject: `HELLO FROM BLUELIGHT TECH`,
            html:`
            <h1>Thank you for contacting Bluelight Tech.</h1>
            <h3>We will be in touch as soon as possible.</h3>`
        };

        transporter.sendMail(mailOptionsTwo, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

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