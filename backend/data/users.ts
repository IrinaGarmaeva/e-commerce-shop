


import { genSaltSync, hashSync } from "bcrypt-ts";

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: hashSync('123456', genSaltSync(10)),
    isAdmin: true
  },
  {
    name: "Irina",
    email: "irina@email.com",
    password: hashSync('123456', genSaltSync(10)),
    isAdmin: false
  },
  {
    name: "Nemanja",
    email: "nemanja@email.com",
    password: hashSync('123456', genSaltSync(10)),
    isAdmin: false
  }
]


export default users;
