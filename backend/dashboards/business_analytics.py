import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta

# Set page config
st.set_page_config(page_title="Business Analytics Dashboard", page_icon="📊", layout="wide")

# Title
st.title("📊 Business Analytics Dashboard")
st.markdown("Interactive dashboard for sales and performance analysis with AI-powered predictions")

# Sidebar for filters
st.sidebar.header("Filters")

# Generate sample data
np.random.seed(42)
dates = pd.date_range(start='2023-01-01', end='2024-12-31', freq='D')
n_days = len(dates)

# Sample sales data
sales_data = pd.DataFrame({
    'date': dates,
    'sales': np.random.normal(1000, 200, n_days) + np.sin(np.arange(n_days) * 2 * np.pi / 365) * 300,
    'region': np.random.choice(['North', 'South', 'East', 'West'], n_days),
    'product': np.random.choice(['Product A', 'Product B', 'Product C', 'Product D'], n_days),
    'units': np.random.poisson(50, n_days)
})

sales_data['sales'] = sales_data['sales'].clip(lower=0)

# Date range filter
date_range = st.sidebar.date_input(
    "Select Date Range",
    value=(sales_data['date'].min().date(), sales_data['date'].max().date()),
    min_value=sales_data['date'].min().date(),
    max_value=sales_data['date'].max().date()
)

# Region filter
regions = st.sidebar.multiselect(
    "Select Regions",
    options=sales_data['region'].unique(),
    default=sales_data['region'].unique()
)

# Product filter
products = st.sidebar.multiselect(
    "Select Products",
    options=sales_data['product'].unique(),
    default=sales_data['product'].unique()
)

# Filter data
filtered_data = sales_data[
    (sales_data['date'].dt.date >= date_range[0]) &
    (sales_data['date'].dt.date <= date_range[1]) &
    (sales_data['region'].isin(regions)) &
    (sales_data['product'].isin(products))
]

# KPI Cards
col1, col2, col3, col4 = st.columns(4)

with col1:
    total_sales = filtered_data['sales'].sum()
    st.metric("Total Sales", f"${total_sales:,.0f}")

with col2:
    avg_daily_sales = filtered_data.groupby('date')['sales'].sum().mean()
    st.metric("Avg Daily Sales", f"${avg_daily_sales:,.0f}")

with col3:
    total_units = filtered_data['units'].sum()
    st.metric("Total Units Sold", f"{total_units:,}")

with col4:
    avg_unit_price = filtered_data['sales'].sum() / filtered_data['units'].sum()
    st.metric("Avg Unit Price", f"${avg_unit_price:.2f}")

# Charts
col1, col2 = st.columns(2)

with col1:
    st.subheader("Sales Trend Over Time")
    daily_sales = filtered_data.groupby('date')['sales'].sum().reset_index()
    fig = px.line(daily_sales, x='date', y='sales', title="Daily Sales Trend")
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.subheader("Sales by Region")
    region_sales = filtered_data.groupby('region')['sales'].sum().reset_index()
    fig = px.bar(region_sales, x='region', y='sales', title="Sales by Region", color='region')
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

col3, col4 = st.columns(2)

with col3:
    st.subheader("Product Performance")
    product_sales = filtered_data.groupby('product')['sales'].sum().reset_index()
    fig = px.pie(product_sales, values='sales', names='product', title="Sales by Product")
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

with col4:
    st.subheader("Units Sold by Product")
    product_units = filtered_data.groupby('product')['units'].sum().reset_index()
    fig = px.bar(product_units, x='product', y='units', title="Units Sold by Product", color='product')
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

# AI Prediction Section
st.header("🤖 AI Sales Prediction")
st.markdown("Predict next month's sales using machine learning")

# Simple prediction model (placeholder - in real implementation, use actual ML model)
if st.button("Generate Sales Prediction"):
    # Mock prediction
    current_avg = filtered_data['sales'].mean()
    prediction = current_avg * (1 + np.random.normal(0.05, 0.02))
    confidence = np.random.uniform(0.85, 0.95)

    st.success(f"Predicted next month sales: ${prediction:,.0f}")
    st.info(f"Prediction confidence: {confidence:.1%}")

    # Prediction chart
    future_dates = pd.date_range(start=filtered_data['date'].max(), periods=31, freq='D')
    predicted_sales = np.random.normal(prediction/30, prediction/30 * 0.1, 31)

    pred_df = pd.DataFrame({
        'date': future_dates,
        'predicted_sales': predicted_sales
    })

    fig = px.line(pred_df, x='date', y='predicted_sales', title="Predicted Sales for Next Month")
    fig.update_layout(height=300)
    st.plotly_chart(fig, use_container_width=True)

# Data table
st.header("📋 Raw Data")
st.dataframe(filtered_data.head(100))

# Download button
csv = filtered_data.to_csv(index=False)
st.download_button(
    label="Download Filtered Data as CSV",
    data=csv,
    file_name="filtered_sales_data.csv",
    mime="text/csv"
)