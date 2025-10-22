import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

# Set page config
st.set_page_config(page_title="What-If Scenario Analysis", page_icon="🔮", layout="wide")

# Title
st.title("🔮 What-If Scenario Analysis")
st.markdown("Dynamic scenario analysis with interactive sliders and real-time KPI updates")

# Scenario selection
st.header("🎯 Select Scenario Type")

scenario_type = st.selectbox(
    "Choose a business scenario:",
    ["Sales Forecasting", "Budget Planning", "Resource Allocation", "Pricing Strategy", "Marketing Campaign"]
)

# Generate sample data based on scenario
@st.cache_data
def generate_scenario_data(scenario):
    if scenario == "Sales Forecasting":
        data = {
            'month': pd.date_range('2024-01-01', periods=12, freq='M'),
            'current_sales': np.random.normal(100000, 15000, 12),
            'market_growth': np.random.uniform(0.02, 0.08, 12),
            'competition_index': np.random.uniform(0.7, 1.3, 12),
            'seasonal_factor': [1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.3, 1.4, 1.5, 1.6]
        }
    elif scenario == "Budget Planning":
        data = {
            'department': ['Sales', 'Marketing', 'IT', 'HR', 'Operations', 'Finance'],
            'current_budget': [500000, 300000, 200000, 150000, 250000, 100000],
            'efficiency_factor': np.random.uniform(0.8, 1.2, 6),
            'growth_target': np.random.uniform(0.05, 0.15, 6)
        }
    elif scenario == "Resource Allocation":
        data = {
            'project': [f'Project_{i}' for i in range(1, 11)],
            'estimated_hours': np.random.randint(100, 1000, 10),
            'priority_score': np.random.uniform(1, 10, 10),
            'resource_cost': np.random.uniform(50, 200, 10),
            'completion_probability': np.random.uniform(0.6, 0.95, 10)
        }
    elif scenario == "Pricing Strategy":
        data = {
            'product': [f'Product_{i}' for i in range(1, 8)],
            'current_price': np.random.uniform(20, 500, 7),
            'cost': np.random.uniform(10, 300, 7),
            'demand_elasticity': np.random.uniform(-2, -0.1, 7),
            'competition_price': np.random.uniform(15, 450, 7)
        }
    else:  # Marketing Campaign
        data = {
            'channel': ['Social Media', 'Email', 'PPC', 'SEO', 'Content', 'Events'],
            'current_spend': [50000, 30000, 80000, 40000, 20000, 15000],
            'conversion_rate': np.random.uniform(0.01, 0.05, 6),
            'customer_acquisition_cost': np.random.uniform(20, 100, 6),
            'roi_multiplier': np.random.uniform(1.5, 4.0, 6)
        }

    return pd.DataFrame(data)

# Load scenario data
scenario_df = generate_scenario_data(scenario_type)

st.header(f"📊 {scenario_type} Analysis")

# Display current data
st.subheader("Current Data")
st.dataframe(scenario_df)

# Interactive controls based on scenario
st.header("🎛️ Adjust Parameters")

if scenario_type == "Sales Forecasting":
    col1, col2, col3 = st.columns(3)

    with col1:
        market_growth_adjustment = st.slider(
            "Market Growth Adjustment (%)",
            min_value=-50,
            max_value=50,
            value=0,
            step=5
        ) / 100

    with col2:
        competition_adjustment = st.slider(
            "Competition Impact (%)",
            min_value=-30,
            max_value=30,
            value=0,
            step=5
        ) / 100

    with col3:
        seasonal_variation = st.slider(
            "Seasonal Variation (%)",
            min_value=-20,
            max_value=20,
            value=0,
            step=5
        ) / 100

    # Calculate scenario
    adjusted_sales = scenario_df['current_sales'] * (1 + market_growth_adjustment + competition_adjustment) * (1 + seasonal_variation)

    # KPIs
    st.header("📈 Key Performance Indicators")

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        total_sales = adjusted_sales.sum()
        st.metric("Total Sales", f"${total_sales:,.0f}", f"{((total_sales/scenario_df['current_sales'].sum()-1)*100):+.1f}%")

    with col2:
        avg_monthly = adjusted_sales.mean()
        st.metric("Avg Monthly Sales", f"${avg_monthly:,.0f}")

    with col3:
        growth_rate = (adjusted_sales.iloc[-1] / adjusted_sales.iloc[0] - 1) * 100
        st.metric("Annual Growth Rate", f"{growth_rate:+.1f}%")

    with col4:
        best_month = adjusted_sales.idxmax()
        st.metric("Best Month", scenario_df['month'].iloc[best_month].strftime('%B'))

    # Chart
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=scenario_df['month'], y=scenario_df['current_sales'], mode='lines+markers', name='Current Sales'))
    fig.add_trace(go.Scatter(x=scenario_df['month'], y=adjusted_sales, mode='lines+markers', name='Scenario Sales'))
    fig.update_layout(title="Sales Forecast Comparison", xaxis_title="Month", yaxis_title="Sales ($)")
    st.plotly_chart(fig, use_container_width=True)

