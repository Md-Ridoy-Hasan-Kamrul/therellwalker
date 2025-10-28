// Point values for different tickers
const POINT_VALUES = {
  // Regular Contracts
  NQ: 20,
  YM: 5,
  ES: 50,
  // Micro Contracts
  MNQ: 2,
  MYM: 0.5,
  MES: 5,
};

/**
 * Calculate Profit & Loss for a trade
 * @param {number} entryPrice - Entry price of the trade
 * @param {number} exitPrice - Exit price of the trade
 * @param {number} quantity - Number of contracts
 * @param {string} direction - Trade direction ('Long' or 'Short')
 * @param {string} ticker - Ticker symbol (NQ, YM, ES, MNQ, MYM, MES)
 * @returns {Object} - { pnl: number, isProfitable: boolean }
 */
const calculatePnL = (entryPrice, exitPrice, quantity, direction, ticker) => {
  const entry = Number(entryPrice);
  const exit = Number(exitPrice);
  const qty = Number(quantity);

  // Get point value for the ticker, default to NQ if unknown
  const pointValue = POINT_VALUES[ticker?.toUpperCase()] || 20;

  let pointDifference = 0;
  let pnl = 0;

  // Calculation Logic:
  // Long: PnL = (Exit - Entry) * Qty * Point Value
  //   - Win: Exit > Entry (positive difference)
  //   - Loss: Exit < Entry (negative difference)
  // Short: PnL = (Entry - Exit) * Qty * Point Value
  //   - Win: Entry > Exit (positive difference)
  //   - Loss: Entry < Exit (negative difference)

  if (direction === 'Long') {
    pointDifference = exit - entry;
  } else {
    // Short
    pointDifference = entry - exit;
  }

  pnl = pointDifference * qty * pointValue;

  return {
    pnl: pnl,
    isProfitable: pnl >= 0,
  };
};

export { calculatePnL, POINT_VALUES };
export default calculatePnL;
