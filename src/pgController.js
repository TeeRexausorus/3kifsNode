const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
});

client
    .connect()
    .then(() => console.log('Postgres connected'))
    .catch(err => console.error('connection error', err.stack));

const insertKif = (userId, username, kif) => {
    const insertUser = 'INSERT INTO kif_user(userid, username) VALUES($1, $2)\n' +
        'ON CONFLICT (userid)\n' +
        '    DO NOTHING;'
    client.query(insertUser, [userId, username]).then(res => {
    });
    const insert = 'INSERT INTO kif("userId", "username", "kif") VALUES($1, $2, $3) ';
    client.query(insert, [userId, username, kif])
        .then(res => {
        });
};

const getRandomKif = (userId, interaction, ephemeral) => {
    const monthNames = ["Janvier", "Février", "Mar", "Avril", "Mai", "Juin",
        "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    const query = 'SELECT "username", "kif", date_part(\'day\', "dateKif"::date) as day_out, date_part(\'month\', "dateKif"::date) as month_out, date_part(\'year\', "dateKif"::date) as year_out FROM kif WHERE "userId" like $1 ORDER BY random() LIMIT 1;';
    client.query(query, [userId])
        .then(res => {
            const {day_out, month_out, year_out, kif, username} = res.rows[0];
            let ret = ephemeral ?
                `Le ${day_out} ${monthNames[month_out - 1]} ${year_out}, tu as eu ce kif : ${kif}`
                : `Le ${day_out} ${monthNames[month_out - 1]} ${year_out}, ${username} a eu ce kif : ${kif}`;
            interaction.reply({content: ret, ephemeral: ephemeral});
        })
};

const getUserIds = async () => {
    const query = 'SELECT distinct "userid" from kif_user WHERE "notify"=true;';
    const res = await client.query(query);
    return res.rows;
}
exports.insertKif = insertKif;
exports.getRandomKif = getRandomKif;
exports.getUserIds = getUserIds;
