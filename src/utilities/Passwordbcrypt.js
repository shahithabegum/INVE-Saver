const bcrypt = require('bcryptjs')

const hashGenerator = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password,salt)
    return hash
}

const validator = async (password,hashpasword)=>{
    const result = await bcrypt.compare(password,hashpasword)
    return result;
}

module.exports={
    hashGenerator,
    validator
}