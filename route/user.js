const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    db = require('../database');

 router.get('/', async (req, res) => {
    try {
        db.query('SELECT * FROM users ORDER BY ASC', (err, res) => {
            if (err) {
                throw err
            }
            res.status(200).json(res.rows)
        })
    } catch (err) {
        res.json({msg: err});
    }
})

router.post('/', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(10), hashPassword = await bcrypt.hash(password, salt);
        db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashPassword], (err, res) => {
            if (err) {
                throw err
            }
            res.status(201).send('Successful save user')
        })
    } catch (err) {
        res.json({msg: err});
    }
});

router.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    if (userId) {
        try {
            db.query('SELECT * FROM users WHERE id = $1', [userId], (err, res) => {
                if (err) {
                    throw err
                }
                res.status(200).json(res.rows)
            })
        } catch (err) {
            res.json({msg: err});
        }
    }
});

router.delete('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    if (userId) {
        try {
            db.query('DELETE FROM users WHERE id = $1', [userId], (err, res) => {
                if (err) {
                    throw err
                }
                response.status(200).send(`User deleted with ID: ${userId}`)
            })
        } catch (err) {
            res.json(err);
        }
    }
});

router.patch('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    if (userId) {
        try {
            const {name, email, password} = req.body;
            const salt = await bcrypt.genSalt(10), hashPassword = await bcrypt.hash(password, salt);
            db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name, email, hashPassword, id], (err, res) => {
                if (err) {
                    throw err
                }
                res.status(200).send('Successful update user')
            })
        } catch (err) {
            res.json({msg: err});
        }
    }
})

module.exports = router;