
const lengthChecker = (req, res, next) => {
    try {
        const { name, instrument } = req.body;

        let nameLength = false
        let instrumentLength = false
        if(name && name.length >= 2 && name.length <= 20){
            nameLength = true
        }  
        if(instrument && instrument.length >= 2 && instrument.length <= 20){
            instrumentLength = true
        } 
        if(nameLength && instrumentLength){
            next()
        }
        else {
            throw new Error("Try again idiot!")
        }
    } catch(error) {
        next(error)
    }
}

module.exports = {
    lengthChecker
}