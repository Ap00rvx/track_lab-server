const express = require('express')
const db= require('./config/database_connection')
const dotenv = require("dotenv")
dotenv.config()


db(process.env.DATABASE_URL);