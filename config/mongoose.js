const mongoose = require('mongoose');

let _db;
mongoose.set("strictQuery", false)
module.exports = {
    connectToServer: function(callback) {
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => {
                _db = mongoose.connection.db;
                console.log("Connected to DB")
                return callback(null);
            })
            .catch((error) => callback(error));
    },
    getDb: function() {
        return _db;
    }
};