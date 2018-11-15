let db
let config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Menbers
}

let Menbers = class {
    static getById(id) {

        return new Promise((next) => {
            db.query('SELECT * FROM menbers WHERE id = ?', [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        next(result[0])
                    }  else {
                        next(new Error('Pas bon id'))
                    }
                })
                .catch((err) => {
                    next(err)
                })
        })
    }

    static getAll(max) {
        return new Promise((next) => {
            if (max != undefined && max > 0) {
                db.query('SELECT * FROM menbers LIMIT 0, ?', [parseInt(max)])
                    .then((result) => next(result))
                    .catch((err) => next(err))
            } else if (max != undefined) {
                next(new Error('Mauvais max'))
            } else {
                db.query('SELECT * FROM menbers')
                    .then((result) => {next(result)})
                    .catch((err) => next(err))
            }
        })
    }

    static add(name) {
        return new Promise((next) => {
            if (name != undefined && name.trim() != '') {
                name = name.trim()

                db.query('SELECT * FROM menbers WHERE name = ?', [name])
                    .then((result) => {
                        if (result[0] != undefined) {
                            next(new Error('name déja pris'))
                        } else {
                            return db.query('INSERT INTO menbers(name) VALUES(?)', [name])
                        }
                    })
                    .then(() => {
                        return db.query('SELECT * FROM menbers WHERE name = ?', [name])
                    })
                    .then((result) => {
                        next({
                            id: result[0].id,
                            name : result[0].name
                        })
                    })
                    .catch((err) => next(err))
            } else {
                next(new Error('Pas de name'))
            }
        })
    }

    static update(id, name) {
        return new Promise((next) => {
            if (name != undefined && name.trim() != '') {
                name = name.trim()

                db.query('SELECT * FROM menbers WHERE id = ?', [id])
                    .then((result) => {
                        if (result[0] != undefined) {
                            return db.query('SELECT * FROM menbers WHERE name = ? && id != ?', [name, id])
                        } else {
                            next(new Error('Pas de bon id'))
                        }
                    })
                    .then((result) => {
                        if (result[0] != undefined) {
                            next(new Error('same name'))
                        } else {
                            return db.query('UPDATE menbers SET name = ? WHERE id = ?', [name, id])
                        }
                    })
                    .then(() => next(true))
                    .catch((err) => next(err))
            } else {
                next(new Error('Pas de name value'))
            }
        })
    }

    static delete(id) {
        return new Promise((next) => {
            db.query('SELECT * FROM menbers WHERE id = ?', [id])
                .then((result) => {
                    if (result[0] != undefined) {
                        return db.query('DELETE FROM menbers WHERE id = ?', [id])
                    } else {
                        next(new Error('Mauvais id'))
                    }
                })
                .then(() => next(true))
                .catch((err) => next(err))
        })
    }
}

/*new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('tott')
        reject(new Error('tttt'))
    }, 3000)
}).then((message) => {
    console.log(message)
}).catch((err) => {
    console.log(err.message)
})

getMenber()
    .then(() => getArticle())
    .then((message) => console.log(message))
    .catch((err) => console.log(err.mesage))

function getMenber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Menber 1')
            resolve()
        })
    })
}

function getArticle() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([1, 2, 3])
        })
    })
}*/