const getDailySummary = require('./summary-checker');
const db = require('./db');

(async () => {
    const dailySummary = await getDailySummary();
    const connection = await db.getConnection();

    const interestData = {
        date: dailySummary.income.date,
        source: 'mintos',
        total: dailySummary.income.totalIncome,
        net: dailySummary.income.totalIncome,
    };

    console.log('interests:', interestData);
    await db.insertDailyInterest(connection, interestData);

    connection.end();
})();
