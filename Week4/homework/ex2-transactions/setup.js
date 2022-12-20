const createSetUp = async (client) => {
    await client.db("databaseWeek4").collection("accounts").drop();
    await client.db("databaseWeek4").createCollection("accounts", (err, res) => {
        if (err) throw err;
        console.log("Accounts collection is created!");
    });


    await client.db("databaseWeek4").collection("accounts").deleteMany();
    await client.db("databaseWeek4").collection("accounts").insertMany(

        [
            {
                account_number: 100,
                balance: 1000,
                account_changes: [
                    {
                        change_number: 1,
                        amount: 500,
                        changed_date: "2022-12-16 10:00:00",
                        remark: "remark1",
                    },
                ],
            },
            {
                account_number: 101,
                balance: 2000,
                account_changes: [
                    {
                        change_number: 1,
                        amount: 500,
                        changed_date: "2022-12-16 06:00:00",
                        remark: "remark2",
                    },
                ],
            },
            {
                account_number: 102,
                balance: 2500,
                account_changes: [
                    {
                        change_number: 1,
                        amount: 100,
                        changed_date: "2022-12-16 09:00:00",
                        remark: "remark3",
                    },
                ],
            },
            {
                account_number: 103,
                balance: 3500,
                account_changes: [
                    {
                        change_number: 1,
                        amount: 300,
                        changed_date: "2022-12-16 08:00:00",
                        remark: "remark4",
                    },
                ],
            },
        ]
    );
};

module.exports = { createSetUp };