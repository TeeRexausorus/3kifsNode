const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    //ssl: {rejectUnauthorized: false},
});

client
    .connect()
    .then(() => console.log('Postgres connected'))
    .catch(err => console.error('connection error', err.stack));

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function interjection() {
    let randomVal = getRandomInt(6);
    switch (randomVal) {
        case 0:
            return ('C\'est énorme !');
        case 1:
            return ('Wahou !');
        case 2:
            return ('C\'est zinzin !');
        case 3:
            return ('Trop chouette !');
        case 4:
            return ('C\'est la fête !');
        default:
            return ('');
    }
}

const insertKif = (userId, username, kif) => {
    const insert = 'INSERT INTO kif("userId", "username", "kif") VALUES($1, $2, $3) ';
    client.query(insert, [userId, username, kif])
        .then(res => {
        });
};

const getRandomKif = (userId, interaction) => {
    const monthNames = ["Janvier", "Février", "Mar", "Avril", "Mai", "Juin",
        "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    const query = 'SELECT "username", "kif", date_part(\'day\', "dateKif"::date) as day_out, date_part(\'month\', "dateKif"::date) as month_out, date_part(\'year\', "dateKif"::date) as year_out FROM kif WHERE "userId" like $1 ORDER BY random() LIMIT 1;';
    client.query(query, [userId])
        .then(res =>{
            const {day_out, month_out, year_out, kif} = res.rows[0];
            let ret = `Le ${day_out} ${monthNames[month_out - 1]} ${year_out}, tu as eu ce kif : ${kif}`;
            interaction.reply(ret);
    })
};

const getUserIds = async () => {
    const query = 'SELECT distinct "userId" from kif';
    const res = await client.query(query);
    return res.rows;
}
exports.insertKif = insertKif;
exports.getRandomKif = getRandomKif;
exports.getUserIds = getUserIds;
