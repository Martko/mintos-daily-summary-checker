const getDailySummary = require('./summary-checker');
const db = require('./db');

(async () => {
    const connection = await db.getConnection();

    try {
        const dailySummary = await getDailySummary();
        const interestData = {
            date: dailySummary.income.date,
            source: 'mintos',
            total: dailySummary.income.totalIncome,
            net: dailySummary.income.totalIncome,
        };

        console.log('interests:', interestData);
        await db.insertDailyInterest(connection, interestData);
    } catch (error) {
        console.log(error.message);
    }

    connection.end();
})();
