const db = require('../dbconnection');

exports.getAllProducts = (req, res) => {
    let sql = `CALL GetAllProducts`;
    db.query(sql, function(error, results, fields) {
    if(error){
        res.status(500).json(error)
    } else {
       res.status(200).json(results)
    }

    })
};

exports.filterByCategory = (req, res) => {
    let categoryId = req.params.cat.split('-');
    let query = 'SELECT * FROM group_products JOIN products ON group_products.product_id = products.id WHERE group_id IN(' + categoryId.join() + ')'

    db.query(query, function(error, result,field) {
        if(error) {
            res.status(500).json(error)
        } else {
            res.status(200).json(result)
        }
    })
};

exports.getAllCategories = (req, res) => {
    let sql = `CALL GetAllCateg`;
    db.query(sql, function(error, results, fields) {
        if(error){
            console.log(error)
        }
        let jsonResult = JSON.stringify(results);
        jsonResult = JSON.parse(jsonResult);
        res.status(200).json(jsonResult)
    });
};

exports.getSingleCategory = (req, res) => {
    let sql = `CALL GetProductsForCat(${req.params.id})`;
    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log(error)
        }
        let jsonResult = JSON.stringify(results);
        jsonResult = JSON.parse(jsonResult);
        res.status(200).json(jsonResult)
    });
};
