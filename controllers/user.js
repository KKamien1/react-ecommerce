const User  = require('../models/user');


exports.signup = (req,res) => {

  console.log("req.body:", req.body);
  const user = new User(req.body);
  user.save((err, user)=> {
    if(err) {
      return res.status(400).json({
        err
      })
    }
    res.json({user})

  })
  //res.json({message: 'hello there'})
}


"use strict";
 
/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            " already exists";
    } catch (ex) {
        output = "Unique field already exists";
    }
 
    return output;
};
 
/**
 * Get the erroror message from error object
 */
exports.errorHandler = error => {
    let message = "";
 
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    } else {
        for (let errorName in error.errorors) {
            if (error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }
 
    return message;
};