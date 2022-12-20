 const transactions = async (
    client,
    sender,
    receiver,
    amount,
    remark
) => {
    const session = client.startSession();
    const helper_changeNumber = async (sender) => {
        const findAccount = await client
            .db("databaseWeek4")
            .collection("accounts")
            .findOne({ account_number: sender });

        return findAccount.account_changes.length + 1;
    };
    try {
        await session.withTransaction(async () => {
            await client
                .db("databaseWeek4")
                .collection("accounts")
                .updateOne(
                    { account_number: sender },
                    {
                        $inc: { balance: -amount },
                        $push: {
                            account_changes: {
                                change_number: await helper_changeNumber(sender),
                                amount: -amount,
                                date: new Date(),
                                remark: remark,
                            },
                        },
                    },
                    { session }
                );

            await client
                .db("databaseWeek4")
                .collection("accounts")
                .updateOne(
                    { account_number: receiver },
                    {
                        $inc: { balance: amount },
                        $push: {
                            account_changes: {
                                change_number: await helper_changeNumber(receiver),
                                amount: amount,
                                date: new Date(),
                                remark: remark,
                            },
                        },
                    },
                    { session }
                );
            console.log(`${amount} euro is transferred!`);
        });
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
    } finally {
        await session.endSession();
    }
};

module.exports = { transactions };
