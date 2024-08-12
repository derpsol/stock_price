# Stock Price Checker

## Overview

The Stock Price Checker is a React application that allows users to retrieve and display real-time stock prices by entering a stock symbol (e.g., AAPL for Apple Inc.). The application leverages the Finnhub API for fetching stock data and utilizes WebSocket connections to receive live updates of stock prices.

## Features

- **Real-Time Stock Price Updates**: The application provides real-time updates of stock prices using WebSocket.
- **Error Handling**: Graceful handling of errors such as invalid stock symbols, WebSocket connection issues, and API errors.
- **User-Friendly Interface**: A simple and intuitive interface built with Material-UI, allowing users to easily input stock symbols and view live stock prices.

## Technology Stack

- **React**: The front-end framework used to build the user interface.
- **TypeScript**: Enhances the development experience by providing static type checking.
- **Material-UI**: A popular React UI framework used to create a responsive and modern user interface.
- **Axios**: A promise-based HTTP client for making API requests to the Finnhub REST API.
- **Finnhub API**: Provides real-time financial data, including stock prices.
- **WebSocket**: Used for receiving real-time updates on stock prices.

## Project Setup

### Prerequisites

- **Node.js** (>= 12.x)
- **npm** (>= 6.x) or **yarn**
- **Finnhub API Key**: You need to sign up for an API key from [Finnhub](https://finnhub.io/).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/derpsol/stock_price.git
    cd stock_price
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add your Finnhub API key:

    ```bash
    REACT_APP_FINNHUB_API_KEY=your_finnhub_api_key_here
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open the application in your browser:

    ```
    http://localhost:3000
    ```

## Project Structure

```plaintext
src/
├── components/
│   └── StockPriceApp.tsx  # Main component handling stock price retrieval and WebSocket connection
├── App.tsx                # Main application component
├── index.tsx              # Entry point for the React application
├── styles/
│   └── global.css         # Global styles for the application (optional)
├── assets/                # Images, icons, and other static assets (optional)
└── types/                 # TypeScript interfaces and types (optional)