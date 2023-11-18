const sqlite3 = require("sqlite3");

const ADVANCED_LOG = true;

const ASSETS_PATH = (()=>{
    let dirs = __dirname.split(/[\\\/]/);
    dirs.pop(); // C:\Tasks\...\app\modules -> C:\Tasks\...\app
    const path = (/.:/.test(dirs[0]))
        ? `${dirs.join("/")}/resources` // Windows
        :`/${dirs.join("/")}/resources` // Unix
    console.log(`Resources Path "${path}"`);
    return path;
})();

// Resource file path
// 
module.exports.LS = {
    GD: `${ASSETS_PATH}/goods.db`
}

// Database Handler
// 
module.exports.init = (file) => {
    return new DatabaseHandler(file);
}

class DatabaseHandler {
    constructor (database_file) {
        this.file = database_file;
        this.database = new sqlite3.Database(database_file);
        console.log(`SQLite[Load] "${database_file}"`);
    }
    get(query, bind_values, callback = ()=>{}){
        console.log(`SQLite.Get > "${query}"\n> `, bind_values);
        this.database.get(query, bind_values, (err, row) => {
            if (ADVANCED_LOG) console.log("SQLite.Result > ", row);
            if (ADVANCED_LOG && err) console.log("SQLite.Result.Err > ", err);
            callback(err, row);
        });
    }
    all(query, bind_values, callback = ()=>{}){
        console.log(`SQLite.All > "${query}"\n> `, bind_values);
        this.database.all(query, bind_values, (err, rows) => {
            if (ADVANCED_LOG) console.log("SQLite.Result > ", rows);
            if (ADVANCED_LOG && err) console.log("SQLite.Result.Err > ", err);
            callback(err, rows);
        });
    }
    run(query, bind_values, callback = ()=>{}){
        console.log(`SQLite.Run > "${query}"\n> `, bind_values);
        this.database.run(query, bind_values, (err) => {
            if (ADVANCED_LOG && err) console.log("SQLite.Result.Err > ", err);
            callback(err);
        });
    }
    serialize(func){
        console.log(`SQLite.Serialize --- BEGIN ---`);
        this.database.serialize(func);
    }
    close(errorHandler = (err) => {}){
        console.log(`SQLite[Close] "${this.file}"`);
        if (errorHandler === undefined) {
            this.database.close(err => { if (err) console.error(err); });
        } else {
            this.database.close(errorHandler);
        }
    }
}

// SQLs
// 
