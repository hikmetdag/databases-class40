export const insertValues = [
    `INSERT INTO account (balance)
      VALUES
      (5000),
      (3000),
      (5000);`,

    `INSERT INTO account_changes (account_number,amount,changed_date,remark)
      VALUES
      (101,100,"2022-10-22","remark1"),
      (102,100,"2022-10-23","remark2")`
];