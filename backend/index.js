import express from 'express'
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
   
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0      
})

const salt=5
const JWT_SECRET=process.env.JWT_SECRET||"secretKey";

const tab = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
)`

db.query(tab, (err, result) => {
  if (err) {
    console.error("Error creating table:", err)
  } else {
    console.log("✅ 'users' table is ready.")
  }
})



app.post("/regester",(req,res)=>{
  const sql ="INSERT INTO users(username,email,password)  VALUES(?,?,?)"

  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please provide username, email, and password" })
  }

  const checkEmail = "SELECT * FROM users WHERE email = ?"
  db.query(checkEmail, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" })

    if (results.length > 0) {
      return res.status(409).json({ error: "Email already exists" }) // 409 = Conflict
    }

  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) return res.status(500).json({ error: "Error hashing password" })

    // Pass parameters separately, not as an array inside an array
    db.query(sql, [username, email, hash], (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: "Database error" })
      }

    const userId=result.userId
    const token=jwt.sign({id:userId,username},JWT_SECRET,{expiresIn:"1hr"})


      return res.json({ message: "User registered successfully", token })
    })
  })
})
})

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });

  }

  const findUser = "SELECT * FROM users WHERE email = ?";
  db.query(findUser, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Error comparing passwords" });

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
       
      const token = jwt.sign({id:user.id, username:user.username},JWT_SECRET,{expiresIn:"1hr"})
      // Password matched
      return res.json({ message: "Login successful",token });
    });
  });
});

app.post("/logout",(req,res)=>{

  res.json({ message: 'Logged out successfully' });
})


app.listen(5174,()=>{
  console.log("we are listening")
})