const bcrypt = require('bcrypt');

const hashPassword = async(password)=>{
    try{
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }
    catch(err){
       console.log(err);
    }
}

const comparePassword = async(passowrd,hashedPassword)=>{
    return bcrypt.compare(passowrd,hashedPassword);
}

module.exports = {hashPassword,comparePassword};