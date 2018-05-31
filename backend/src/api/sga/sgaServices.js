const sga= require('./sga')
const errorHandler = require('../common/errorHandler')

sga.methods(['get', 'post', 'put', 'delete'])
sga.updateOptions({
    new: true,
    runValidators: true
})
sga.after('post',errorHandler).after('put',errorHandler)

sga.route('count', (req, res, next) => {
    sga.count((error, value) => {
        if (error) {
            res.status(500).json({
                errors: [error]
            })
        } else {
            res.json({
                value
            })
        }
    })
})

sga.route('summary', (req, res, next) => {
    sga.aggregate([{
        $project: {
            credit: {
                $sum: "$credits.value"
            },
            debt: {
                $sum: "$debts.value"
            }
        }
    }, {
        $group: {
            _id: null,
            credit: {
                $sum: "$credit"
            },
            debt: {
                $sum: "$debt"
            }
        }
    }, {
        $project: {
            _id: 0,
            credit: 1,
            debt: 1
        }
    }]).exec((error, result) => {
        if (error) {
            res.status(500).json({
                errors: [error]
            })
        } else {
            res.json(result[0] || {
                credit: 0,
                debt: 0
            })
        }
    })
})
module.exports = sga