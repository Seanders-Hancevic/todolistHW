
const toDoList = require('../data/todoarray.js');


module.exports = function (app) {

    app.get('/api/todoarray', function (req, res) {
        res.json(toDoList);
    });

    app.get('/api/todoarray/:index', function (req, res) {
        res.json(toDoList[req.params.index]);
        
    });

    app.post('/api/todoarray', function (req, res) {
        toDoList.push(req.body);
        req.body.completed = req.body.completed === 'true';
        const confirmation = { success: true };
        res.json(confirmation);
    });

    app.put('/api/todoarray/:index', function (req, res) {
        req.body.completed = req.body.completed === 'true';
        toDoList.splice(req.params.index, 1, req.body);
        res.json({
            success: true
        });
    });

    app.delete('/api/todoarray/:index', function (req, res) {

        toDoList.splice(req.params.index, 1);
        res.json({
            success: true
        });
    });
}



