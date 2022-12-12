import mysql from "mysql";
import { createTables } from "./transactions-create-tables.js";
import { insertValues } from "./transactions-insert-values.js";

const transactionQueries = [
    `START TRANSACTION;`,
    `UPDATE account
              SET balance = balance - 1000
              WHERE account_number = 101;`,

    `INSERT INTO account_changes (account_number, amount, changed_date, remark)
              VALUES (101, 1000, "2022-12-05", "Transfer to 102");`,

    `UPDATE account
              SET balance = balance + 1000
              WHERE account_number = 102;`,

    `INSERT INTO account_changes (account_number, amount, changed_date, remark)
              VALUES (102, 1000, "2022-12-05", "Get from 101");`

];

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "week3",
});

connection.connect();
const dropDb = ['DROP DATABASE IF EXISTS week3'];
const createDb = ['CREATE DATABASE IF NOT EXISTS week3'];
const useDb = ['USE week3'];

try {
    // Creating the tables and the data:
    await executeQuery(dropDb);
    await executeQuery(createDb);
    await executeQuery(useDb);
    await executeQuery(createTables);
    await executeQuery(insertValues);

    // Executing transaction queries:
    await executeQuery(transactionQueries);
    connection.commit();
} catch (error) {
    connection.rollback();
    console.log(error);
}

connection.end();

async function executeQuery(array) {
    array.forEach((queryElement) => {
        connection.query(queryElement, function (error, results) {
            if (error) {
                throw error;
            } else {
                console.table(results);
            }
        });
    });
}