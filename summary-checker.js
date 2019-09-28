const imap = require('imap-simple');
const config = require('./config');

function getComponentValue(content, componentName) {
    const component = content.match(
        new RegExp(`${componentName}(.*?)*?<\/span>`, 'gmis')
    );

    if (!component) {
        return '0.00';
    }

    const componentValue = component
        .shift()
        .match(/data-tooltip=3D"([0-9]*.[0-9]*)*?=/)[1];

    return componentValue;
}

function getIncomeData(email) {
    const date = new Date(email.attributes.date);

    date.setDate(date.getDate() - 1);

    const body = email.parts.filter(part => part.which === 'TEXT')[0].body;
    const totalIncome = config.incomeComponents
        .map(component => parseFloat(getComponentValue(body, component)))
        .reduce((a, b) => a + b, 0);

    return {
        date,
        totalIncome,
    };
}

module.exports = async function() {
    const connection = await imap.connect(config.imap);

    try {
        await connection.openBox('INBOX');

        const emails = await connection.search(['UNSEEN'], {
            bodies: ['HEADER', 'TEXT'],
            markSeen: config.imap.markAsRead,
        });

        if (emails.length > 1) {
            throw new Error(`More than one unread emails found.`);
        }

        const email = emails.shift();
        const income = getIncomeData(email);

        return {
            income,
        };
    } catch (error) {
        console.error(error);
    } finally {
        connection.end();
    }
};
