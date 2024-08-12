import { Container, Typography, Box } from '@mui/material';
import StockPriceApp from './view/StockPriceApp';

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Stock Price Checker
        </Typography>
        <StockPriceApp />
      </Box>
    </Container>
  );
}

export default App;
