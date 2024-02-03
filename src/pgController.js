const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
});

client
    .connect()
    .then(() => console.log('Postgres connected'))
    .catch(err => console.error('connection error', err.stack));

const swapNotif = (userid, interaction) => {
    const swapUpdate = 'UPDATE kif_user SET notify = NOT notify WHERE userid=$1 RETURNING notify';
    client.query(swapUpdate, [userid]).then(res => {
        interaction.reply({
            content: res.rows[0].notify ? 'Ok, je t\'enverrai une notification de rappel ;)' : 'Ok, plus de notification :(',
            ephemeral: true
        });
    });
}

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
            let ret = `Le ${day_out} ${monthNames[month_out - 1]} ${year_out}, `
            + ephemeral ?
                `tu as eu ce kif : ${kif}`
                : `${username} a eu ce kif : ${kif}`;
            interaction.reply({content: ret, ephemeral: ephemeral});
        })
        .catch(() => {
            interaction.reply({content: 'Impossible de récupérer un kif, vous êtes sûr d\'en avoir enregistré ?', ephemeral: ephemeral});
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
exports.swapNotif = swapNotif;
