module.exports = {
    incomeComponents: [
        'Interest received',
        'Late fees received',
        'Interest income on rebuy',
        'Discount/Premium on secondary market transactions',
        'Cumulative repurchases of loan parts',
    ],
    imap: {
        imap: {
            user: process.env.MINTOS_IMAP_USER,
            password: process.env.MINTOS_IMAP_PASSWORD,
            host: process.env.MINTOS_IMAP_HOST,
            port: process.env.MINTOS_IMAP_PORT,
            tls: process.env.MINTOS_IMAP_USE_TLS === 'true',
            authTimeout: process.env.MINTOS_IMAP_AUTH_TIMEOUT,
        },
        markAsRead: true,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
};
