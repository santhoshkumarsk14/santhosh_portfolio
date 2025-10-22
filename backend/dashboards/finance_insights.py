import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import yfinance as yf
from datetime import datetime, timedelta

# Set page config
st.set_page_config(page_title="Finance & Investment Insights", page_icon="📈", layout="wide")

# Title
st.title("📈 Finance & Investment Insights")
st.markdown("Stock market analysis with AI trend alerts and risk metrics")

# Sidebar for stock selection
st.sidebar.header("Stock Selection")

# Default stocks
default_stocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']
selected_stocks = st.sidebar.multiselect(
    "Select Stocks",
    options=default_stocks,
    default=['AAPL', 'GOOGL']
)

# Date range
end_date = datetime.now()
start_date = end_date - timedelta(days=365)
date_range = st.sidebar.date_input(
    "Select Date Range",
    value=(start_date.date(), end_date.date()),
    min_value=start_date.date() - timedelta(days=365*2),
    max_value=end_date.date()
)

# Fetch stock data
@st.cache_data
def fetch_stock_data(tickers, start, end):
    data = {}
    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(start=start, end=end)
            data[ticker] = hist
        except Exception as e:
            st.error(f"Error fetching data for {ticker}: {e}")
            data[ticker] = pd.DataFrame()
    return data

if selected_stocks:
    stock_data = fetch_stock_data(selected_stocks, date_range[0], date_range[1])

    # Create subplots
    fig = make_subplots(
        rows=len(selected_stocks), cols=1,
        shared_xaxes=True,
        vertical_spacing=0.05,
        subplot_titles=[f"{stock} Price" for stock in selected_stocks]
    )

    colors = ['blue', 'red', 'green', 'orange', 'purple', 'brown']

    for i, stock in enumerate(selected_stocks):
        if not stock_data[stock].empty:
            df = stock_data[stock]
            fig.add_trace(
                go.Candlestick(
                    x=df.index,
                    open=df['Open'],
                    high=df['High'],
                    low=df['Low'],
                    close=df['Close'],
                    name=stock,
                    increasing_line_color=colors[i % len(colors)],
                    decreasing_line_color='gray'
                ),
                row=i+1, col=1
            )

    fig.update_layout(
        height=400 * len(selected_stocks),
        title_text="Stock Price Candlestick Charts",
        showlegend=False
    )

    fig.update_xaxes(rangeslider_visible=False)
    st.plotly_chart(fig, use_container_width=True)

    # Moving averages and risk metrics
    st.header("📊 Technical Analysis")

    col1, col2 = st.columns(2)

    with col1:
        st.subheader("Moving Averages")
        for stock in selected_stocks:
            if not stock_data[stock].empty:
                df = stock_data[stock]
                df['MA20'] = df['Close'].rolling(window=20).mean()
                df['MA50'] = df['Close'].rolling(window=50).mean()

                fig = go.Figure()
                fig.add_trace(go.Scatter(x=df.index, y=df['Close'], mode='lines', name='Close Price'))
                fig.add_trace(go.Scatter(x=df.index, y=df['MA20'], mode='lines', name='20-day MA'))
                fig.add_trace(go.Scatter(x=df.index, y=df['MA50'], mode='lines', name='50-day MA'))
                fig.update_layout(title=f"{stock} Moving Averages", height=300)
                st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.subheader("Risk Metrics")
        risk_data = []
        for stock in selected_stocks:
            if not stock_data[stock].empty:
                df = stock_data[stock]
                returns = df['Close'].pct_change().dropna()
                volatility = returns.std() * np.sqrt(252)  # Annualized volatility
                sharpe_ratio = returns.mean() / returns.std() * np.sqrt(252) if returns.std() != 0 else 0
                max_drawdown = (df['Close'] / df['Close'].cummax() - 1).min()

                risk_data.append({
                    'Stock': stock,
                    'Volatility': f"{volatility:.2%}",
                    'Sharpe Ratio': f"{sharpe_ratio:.2f}",
                    'Max Drawdown': f"{max_drawdown:.2%}"
                })

        risk_df = pd.DataFrame(risk_data)
        st.table(risk_df)

    # AI Trend Alert Section
    st.header("🤖 AI Trend Alerts")

    if st.button("Analyze Trends"):
        st.info("AI Analysis: Scanning for unusual patterns...")

        # Mock AI analysis
        alerts = []
        for stock in selected_stocks:
            if not stock_data[stock].empty:
                df = stock_data[stock]
                recent_return = (df['Close'].iloc[-1] / df['Close'].iloc[-5] - 1)
                volatility = df['Close'].pct_change().std()

                if abs(recent_return) > 0.05:  # 5% change in 5 days
                    alert_type = "Bullish" if recent_return > 0 else "Bearish"
                    alerts.append(f"🚨 {alert_type} signal for {stock}: {recent_return:.1%} change in recent days")
                elif volatility > 0.03:  # High volatility
                    alerts.append(f"⚠️ High volatility detected for {stock}")

        if alerts:
            for alert in alerts:
                st.warning(alert)
        else:
            st.success("No unusual patterns detected. Markets appear stable.")

    # Portfolio comparison
    st.header("📊 Portfolio Comparison")

    if len(selected_stocks) > 1:
        # Normalize prices to compare performance
        normalized_prices = {}
        for stock in selected_stocks:
            if not stock_data[stock].empty:
                df = stock_data[stock]
                normalized_prices[stock] = df['Close'] / df['Close'].iloc[0] * 100

        comparison_df = pd.DataFrame(normalized_prices)

        fig = px.line(comparison_df, title="Normalized Price Comparison (Base = 100)")
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

else:
    st.warning("Please select at least one stock to analyze.")

# Disclaimer
st.markdown("---")
st.caption("Disclaimer: This is for educational purposes only. Not financial advice. Past performance does not guarantee future results.")