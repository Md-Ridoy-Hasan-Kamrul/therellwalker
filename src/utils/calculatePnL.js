const POINT_VALUES = {
  NQ: 20,
  YM: 5,
  ES: 50,
  MNQ: 2,
  MYM: 0.5,
  MES: 5,
};

const calculatePnL = (entryPrice, exitPrice, quantity, direction, ticker) => {
  const entry = Number(entryPrice);
  const exit = Number(exitPrice);
  const qty = Number(quantity);

  const pointValue = POINT_VALUES[ticker?.toUpperCase()] || 20;

  let pointDifference = 0;
  let pnl = 0;

  if (direction === 'Long') {
    pointDifference = exit - entry;
  } else {
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
