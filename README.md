[![Build Status](https://travis-ci.org/mau11/emanie.svg?branch=master)](https://travis-ci.org/mau11/emanie)

# Emanie

> An online community for yarn crafters.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Setting up MySQL Database](#setting-up-mysql-database)
1. [Contributing](#contributing)
1. [View Application](#view-application)

## Usage

> Log in to access pattern, yarn and tools tracking.

## Requirements

- Node 6.9.1
- NPM 4.0.2
- MySQL 5.7

## Development

### Installing Dependencies

From within the root directory:

```sh
$ npm install
```

### Setting up MySQL Database
1. Create a database named 'emanie'.
1. In 'emanie', use the following queries to create four tables:

> Profiles Table:
```sh
CREATE TABLE IF NOT EXISTS profiles (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(50) UNIQUE,
  displayName varchar(20) DEFAULT 'user',
  pic varchar(50) DEFAULT '../img/defaultIcon.png',
  craftName varchar(20),
  bio varchar(150),
  authId varchar(30) UNIQUE,
  PRIMARY KEY (id)
  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
 ```

> Patterns Table:
 ```sh
 CREATE TABLE IF NOT EXISTS patterns (
  id int(11) NOT NULL AUTO_INCREMENT,
  authId varchar(30),
  email varchar(50),
  pName varchar(20),
  craft varchar(20),
  tools varchar(50),
  notes varchar(500),
  src varchar(100),
  PRIMARY KEY (id)
  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
```

> Yarn Table:
```sh
CREATE TABLE IF NOT EXISTS yarn (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(50),
  authId varchar(30),
  color varchar(20),
  weight varchar(20),
  brand varchar(50),
  amount varchar(20),
  notes varchar(200),
  PRIMARY KEY (id)
  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
```

> Tools Table
```sh
CREATE TABLE IF NOT EXISTS tools (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(50),
  authId varchar(30),
  craft varchar(20),
  tool varchar(20),
  size varchar(20),
  material varchar(20),
  notes varchar(200),
  PRIMARY KEY (id)
  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
```

### Running Server
From root directory
```
$ node server.js
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## View Application
For development, in your browser, navigate to
```sh
http://localhost:8080
```
Visit the deployed Emanie at: http://emanie.us-east-1.elasticbeanstalk.com/
