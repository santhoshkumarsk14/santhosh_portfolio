import streamlit as st
import pandas as pd
import numpy as np
import openai
from datetime import datetime
import re

# Set page config
st.set_page_config(page_title="AI Data Assistant", page_icon="🤖", layout="wide")

# Title
st.title("🤖 AI Data Assistant")
st.markdown("Ask questions about your data in plain English and get instant insights!")

# Initialize session state for chat history
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

if 'sample_data' not in st.session_state:
    # Generate sample sales data
    np.random.seed(42)
    dates = pd.date_range(start='2023-01-01', end='2024-12-31', freq='D')
    n_days = len(dates)

    st.session_state.sample_data = pd.DataFrame({
        'date': dates,
        'sales': np.random.normal(1000, 200, n_days).clip(min=0),
        'region': np.random.choice(['North', 'South', 'East', 'West'], n_days),
        'product': np.random.choice(['Product A', 'Product B', 'Product C', 'Product D'], n_days),
        'units': np.random.poisson(50, n_days),
        'customer_satisfaction': np.random.uniform(1, 5, n_days).round(1)
    })

# Sidebar with data info
st.sidebar.header("📊 Data Overview")

df = st.session_state.sample_data
st.sidebar.metric("Total Records", len(df))
st.sidebar.metric("Date Range", f"{df['date'].min().date()} to {df['date'].max().date()}")
st.sidebar.metric("Total Sales", f"${df['sales'].sum():,.0f}")

# Data preview
with st.sidebar.expander("Data Preview"):
    st.dataframe(df.head(10))

# Main chat interface
st.header("💬 Chat with Your Data")

# Display chat history
chat_container = st.container()

with chat_container:
    for message in st.session_state.chat_history:
        if message['role'] == 'user':
            st.markdown(f"**You:** {message['content']}")
        else:
            st.markdown(f"**AI Assistant:** {message['content']}")

# Chat input
user_input = st.text_input("Ask me anything about your data:", key="user_input")

# Process user query
def process_query(query, df):
    query_lower = query.lower()

    # Basic keyword matching for common queries
    if 'total sales' in query_lower or 'sum of sales' in query_lower:
        total_sales = df['sales'].sum()
        return f"The total sales across all records is ${total_sales:,.2f}."

    elif 'average sales' in query_lower or 'mean sales' in query_lower:
        avg_sales = df['sales'].mean()
        return f"The average sales per record is ${avg_sales:.2f}."

    elif 'best selling product' in query_lower or 'top product' in query_lower:
        top_product = df.groupby('product')['sales'].sum().idxmax()
        top_sales = df.groupby('product')['sales'].sum().max()
        return f"The best-selling product is {top_product} with total sales of ${top_sales:,.2f}."

    elif 'sales by region' in query_lower:
        region_sales = df.groupby('region')['sales'].sum().sort_values(ascending=False)
        result = "Sales by region:\n"
        for region, sales in region_sales.items():
            result += f"- {region}: ${sales:,.2f}\n"
        return result

    elif 'total units' in query_lower or 'units sold' in query_lower:
        total_units = df['units'].sum()
        return f"The total units sold is {total_units:,}."

    elif 'average customer satisfaction' in query_lower:
        avg_satisfaction = df['customer_satisfaction'].mean()
        return f"The average customer satisfaction rating is {avg_satisfaction:.2f} out of 5."

    elif 'last month' in query_lower or 'recent month' in query_lower:
        last_month = df['date'].max().replace(day=1) - pd.DateOffset(months=1)
        last_month_data = df[df['date'] >= last_month]
        sales = last_month_data['sales'].sum()
        return f"Last month's sales were ${sales:,.2f}."

    elif 'trend' in query_lower or 'pattern' in query_lower:
        monthly_sales = df.groupby(df['date'].dt.to_period('M'))['sales'].sum()
        trend = "increasing" if monthly_sales.iloc[-1] > monthly_sales.iloc[0] else "decreasing"
        pct_change = ((monthly_sales.iloc[-1] / monthly_sales.iloc[0]) - 1) * 100
        return f"Sales show a {trend} trend with a {pct_change:+.1f}% change over the period."

    elif 'correlation' in query_lower:
        numeric_cols = ['sales', 'units', 'customer_satisfaction']
        corr_matrix = df[numeric_cols].corr()
        sales_units_corr = corr_matrix.loc['sales', 'units']
        return f"The correlation between sales and units sold is {sales_units_corr:.2f}."

    else:
        # Fallback response
        return "I can help you with questions about sales, products, regions, units, customer satisfaction, and trends. Try asking something like 'What are the total sales?' or 'Which product sells the most?'"

