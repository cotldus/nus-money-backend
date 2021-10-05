const express = require("express");
// const data = require("./data");
const database = require('./database');
router = express.Router();
const short = require('short-uuid');

const translator = short(); // Defaults to flickrBase58

//http://localhost:3000/transactions/all
router.get('/transactions/all', (request, response) => {
  // let transactions = data.get_all_transactions();
  // response.send(transactions);

  database.connection.query(`select * from Transactions`, (errors, records) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("An error occurred in the backend");
    } else {
      response.status(200).send(records);
    }
  });
})

//https://nus-moneyapp-backend.herokuapp.com/transactions/by-uid?user_id=61503e85fc13ae62f500003c
router.get("/transactions/by-uid", (request, response) => {
  let user_id = request.query.user_id;
  // let transaction = data.get_transaction_by_user_id(user_id);
  // response.send(transaction);

  database.connection.query(
    `select * from Transactions where user_id = '${user_id}'`,
    (errors, records) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("An error occurred in the backend");
      } else {
        response.status(200).send(records);
      }
    }
  );
});

//https://nus-moneyapp-backend.herokuapp.com/transactions/add
router.post("/transactions/add", (request, response) => {
  let transaction = request.body;
  // data.add_transaction(transaction);
  // console.log(transaction);
  // response.send("Added successfully!");

  // Generate a shortened v4 UUID
  let transaction_id = translator.new(); // mhvXdrZT4jP5T8vBxuvm75

  console.log(transaction_id)

  database.connection.query(
    `insert into Transactions (transaction_id, transaction_type, user_id, transaction_title, amount)
    values ('${transaction_id}', '${transaction.transaction_type}', '${transaction.user_id}', '${transaction.transaction_title}', '${transaction.amount}')`,
    (errors) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred at the backend");
      } else {
        response.status(200).send("Created new transaction!");
      }
    }
  );
});

//https://nus-moneyapp-backend.herokuapp.com/transactions/delete/by-tid?transaction_id=61504ac7fc13ae132b000001
router.get("/transactions/delete/by-tid", (request, response) => {
  let tid = request.query.transaction_id;

  console.log(tid)

  database.connection.query(
    `delete from Transactions where transaction_id='${tid}'`,
    (errors) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred at the backend");
      } else {
        response.status(200).send("Transaction Deleted!");
      }
    }
  );
});


module.exports = { router };
