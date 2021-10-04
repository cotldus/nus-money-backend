const express = require("express");
// const data = require('./data');
const database = require('./database');
router = express.Router();


//http://localhost:3000/user/all
router.get("/user/all", (request, response) => {
  // let users = data.get_all_users();
  // response.send(users);

  database.connection.query(`select * from Users`, (errors, records) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("An error occurred in the backend");
    } else {
      response.status(200).send(records);
    }
  });
});


//http://localhost:3000/user/by-uid?user_id=1
router.get("/user/by-uid", (request,response)=>{
  // let user_id = request.query.user_id;
  // let user = data.get_user_by_user_id(user_id);// get a user based on user_id I get in the request.
  // response.send(user);

  database.connection.query(
    `select * from Users where user_id = '${request.query.user_id}'`,
    (errors, records) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("An error occurred in the backend");
      } else {
        response.status(200).send(records);
      }
    }
  );
})

//http://localhost:3000/user/by-username?username=Anatole
router.get("/user/by-username", (request,response)=>{
  // let user_id = request.query.user_id;
  // let user = data.get_user_by_user_id(user_id);// get a user based on user_id I get in the request.
  // response.send(user);

  database.connection.query(
    `select * from Users where username = '${request.query.username}'`,
    (errors, records) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("An error occurred in the backend");
      } else {
        response.status(200).send(records);
      }
    }
  );
})

//http://localhost:3000/user/add
router.post('/user/add', (request, response) => {
  let user = request.body;
  // data.add_user(user);

  // response.send("Added successfully");

  database.connection.query(
    `insert into Users (user_id, username, password, email, mobile, ic_number)
    values ('${user.user_id}', '${user.username}', '${user.password}', '${user.email}', ${user.mobile}, ${user.ic_number})`,
    (errors) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred at the backend");
      } else {
        response.status(200).send("Created new user!");
      }
    }
  );
})


module.exports = { router };
