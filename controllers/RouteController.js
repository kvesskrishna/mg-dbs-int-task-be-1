const Country = require("../models/Country")

module.exports.countries = async function (req, res) {
    const page = parseInt(req.params.pageNo)
    const resPerPage = parseInt(req.params.resPerPage)
    // console.log(resPerPage,"-----------")
    const results = await Country.find().sort({ _id: "asc" })
        .limit(resPerPage)
        .skip((resPerPage * page) - resPerPage)
    const numOfRecords = await Country.count();
    let i = 0;
    let list = []
    for(let j = 0; j < results.length; j++) {
        list.push(results[j].name);
        i++
    }
    if(i == results.length) {
        return res.status(200).json({ countries: list, totalPages: Math.ceil(numOfRecords / resPerPage), message: "country list loaded" })
    }
}

module.exports.addCountry = async function (req, res) {
    const name = req.query.name;
    const newCountry = new Country();
    newCountry.name = name;
    newCountry.save((err, result) => {
        if (err) {
            return res.status(401).json({ message: err, success: false });
        } else {
            return res.status(200).json({ success: true, message: result });
        }
    })
}