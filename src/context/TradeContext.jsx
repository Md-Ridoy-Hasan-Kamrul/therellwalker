import React, { createContext, useContext, useState } from 'react';

const TradeContext = createContext();

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTradeContext must be used within a TradeProvider');
  }
  return context;
};

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

export const TradeProvider = ({ children }) => {
  const [trades, setTrades] = useState([
    {
      id: '#005',
      dateTime: '10/16/2025 11:31 AM',
      ticker: 'ES',
      direction: 'Short',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#004',
      dateTime: '10/17/2025 10:08 PM',
      ticker: 'ES',
      direction: 'Long',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#003',
      dateTime: '10/16/2025 11:31 AM',
      ticker: 'ES',
      direction: 'Long',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#002',
      dateTime: '10/16/2025 11:31 PM',
      ticker: 'ES',
      direction: 'Short',
      entry: '$0.00',
      exit: '$0.00',
      qty: 1,
      pnl: '+$0.00',
      isProfitable: true,
      notes: '-',
    },
    {
      id: '#001',
      dateTime: '10/17/2025 00:30 AM',
      ticker: 'YM',
      direction: 'Long',
      entry: '$8000.00',
      exit: '$2000.00',
      qty: 1,
      pnl: '$-6000.00',
      isProfitable: false,
      notes: '-',
    },
  ]);

  const calculatePnL = (entryPrice, exitPrice, quantity, direction, ticker) => {
    const entry = Number(entryPrice);
    const exit = Number(exitPrice);
    const qty = Number(quantity);

    // Get point value for the ticker
    const pointValue = POINT_VALUES[ticker.toUpperCase()] || 20; // Default to NQ if unknown

    let pointDifference = 0;
    let pnl = 0;

    // Calculate based on direction and win/loss logic
    if (direction === 'Long') {
      // Long: Exit - Entry
      pointDifference = exit - entry;
      pnl = pointDifference * qty * pointValue;
    } else {
      // Short: Entry - Exit
      pointDifference = entry - exit;
      pnl = pointDifference * qty * pointValue;
    }

    return {
      pnl: pnl,
      isProfitable: pnl >= 0,
    };
  };

  const addTrade = (tradeData) => {
    // Calculate P&L
    const { pnl, isProfitable } = calculatePnL(
      tradeData.entryPrice,
      tradeData.exitPrice,
      tradeData.quantity,
      tradeData.direction,
      tradeData.ticker
    );

    // Generate new trade ID
    const tradeIds = trades.map((t) => parseInt(t.id.replace('#', '')));
    const maxId = Math.max(...tradeIds, 0);
    const newId = `#${String(maxId + 1).padStart(3, '0')}`;

    // Format date and time with AM/PM
    const dateTime = `${tradeData.date} ${tradeData.time} ${tradeData.period}`;

    // Create new trade object
    const newTrade = {
      id: newId,
      dateTime: dateTime,
      ticker: tradeData.ticker,
      direction: tradeData.direction,
      entry: `$${Number(tradeData.entryPrice).toFixed(2)}`,
      exit: `$${Number(tradeData.exitPrice).toFixed(2)}`,
      qty: Number(tradeData.quantity),
      pnl: pnl >= 0 ? `+$${pnl.toFixed(2)}` : `$${pnl.toFixed(2)}`,
      isProfitable: isProfitable,
      notes: tradeData.notes || '-',
    };

    // Add to the beginning of the array (most recent first)
    setTrades((prevTrades) => [newTrade, ...prevTrades]);

    return newTrade;
  };

  const value = {
    trades,
    addTrade,
    calculatePnL,
  };

  return (
    <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  );
};
