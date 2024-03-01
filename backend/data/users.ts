import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
    isAdmin: true
  },
  {
    name: "Irina",
    email: "irina@email.com",
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
    isAdmin: false
  },
  {
    name: "Nemanja",
    email: "nemanja@email.com",
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
    isAdmin: false
  }
]


export default users;