elif scenario_type == "Budget Planning":
    # Budget allocation sliders
    st.subheader("Adjust Department Budgets")

    adjusted_budgets = {}
    cols = st.columns(2)

    for i, dept in enumerate(scenario_df['department']):
        col_idx = i % 2
        with cols[col_idx]:
            adjusted_budgets[dept] = st.slider(
                f"{dept} Budget ($)",
                min_value=int(scenario_df['current_budget'].iloc[i] * 0.5),
                max_value=int(scenario_df['current_budget'].iloc[i] * 1.5),
                value=int(scenario_df['current_budget'].iloc[i]),
                step=5000
            )

    # Calculate scenario
    scenario_df['adjusted_budget'] = scenario_df['department'].map(adjusted_budgets)
    scenario_df['efficiency_savings'] = scenario_df['adjusted_budget'] * (1 - scenario_df['efficiency_factor'])
    scenario_df['growth_investment'] = scenario_df['adjusted_budget'] * scenario_df['growth_target']

    # KPIs
    st.header("📈 Budget Analysis")

    col1, col2, col3 = st.columns(3)

    with col1:
        total_budget = scenario_df['adjusted_budget'].sum()
        original_budget = scenario_df['current_budget'].sum()
        st.metric("Total Budget", f"${total_budget:,.0f}", f"{((total_budget/original_budget-1)*100):+.1f}%")

    with col2:
        total_savings = scenario_df['efficiency_savings'].sum()
        st.metric("Efficiency Savings", f"${total_savings:,.0f}")

    with col3:
        total_investment = scenario_df['growth_investment'].sum()
        st.metric("Growth Investment", f"${total_investment:,.0f}")

    # Budget comparison chart
    fig = px.bar(scenario_df, x='department', y=['current_budget', 'adjusted_budget'],
                 title="Budget Comparison", barmode='group')
    st.plotly_chart(fig, use_container_width=True)

