import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('places.db')

// this sets up the database but we have to call it in App.js
export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, long REAL NOT NULL);',
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise 
}

// we call this in places_actions file
export const insertPlace = (title, imageUri, address, lat, long) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                // interpolating values is possible but not advisable as it opens the db to sql injections !!!
                // insert questions marks instead and sqlite will insert the passed values from the array
                'INSERT INTO places (title, imageUri, address, lat, long) VALUES (?, ?, ?, ?, ?);',
                [title, imageUri, address, lat, long],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
    return promise 
}

// expecuteSql takes 2 mandatory args - the query and the array of dynamic arguments you can inject into the query
// and then 2 functions as arguments 3 and 4. The first function is a success function and the second is a failure function
// in these functions, the first argument is the query you executed (underscore means we don't care about it) 
// and the second is an error object