# CyberSphere

## Description

Link to deployed page: [https://cybersphere-blogwebsite-7cc11a4d21d7.herokuapp.com/](https://cybersphere-blogwebsite-7cc11a4d21d7.herokuapp.com/)

This is a blog website that was made during a web development bootcamp and UCB Extenstion. This is a full stack application that uses a MySQL database to store and maintain user account information, blog posts and their comments. The project makes use of the following packages: Bcrypt, Connect-session-sequelize, Dotenv, Express, Express-handlebars, Handbars, Express-session, MySQL2, and Sequelize.

Desktop Landing Page:

![1691813211305](image/README/1691813211305.png)

Mobile Landing Page:

![1691813187659](image/README/1691813187659.png)

## Installation

For Development:

1. Clone or fork the repository using "git@github.com:MeanBean87/blog-website.git"
2. Navigate to the root directory of the project using CLI.
3. Install node modules using "npm install"
4. Create a .env file to store your MySQL credentials
5. Create the database by running "mysql -u root -p" then enter your password.
6. Once you are connected to MySQL, from the CLI type: "source /db/schema.sql"

**MySQL and Node.js will need to be installed by the user.**

Link to MySQL Downloads: [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/)

Link to Node.js Downloads: [https://nodejs.org/en](https://nodejs.org/en)

## Usage

1. Visit the deployed page at [https://cybersphere-blogwebsite-7cc11a4d21d7.herokuapp.com/](https://cybersphere-blogwebsite-7cc11a4d21d7.herokuapp.com/)
2. Create a new user account using the "SignUp" nav link.
3. Once you have created a new user account you will be able to comment on posts, or create a new post. The first page displayed will be the dashboard with a button to create a new post. Text fields are limited to 255 max character length.
4. From there you can navigate using the nav links to the home directory to view other users blog posts and if logged in you will be able to comment. - note you must be logged in to comment on other users posts.
5. When you are finished you may logout or leave the page. - the cookie will be valid for 30 minutes, after 30 minutes you will need to login again to post comments or blog posts.

## Code Highlights

Code snippet of the user model created with Sequelize.

```javascript
class User extends Model {
  validatePassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: "user",
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
  }
);

```

## Learning Points

Building MySQL Databases, Tables, Cookies and authentication handling. Alternatives to storing plain text passwords using databases. Front end / Back end integration using Restful routes. Creating and manipulating data using MySQL. 

[![Node.js](https://camo.githubusercontent.com/98c6a87dede0251b4484828c3c179da74eece5af481680bb3e32286a345618c3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d31342e782d3333393933333f6c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465267374796c653d666c6174)](https://camo.githubusercontent.com/98c6a87dede0251b4484828c3c179da74eece5af481680bb3e32286a345618c3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d31342e782d3333393933333f6c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465267374796c653d666c6174) [![MySQL](https://camo.githubusercontent.com/ad37128eae4f90a292bd75627a4f9b133944c6d8ed0972a308785d0a39c0d34d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c2d382e302d626c75653f6c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465267374796c653d666c6174)](https://camo.githubusercontent.com/ad37128eae4f90a292bd75627a4f9b133944c6d8ed0972a308785d0a39c0d34d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c2d382e302d626c75653f6c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465267374796c653d666c6174) [![MySQL2](https://camo.githubusercontent.com/806a97f8f171800d790357bc261302aafcbcc40d5edb79f87c950f2d9e32b746/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c322d322e332d626c75653f6c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465267374796c653d666c6174)](https://camo.githubusercontent.com/806a97f8f171800d790357bc261302aafcbcc40d5edb79f87c950f2d9e32b746/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953514c322d322e332d626c75653f6c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465267374796c653d666c6174) [![JavaScript](https://camo.githubusercontent.com/65e648bd1d62bd4035c4a69ff92a7442d29d4d5e875f489152f5c2ab2400ed00/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4553362d6637646631653f6c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b267374796c653d666c6174)](https://camo.githubusercontent.com/65e648bd1d62bd4035c4a69ff92a7442d29d4d5e875f489152f5c2ab2400ed00/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4553362d6637646631653f6c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b267374796c653d666c6174) [![SQL](https://camo.githubusercontent.com/2f538092f7185762c9f8b2be1d57c6c3cf165b89668f383d0b63a2300c6130a1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53514c2d537472756374757265645f51756572795f4c616e67756167652d4646413530303f6c6f676f3d73716c266c6f676f436f6c6f723d7768697465267374796c653d666c6174)](https://camo.githubusercontent.com/2f538092f7185762c9f8b2be1d57c6c3cf165b89668f383d0b63a2300c6130a1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53514c2d537472756374757265645f51756572795f4c616e67756167652d4646413530303f6c6f676f3d73716c266c6f676f436f6c6f723d7768697465267374796c653d666c6174) ![Bcrypt](https://img.shields.io/badge/Bcrypt-Encryption-blue) ![Express-session](https://img.shields.io/badge/Express--session-Session%20Management-green)![Connect-session-sequelize](https://img.shields.io/badge/Connect--session--sequelize-Session%20Management-green) ![Dotenv](https://img.shields.io/badge/Dotenv-Configuration-yellow) ![Express](https://img.shields.io/badge/Express-Framework-orange) ![Express-handlebars](https://img.shields.io/badge/Express--handlebars-View%20Engine-red) ![Handlebars](https://img.shields.io/badge/Handlebars-Templating-lightgrey) ![Sequelize](https://img.shields.io/badge/Sequelize-ORM-brightgreen)

1. Express

## Author

Michael Mattingly

* [GitHub](https://github.com/MeanBean87)
* [LinkedIn](https://www.linkedin.com/in/michael-mattingly-5580b1280/)

This project was created with source code provided from UC Berkeley Extension.

This project uses the following packages:

* Node.js - [https://nodejs.org/en](https://nodejs.org/en)
* MySQL - [https://www.mysql.com/](https://www.mysql.com/)
* MySQL2 - [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
* Bcrypt - [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
* Connect-session-sequelize - [https://www.npmjs.com/package/connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* Dotenv - [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
* Express - [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)
* Express-handlebars - [https://www.npmjs.com/package/express-handlebars](https://www.npmjs.com/package/express-handlebars)
* Handlebars - [https://www.npmjs.com/package/handlebars](https://www.npmjs.com/package/handlebars)
* Express-session - [https://www.npmjs.com/package/express-session](https://www.npmjs.com/package/express-session)
* MySQL2 - [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
* Sequelize - [https://www.npmjs.com/package/sequelize](https://www.npmjs.com/package/sequelize)

## License

This project is licensed under the [MIT License](https://github.com/MeanBean87/readme-generator/blob/main/LICENSE). Please refer to the LICENSE file for more details.