elif scenario_type == "Resource Allocation":
    # Resource allocation
    st.subheader("Allocate Resources")

    total_available_hours = st.slider("Total Available Hours", 1000, 10000, 5000, 100)

    allocated_hours = {}
    for project in scenario_df['project']:
        allocated_hours[project] = st.slider(
            f"Hours for {project}",
            min_value=0,
            max_value=min(500, total_available_hours),
            value=min(100, total_available_hours // len(scenario_df))
        )

    scenario_df['allocated_hours'] = scenario_df['project'].map(allocated_hours)
    scenario_df['completion_score'] = scenario_df['allocated_hours'] / scenario_df['estimated_hours'] * scenario_df['completion_probability']

    # KPIs
    st.header("📈 Resource Allocation Metrics")

    col1, col2, col3 = st.columns(3)

    with col1:
        total_allocated = scenario_df['allocated_hours'].sum()
        st.metric("Total Allocated Hours", f"{total_allocated:,}", f"{total_allocated - total_available_hours:+,}")

    with col2:
        avg_completion = scenario_df['completion_score'].mean() * 100
        st.metric("Avg Completion Probability", f"{avg_completion:.1f}%")

    with col3:
        total_cost = (scenario_df['allocated_hours'] * scenario_df['resource_cost']).sum()
        st.metric("Total Resource Cost", f"${total_cost:,.0f}")

    # Resource allocation chart
    fig = px.bar(scenario_df, x='project', y='allocated_hours', title="Resource Allocation by Project")
    st.plotly_chart(fig, use_container_width=True)

elif scenario_type == "Pricing Strategy":
    # Pricing adjustments
    st.subheader("Adjust Product Prices")

    price_adjustments = {}
    for product in scenario_df['product']:
        current_price = scenario_df[scenario_df['product'] == product]['current_price'].iloc[0]
        price_adjustments[product] = st.slider(
            f"Price for {product} ($)",
            min_value=max(1, current_price * 0.5),
            max_value=current_price * 1.5,
            value=current_price
        )

    scenario_df['new_price'] = scenario_df['product'].map(price_adjustments)
    scenario_df['price_change_pct'] = (scenario_df['new_price'] / scenario_df['current_price'] - 1) * 100
    scenario_df['estimated_demand_change'] = scenario_df['price_change_pct'] * scenario_df['demand_elasticity']
    scenario_df['revenue_change'] = scenario_df['new_price'] * (1 + scenario_df['estimated_demand_change'] / 100) - scenario_df['current_price']

    # KPIs
    st.header("📈 Pricing Impact Analysis")

    col1, col2, col3 = st.columns(3)

    with col1:
        avg_price_change = scenario_df['price_change_pct'].mean()
        st.metric("Avg Price Change", f"{avg_price_change:+.1f}%")

    with col2:
        total_revenue_change = scenario_df['revenue_change'].sum()
        st.metric("Revenue Impact", f"${total_revenue_change:+,.0f}")

    with col3:
        profitable_products = (scenario_df['revenue_change'] > 0).sum()
        st.metric("Profitable Products", f"{profitable_products}/{len(scenario_df)}")

    # Price comparison chart
    fig = px.scatter(scenario_df, x='current_price', y='new_price', text='product',
                    title="Price Changes", labels={'current_price': 'Current Price', 'new_price': 'New Price'})
    fig.update_traces(textposition="top center")
    st.plotly_chart(fig, use_container_width=True)

else:  # Marketing Campaign
    # Marketing budget allocation
    st.subheader("Adjust Marketing Budgets")

    budget_adjustments = {}
    for channel in scenario_df['channel']:
        current_spend = scenario_df[scenario_df['channel'] == channel]['current_spend'].iloc[0]
        budget_adjustments[channel] = st.slider(
            f"Budget for {channel} ($)",
            min_value=0,
            max_value=int(current_spend * 2),
            value=int(current_spend)
        )

    scenario_df['new_spend'] = scenario_df['channel'].map(budget_adjustments)
    scenario_df['spend_change_pct'] = (scenario_df['new_spend'] / scenario_df['current_spend'] - 1) * 100
    scenario_df['estimated_conversions'] = scenario_df['new_spend'] * scenario_df['conversion_rate']
    scenario_df['estimated_roi'] = scenario_df['estimated_conversions'] * scenario_df['roi_multiplier']

    # KPIs
    st.header("📈 Marketing Campaign Analysis")

    col1, col2, col3 = st.columns(3)

    with col1:
        total_spend = scenario_df['new_spend'].sum()
        original_spend = scenario_df['current_spend'].sum()
        st.metric("Total Marketing Spend", f"${total_spend:,.0f}", f"{((total_spend/original_spend-1)*100):+.1f}%")

    with col2:
        total_conversions = scenario_df['estimated_conversions'].sum()
        st.metric("Estimated Conversions", f"{total_conversions:,.0f}")

    with col3:
        total_roi = scenario_df['estimated_roi'].sum()
        st.metric("Estimated ROI", f"${total_roi:,.0f}")

    # Marketing spend comparison
    fig = px.bar(scenario_df, x='channel', y=['current_spend', 'new_spend'],
                 title="Marketing Budget Comparison", barmode='group')
    st.plotly_chart(fig, use_container_width=True)

# AI Decision Support
st.header("🤖 AI Decision Recommendations")

if st.button("Get AI Recommendations"):
    st.info("AI is analyzing your scenario and generating recommendations...")

    # Mock AI recommendations
    recommendations = []

    if scenario_type == "Sales Forecasting":
        if market_growth_adjustment > 0.1:
            recommendations.append("🚀 High market growth expected. Consider increasing inventory and marketing spend.")
        elif market_growth_adjustment < -0.1:
            recommendations.append("⚠️ Market contraction detected. Focus on cost optimization and customer retention.")

    elif scenario_type == "Budget Planning":
        high_growth_depts = scenario_df[scenario_df['growth_target'] > 0.1]['department'].tolist()
        if high_growth_depts:
            recommendations.append(f"📈 Prioritize investment in: {', '.join(high_growth_depts)}")

    elif scenario_type == "Resource Allocation":
        high_priority = scenario_df[scenario_df['priority_score'] > 7]['project'].tolist()
        if high_priority:
            recommendations.append(f"🎯 Focus resources on high-priority projects: {', '.join(high_priority)}")

    elif scenario_type == "Pricing Strategy":
        optimal_pricers = scenario_df[scenario_df['revenue_change'] > scenario_df['revenue_change'].median()]['product'].tolist()
        if optimal_pricers:
            recommendations.append(f"💰 Optimal pricing identified for: {', '.join(optimal_pricers)}")

    else:  # Marketing Campaign
        best_roi = scenario_df.loc[scenario_df['estimated_roi'].idxmax()]['channel']
        recommendations.append(f"🎯 Highest ROI expected from: {best_roi}")

    if not recommendations:
        recommendations.append("✅ Current scenario looks balanced. Monitor key metrics closely.")

    for rec in recommendations:
        st.success(rec)

# Export scenario
st.header("💾 Export Scenario")

scenario_summary = f"""
# {scenario_type} Scenario Analysis

## Summary
Generated on: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}

## Key Parameters
{chr(10).join([f"- {k}: {v}" for k, v in locals().items() if k.endswith('_adjustment') or k.endswith('_variation')])}

## Results
{scenario_df.to_markdown(index=False)}
"""

st.download_button(
    label="Download Scenario Report",
    data=scenario_summary,
    file_name=f"{scenario_type.lower().replace(' ', '_')}_scenario.md",
    mime="text/markdown"
)