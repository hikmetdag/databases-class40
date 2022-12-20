const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const csvtojson = require('csvtojson');
dotenv.config();

//1.Find a way to get the data in the csv file into your MongoDB database.
const convertData = async (client) => {
    const dataTojson = await csvtojson().fromFile(
        'population_pyramid_1950-2022.csv',
    );
    await client.db('databaseWeek4').collection('exercises').deleteMany();
    const result = await client
        .db('databaseWeek4')
        .collection('exercises')
        .insertMany(dataTojson);
};

//Write a function that will return the array of the total population (M + F over all age groups) for a given Country per year.

async function getTotalPopulationByYear(client, country) {
    const pipeline = [
        {
            $match: { Country: country },
        },
        {
            $group: {
                _id: '$Year',
                countPopulation: {
                    $sum: { $add: [{ $toInt: '$M' }, { $toInt: '$F' }] },
                },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ];

    const cursor = await client
        .db('databaseWeek4')
        .collection('exercises')
        .aggregate(pipeline);
    await cursor.forEach((result) => {
        console.table(result);
    });
}

//Write a function that will return all of the information of each continent for a given Year and Age field but add a new field TotalPopulation that will be the addition of M and F.

async function getContinentInformation(client, age, year) {
    const pipeline = [
        {
            $match: {
                Country: {
                    $in: [
                        'AFRICA',
                        'ASIA',
                        'EUROPE',
                        'LATIN AMERICA AND THE CARIBBEAN',
                        'NORTHERN AMERICA',
                        'OCEANIA',
                    ],
                },
                Year: year,
                Age: age,
            },
        },

        {
            $addFields: {
                TotalPopulation: {
                    $add: [{ $toInt: '$M' }, { $toInt: '$F' }],
                },
            },
        },
    ];
    const cursor = await client
        .db('databaseWeek4')
        .collection('exercises')
        .aggregate(pipeline);
    await cursor.forEach((result) => {
        console.table(result);
    });
}
async function main() {
    if (process.env.MONGODB_URL == null) {
        throw Error(
            `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
        );
    }
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    try {
        await client.connect();
        //1.Adding csv file to mongo Atlas
        await convertData(client);

        //2.Finding total population of a country by year
        await getTotalPopulationByYear(client, 'Netherlands');

        //3.Finding number of people who are 100+
        await getContinentInformation(client, '100+', '2020');

    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

main();