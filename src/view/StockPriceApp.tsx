import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

// Load environment variables from the .env file
const API_KEY = process.env.REACT_APP_API_KEY;
const FINNHUB_URL = process.env.REACT_APP_FINNHUB_URL;
const FINNHUB_WS_URL = process.env.REACT_APP_FINNHUB_WS_URL;

// Define the interface for the API response to enforce type safety
interface QuoteResponse {
  c: number; // Current price
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}

const StockPriceApp = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Function to fetch the initial stock price from the Finnhub API using Axios
  const fetchStockPrice = async () => {
    setLoading(true);
    setError(null);
    setPrice(null);

    try {
      const response = await axios.get<QuoteResponse>(`${FINNHUB_URL}`, {
        params: {
          symbol: symbol,
          token: API_KEY,
        },
      });

      // Check if the response contains a valid price, and update the state
      if (response.data && response.data.c) {
        setPrice(response.data.c);
      } else {
        setError('Invalid stock symbol. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  // Function to establish a WebSocket connection for real-time price updates
  const connectWebSocket = () => {
    if (ws) {
      ws.close(); 
    }

    // Create a new WebSocket connection to the Finnhub WebSocket API
    const newWs = new WebSocket(`${FINNHUB_WS_URL}?token=${API_KEY}`);
    setWs(newWs);

    // Event handler for when the WebSocket connection is successfully opened
    newWs.onopen = () => {
      newWs.send(JSON.stringify({ type: 'subscribe', symbol: symbol }));
    };

    // Event handler for when a message is received through the WebSocket
    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && data.data && data.data.length > 0) {
        setPrice(data.data[0].p); // Update the price with the latest trade price
      }
    };

    // Event handler for when a WebSocket error occurs
    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket error occurred. Please try again later.');
    };

    // Event handler for when the WebSocket connection is closed
    newWs.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  // useEffect hook to fetch data and establish WebSocket connection when the stock symbol changes
  useEffect(() => {
    if (symbol) {
      fetchStockPrice();
      connectWebSocket();
    }

    // Cleanup function to close the WebSocket connection when the component unmounts or the symbol changes
    return () => {
      if (ws) {
        ws.close(); 
      }
    };
  }, [symbol]);

  // Event handler for form submission to start fetching the stock price and connecting to the WebSocket
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (symbol) {
      connectWebSocket(); 
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Stock Symbol"
          variant="outlined"
          fullWidth
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || !symbol}
        >
          {loading ? <CircularProgress size={24} /> : 'Get Real-Time Price'}
        </Button>
      </form>

      {error && (
        <Typography color="error" variant="body1" marginTop={2}>
          {error}
        </Typography>
      )}

      {price !== null && !error && (
        <Typography variant="h5" marginTop={2}>
          Current Real-Time Price: ${price}
        </Typography>
      )}
    </Box>
  );
};

export default StockPriceApp;
