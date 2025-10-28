import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculatePnL, POINT_VALUES } from '../utils/calculatePnL';

const TradeContext = createContext();

export const useTradeContext = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTradeContext must be used within a TradeProvider');
  }
  return context;
};

export const TradeProvider = ({ children }) => {
  // Load trades from localStorage or use sample data
  const [trades, setTrades] = useState(() => {
    const savedTrades = localStorage.getItem('ledger_trades');
    if (savedTrades) {
      return JSON.parse(savedTrades);
    }

    // Sample test data from requirements
    return [
      {
        id: '004',
        dateTime: '10/13/25 02:00:00 PM',
        ticker: 'YM',
        direction: 'Short',
        entryPrice: 38000,
        exitPrice: 37900,
        stopLoss: 0,
        takeProfit: 0,
        qty: 2,
        pnl: 1000,
        isProfitable: true,
        notes: 'Short win test',
      },
      {
        id: '003',
        dateTime: '10/12/25 03:00:00 PM',
        ticker: 'NQ',
        direction: 'Long',
        entryPrice: 16000,
        exitPrice: 15950,
        stopLoss: 0,
        takeProfit: 0,
        qty: 1,
        pnl: -1000,
        isProfitable: false,
        notes: 'Long loss test',
      },
      {
        id: '002',
        dateTime: '10/11/25 11:00:00 AM',
        ticker: 'YM',
        direction: 'Short',
        entryPrice: 38000,
        exitPrice: 38100,
        stopLoss: 0,
        takeProfit: 0,
        qty: 1,
        pnl: -500,
        isProfitable: false,
        notes: 'Short loss test',
      },
      {
        id: '001',
        dateTime: '10/10/25 09:30:00 AM',
        ticker: 'NQ',
        direction: 'Long',
        entryPrice: 16000,
        exitPrice: 16100,
        stopLoss: 0,
        takeProfit: 0,
        qty: 2,
        pnl: 4000,
        isProfitable: true,
        notes: 'Long win test',
      },
    ];
  });

  // Starting balance for equity curve
  const [startingBalance] = useState(10000);

  // Save trades to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ledger_trades', JSON.stringify(trades));
  }, [trades]);

  const addTrade = (tradeData) => {
    // Calculate P&L using the utility function
    const { pnl, isProfitable } = calculatePnL(
      tradeData.entryPrice,
      tradeData.exitPrice,
      tradeData.quantity,
      tradeData.direction,
      tradeData.ticker
    );

    // Generate sequential Trade ID (001, 002, 003...)
    const tradeIds = trades.map((t) => parseInt(t.id));
    const maxId = trades.length > 0 ? Math.max(...tradeIds) : 0;
    const newId = String(maxId + 1).padStart(3, '0');

    // Format date and time properly (MM/DD/YY HH:MM:SS AM/PM)
    const dateTime = `${tradeData.date} ${tradeData.time} ${tradeData.period}`;

    // Create new trade object
    const newTrade = {
      id: newId,
      dateTime: dateTime,
      ticker: tradeData.ticker,
      direction: tradeData.direction,
      entryPrice: Number(tradeData.entryPrice),
      exitPrice: Number(tradeData.exitPrice),
      stopLoss: Number(tradeData.stopLoss) || 0,
      takeProfit: Number(tradeData.takeProfit) || 0,
      qty: Number(tradeData.quantity),
      pnl: pnl,
      isProfitable: isProfitable,
      notes: tradeData.notes || '-',
    };

    // Add to the array (most recent first)
    setTrades((prevTrades) => [newTrade, ...prevTrades]);

    return newTrade;
  };

  // Calculate statistics
  const getStatistics = () => {
    if (trades.length === 0) {
      return {
        winRate: 0,
        totalProfit: 0,
        avgTakeProfit: 0,
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        longStats: { wins: 0, losses: 0, totalPnL: 0 },
        shortStats: { wins: 0, losses: 0, totalPnL: 0 },
      };
    }

    const winningTrades = trades.filter((t) => t.isProfitable);
    const totalProfit = trades.reduce((sum, t) => sum + t.pnl, 0);
    const winRate = (winningTrades.length / trades.length) * 100;

    // Calculate average take profit for winning trades only
    const avgTakeProfit =
      winningTrades.length > 0
        ? winningTrades.reduce((sum, t) => sum + Math.abs(t.pnl), 0) /
          winningTrades.length
        : 0;

    // Calculate stats by direction
    const longTrades = trades.filter((t) => t.direction === 'Long');
    const shortTrades = trades.filter((t) => t.direction === 'Short');

    const longStats = {
      wins: longTrades.filter((t) => t.isProfitable).length,
      losses: longTrades.filter((t) => !t.isProfitable).length,
      totalPnL: longTrades.reduce((sum, t) => sum + t.pnl, 0),
    };

    const shortStats = {
      wins: shortTrades.filter((t) => t.isProfitable).length,
      losses: shortTrades.filter((t) => !t.isProfitable).length,
      totalPnL: shortTrades.reduce((sum, t) => sum + t.pnl, 0),
    };

    return {
      winRate,
      totalProfit,
      avgTakeProfit,
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: trades.length - winningTrades.length,
      longStats,
      shortStats,
    };
  };

  // Get equity curve data
  const getEquityCurveData = () => {
    if (trades.length === 0) {
      return [{ tradeId: '000', equity: startingBalance }];
    }

    // Sort trades by ID (oldest first for cumulative calculation)
    const sortedTrades = [...trades].sort(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );

    let runningEquity = startingBalance;
    const equityData = [{ tradeId: '000', equity: startingBalance }];

    sortedTrades.forEach((trade) => {
      runningEquity += trade.pnl;
      equityData.push({
        tradeId: trade.id,
        equity: runningEquity,
        pnl: trade.pnl,
      });
    });

    return equityData;
  };

  const value = {
    trades,
    addTrade,
    calculatePnL,
    getStatistics,
    getEquityCurveData,
    startingBalance,
  };

  return (
    <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  );
};
