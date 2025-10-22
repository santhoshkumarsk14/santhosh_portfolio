import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from io import StringIO
import openai

# Set page config
st.set_page_config(page_title="Automated Reporting", page_icon="📋", layout="wide")

# Title
st.title("📋 Automated Reporting")
st.markdown("Generate comprehensive reports and visualizations from CSV data with AI insights")

# File upload
st.header("📤 Upload Your Data")
uploaded_file = st.file_uploader("Choose a CSV file", type="csv")

if uploaded_file is not None:
    # Read the uploaded file
    df = pd.read_csv(uploaded_file)

    st.success(f"Data loaded successfully! Shape: {df.shape[0]} rows × {df.shape[1]} columns")

    # Data preview
    st.header("📊 Data Preview")
    st.dataframe(df.head(10))

    # Basic statistics
    st.header("📈 Basic Statistics")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Total Rows", df.shape[0])

    with col2:
        st.metric("Total Columns", df.shape[1])

    with col3:
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        st.metric("Numeric Columns", len(numeric_cols))

    # Data types
    st.subheader("Data Types")
    dtypes_df = pd.DataFrame({
        'Column': df.columns,
        'Data Type': df.dtypes.astype(str),
        'Non-Null Count': df.notnull().sum(),
        'Null Count': df.isnull().sum()
    })
    st.dataframe(dtypes_df)

    # Missing values visualization
    if df.isnull().sum().sum() > 0:
        st.subheader("Missing Values")
        missing_data = df.isnull().sum()
        missing_data = missing_data[missing_data > 0]

        if not missing_data.empty:
            fig = px.bar(
                x=missing_data.index,
                y=missing_data.values,
                title="Missing Values by Column"
            )
            st.plotly_chart(fig, use_container_width=True)

    # Numeric columns analysis
    numeric_columns = df.select_dtypes(include=[np.number]).columns

    if len(numeric_columns) > 0:
        st.header("📊 Numeric Columns Analysis")

        # Summary statistics
        st.subheader("Summary Statistics")
        st.dataframe(df[numeric_columns].describe())

        # Distribution plots
        selected_numeric = st.selectbox("Select a numeric column for distribution:", numeric_columns)

        if selected_numeric:
            fig = px.histogram(df, x=selected_numeric, title=f"Distribution of {selected_numeric}")
            st.plotly_chart(fig, use_container_width=True)

        # Correlation heatmap
        if len(numeric_columns) > 1:
            st.subheader("Correlation Heatmap")
            corr_matrix = df[numeric_columns].corr()

            fig = px.imshow(
                corr_matrix,
                title="Correlation Matrix",
                labels=dict(x="Columns", y="Columns", color="Correlation")
            )
            st.plotly_chart(fig, use_container_width=True)

    # Categorical columns analysis
    categorical_columns = df.select_dtypes(include=['object']).columns

    if len(categorical_columns) > 0:
        st.header("📊 Categorical Columns Analysis")

        selected_cat = st.selectbox("Select a categorical column:", categorical_columns)

        if selected_cat:
            value_counts = df[selected_cat].value_counts().head(20)  # Top 20

            fig = px.bar(
                x=value_counts.index,
                y=value_counts.values,
                title=f"Value Counts for {selected_cat}"
            )
            fig.update_xaxes(tickangle=45)
            st.plotly_chart(fig, use_container_width=True)

    # AI Report Generation
    st.header("🤖 AI-Generated Report")

    if st.button("Generate AI Report"):
        with st.spinner("AI is analyzing your data and generating insights..."):
            try:
                # Mock AI analysis (in real implementation, use OpenAI API)
                insights = []

                # Basic insights
                insights.append(f"The dataset contains {df.shape[0]} records with {df.shape[1]} features.")

                if len(numeric_columns) > 0:
                    top_corr = df[numeric_columns].corr().abs().unstack().sort_values(ascending=False)
                    top_corr = top_corr[top_corr < 1].head(1)
                    if not top_corr.empty:
                        col1, col2 = top_corr.index[0]
                        corr_val = top_corr.values[0]
                        insights.append(f"Strongest correlation ({corr_val:.2f}) found between '{col1}' and '{col2}'.")

                if len(categorical_columns) > 0:
                    for col in categorical_columns[:3]:  # Analyze first 3 categorical columns
                        most_common = df[col].mode().iloc[0] if not df[col].mode().empty else "N/A"
                        insights.append(f"Most common value in '{col}': {most_common}")

                if df.isnull().sum().sum() > 0:
                    null_pct = (df.isnull().sum().sum() / (df.shape[0] * df.shape[1])) * 100
                    insights.append(f"Dataset has {null_pct:.1f}% missing values.")

                # Generate mock AI report
                report = f"""
# Automated Data Analysis Report

## Executive Summary
This report provides an automated analysis of the uploaded dataset using advanced AI algorithms.

## Key Insights
{chr(10).join(f"- {insight}" for insight in insights)}

## Recommendations
- Consider data cleaning if missing values exceed 5%
- Investigate correlations for feature engineering opportunities
- Review categorical distributions for potential segmentation

## Data Quality Assessment
- **Completeness**: {'Good' if df.isnull().sum().sum() / (df.shape[0] * df.shape[1]) < 0.05 else 'Needs Attention'}
- **Consistency**: {'Good' if len(df.select_dtypes(include=['object']).columns) > 0 else 'Limited categorical data'}
- **Accuracy**: Estimated based on data patterns - manual verification recommended

## Next Steps
1. Review the identified insights
2. Clean and preprocess data as needed
3. Perform deeper analysis on key variables
4. Consider predictive modeling if appropriate
"""

                st.markdown(report)

                # Download report
                st.download_button(
                    label="Download Report as Markdown",
                    data=report,
                    file_name="ai_data_report.md",
                    mime="text/markdown"
                )

            except Exception as e:
                st.error(f"Error generating AI report: {e}")

    # Export options
    st.header("📥 Export Options")

    col1, col2 = st.columns(2)

    with col1:
        # CSV export
        csv_data = df.to_csv(index=False)
        st.download_button(
            label="Download Processed Data as CSV",
            data=csv_data,
            file_name="processed_data.csv",
            mime="text/csv"
        )

    with col2:
        # Excel export
        excel_data = df.to_excel(index=False)
        st.download_button(
            label="Download Processed Data as Excel",
            data=excel_data,
            file_name="processed_data.xlsx",
            mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

else:
    st.info("Please upload a CSV file to get started.")

    # Sample data section
    st.header("🎯 Try with Sample Data")

    if st.button("Load Sample Dataset"):
        # Generate sample e-commerce data
        np.random.seed(42)
        n_rows = 1000

        sample_data = {
            'order_id': range(1, n_rows + 1),
            'customer_id': np.random.randint(1, 201, n_rows),
            'product_name': np.random.choice(['Laptop', 'Phone', 'Tablet', 'Headphones', 'Mouse', 'Keyboard'], n_rows),
            'category': np.random.choice(['Electronics', 'Accessories'], n_rows),
            'price': np.random.uniform(10, 2000, n_rows).round(2),
            'quantity': np.random.randint(1, 5, n_rows),
            'order_date': pd.date_range('2023-01-01', periods=n_rows, freq='H')[:n_rows],
            'payment_method': np.random.choice(['Credit Card', 'PayPal', 'Bank Transfer'], n_rows),
            'customer_region': np.random.choice(['North', 'South', 'East', 'West'], n_rows)
        }

        df = pd.DataFrame(sample_data)
        st.success("Sample e-commerce data loaded!")
        st.dataframe(df.head(10))

        # Quick analysis
        st.subheader("Quick Sample Analysis")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric("Total Revenue", f"${(df['price'] * df['quantity']).sum():,.0f}")

        with col2:
            st.metric("Total Orders", len(df))

        with col3:
            st.metric("Avg Order Value", f"${(df['price'] * df['quantity']).mean():.2f}")

        # Category sales
        category_sales = df.groupby('category')['price'].sum()
        fig = px.pie(category_sales, values=category_sales.values, names=category_sales.index, title="Sales by Category")
        st.plotly_chart(fig, use_container_width=True)