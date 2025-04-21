import dotenv from 'dotenv';

import getPool from './getPool.js';

dotenv.config();

const initDB = async () => {
    try {
        let pool = await getPool();

        console.log('Eliminando base de datos...');

        await pool.query('DROP DATABASE IF EXISTS MiniTwitter');
        
        console.log('Creando base de datos MiniTwitter...');

        await pool.query('CREATE DATABASE MiniTwitter');

        await pool.query('USE MiniTwitter');
        
        console.log('Borrando tablas...');

        await pool.query('DROP TABLE IF EXISTS tweets');
        await pool.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                firstName VARCHAR(50) DEFAULT NULL,
                lastName VARCHAR(50) DEFAULT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100) DEFAULT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS tweets (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            userId INT NOT NULL,
            text VARCHAR(280) NOT NULL,
            image VARCHAR(100),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (userId) REFERENCES users(id)
        )
     `);

     console.log('Tablas creadas!');
     process.exit(0);


    } catch (error) {
        console.log(error);
    }
};

initDB();