# Send button
if st.button("Send") and user_input:
    # Add user message to history
    st.session_state.chat_history.append({'role': 'user', 'content': user_input})

    # Process query
    response = process_query(user_input, df)

    # Add AI response to history
    st.session_state.chat_history.append({'role': 'assistant', 'content': response})

    # Clear input
    st.rerun()

# Clear chat button
if st.button("Clear Chat"):
    st.session_state.chat_history = []
    st.rerun()

# Sample questions
st.header("💡 Sample Questions to Try")

sample_questions = [
    "What are the total sales?",
    "Which product sells the most?",
    "What are sales by region?",
    "How many units were sold in total?",
    "What's the average customer satisfaction?",
    "Show me the sales trend",
    "What's the correlation between sales and units?"
]

cols = st.columns(2)
for i, question in enumerate(sample_questions):
    col_idx = i % 2
    with cols[col_idx]:
        if st.button(question, key=f"sample_{i}"):
            st.session_state.chat_history.append({'role': 'user', 'content': question})
            response = process_query(question, df)
            st.session_state.chat_history.append({'role': 'assistant', 'content': response})
            st.rerun()

# Advanced AI Features (Mock - would use OpenAI API in production)
st.header("🚀 Advanced AI Features")

col1, col2 = st.columns(2)

with col1:
    if st.button("Generate Sales Summary Report"):
        with st.spinner("Generating comprehensive sales report..."):
            # Mock AI-generated report
            report = f"""
## 📊 Sales Performance Summary

**Report Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

### Key Metrics:
- **Total Sales:** ${df['sales'].sum():,.2f}
- **Average Daily Sales:** ${df['sales'].mean():.2f}
- **Total Units Sold:** {df['units'].sum():,}
- **Best Performing Region:** {df.groupby('region')['sales'].sum().idxmax()}
- **Top Product:** {df.groupby('product')['sales'].sum().idxmax()}

### Trends Analysis:
- Sales show a {'positive' if df.groupby(df['date'].dt.month)['sales'].sum().iloc[-1] > df.groupby(df['date'].dt.month)['sales'].sum().iloc[0] else 'negative'} trend
- Customer satisfaction averages at {df['customer_satisfaction'].mean():.2f}/5

### Recommendations:
1. Focus marketing efforts on {df.groupby('region')['sales'].sum().idxmax()} region
2. Increase inventory for {df.groupby('product')['sales'].sum().idxmax()}
3. Monitor customer satisfaction trends closely
"""
            st.markdown(report)

with col2:
    if st.button("Predict Next Month Sales"):
        with st.spinner("Running predictive analytics..."):
            # Mock prediction
            current_avg = df['sales'].mean()
            prediction = current_avg * (1 + np.random.normal(0.05, 0.02))
            confidence = np.random.uniform(0.85, 0.95)

            st.success(f"🎯 Predicted next month sales: ${prediction:,.0f}")
            st.info(f"Prediction confidence: {confidence:.1%}")

            # Show prediction with confidence interval
            lower_bound = prediction * (1 - (1 - confidence))
            upper_bound = prediction * (1 + (1 - confidence))

            st.write(f"Confidence Interval: ${lower_bound:,.0f} - ${upper_bound:,.0f}")

# Data visualization based on recent queries
if st.session_state.chat_history:
    st.header("📈 Recent Query Visualizations")

    # Get the last user query
    last_user_query = None
    for msg in reversed(st.session_state.chat_history):
        if msg['role'] == 'user':
            last_user_query = msg['content'].lower()
            break

    if last_user_query:
        if 'sales by region' in last_user_query:
            region_sales = df.groupby('region')['sales'].sum().reset_index()
            fig = px.bar(region_sales, x='region', y='sales', title="Sales by Region")
            st.plotly_chart(fig, use_container_width=True)

        elif 'product' in last_user_query and ('best' in last_user_query or 'top' in last_user_query):
            product_sales = df.groupby('product')['sales'].sum().reset_index()
            fig = px.bar(product_sales, x='product', y='sales', title="Sales by Product")
            st.plotly_chart(fig, use_container_width=True)

        elif 'trend' in last_user_query:
            monthly_sales = df.groupby(df['date'].dt.to_period('M'))['sales'].sum().reset_index()
            monthly_sales['date'] = monthly_sales['date'].astype(str)
            fig = px.line(monthly_sales, x='date', y='sales', title="Monthly Sales Trend")
            st.plotly_chart(fig, use_container_width=True)

# Footer
st.markdown("---")
st.caption("AI Data Assistant - Powered by advanced analytics and natural language processing")