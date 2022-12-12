export const createTables=[
    `CREATE TABLE if not exists account (
          account_number INT NOT NULL AUTO_INCREMENT,
          balance INT NOT NULL,
          PRIMARY KEY (account_number)
          );`,
  
    `ALTER TABLE account AUTO_INCREMENT = 100`,
    
    `CREATE TABLE if not exists account_changes (
          change_number INT NOT NULL AUTO_INCREMENT,
          account_number INT NOT NULL,
          amount INT NOT NULL,
          changed_date DATE NOT NULL,
          remark varchar(128) NOT NULL,
          PRIMARY KEY (change_number),
          FOREIGN KEY (account_number) REFERENCES account (account_number)
        );`,
  ];