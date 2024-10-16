﻿# Cryptocurrency Tracker API

## Live Link of Project 
**https://cryptoassignment-1.onrender.com**
### that will return the latest data about the requested cryptocurrency.
**https://cryptoassignment-1.onrender.com/api/servers/stats?coin=bitcoin**
### Implement an API, /deviation, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
**https://cryptoassignment-1.onrender.com/api/servers/deviation?coin=bitcoin**

This project is a server-side application built with **Node.js** and **MongoDB**, which periodically fetches the current price, market cap, and 24-hour change for three cryptocurrencies (Bitcoin, Matic, and Ethereum) using the **CoinGecko API**. The data is stored in a MongoDB database and provides APIs to fetch the latest statistics and calculate the standard deviation of prices.

## Features

1. **Background Job:** Every 2 hours, the server fetches the latest cryptocurrency data (price, market cap, and 24h change) and stores it in the database.
2. **API for Latest Stats:** Fetch the latest data for a given cryptocurrency.
3. **API for Standard Deviation:** Calculate and return the standard deviation of the price for the last 100 records of a given cryptocurrency.
4. **Optional Deployment:** The database can be deployed using **MongoDB Atlas** and the backend can be deployed on **Heroku**, **AWS**, or **GCP**.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Task Scheduling:** node-cron
- **API Integration:** CoinGecko API
- **Environment Management:** dotenv

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB setup (MongoDB Atlas or local instance)
- API keys (if necessary for MongoDB or deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker

## Api EndPoints
### that will return the latest data about the requested cryptocurrency.
**http://localhost:5000/api/servers/stats?coin=bitcoin**
###  Implement an API, /deviation, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
**http://localhost:5000/api/servers/deviation?coin=bitcoin**

