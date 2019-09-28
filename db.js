const mysql = require('mysql2/promise');
const config = require('./config');

/**
 * Create new MySQL connection
 */
const getConnection = async () => mysql.createConnection(config.mysql);

/**
 * Insert data safely to DB
 * @param {*} object
 */
const insertDailyInterest = async (connection, object) => {
    const [rows] = await connection.execute(
        'INSERT INTO `daily_interests` (date, source, total, net) VALUES (?,?,?,?)',
        Object.values(object)
    );

    return rows.affectedRows;
};

module.exports = {
    getConnection,
    insertDailyInterest,
};
