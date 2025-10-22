import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from transformers import pipeline
import re

# Set page config
st.set_page_config(page_title="Social Media Sentiment Analyzer", page_icon="📱", layout="wide")

# Title
st.title("📱 Social Media Sentiment Analyzer")
st.markdown("Real-time sentiment analysis of social media data with trending topics detection")

# Sample data generation
@st.cache_data
def generate_sample_tweets():
    hashtags = ['#AI', '#DataScience', '#MachineLearning', '#Python', '#BigData', '#Analytics', '#Tech', '#Innovation']
    sentiments = ['positive', 'negative', 'neutral']

    tweets = []
    for i in range(1000):
        hashtag = np.random.choice(hashtags)
        sentiment = np.random.choice(sentiments, p=[0.4, 0.2, 0.4])  # More positive/neutral

        if sentiment == 'positive':
            text = f"Love working with {hashtag}! The future is bright! 🚀 #Tech"
        elif sentiment == 'negative':
            text = f"Struggling with {hashtag} implementation. Too complicated 😩"
        else:
            text = f"Interesting developments in {hashtag}. What do you think?"

        tweets.append({
            'id': i,
            'text': text,
            'hashtag': hashtag,
            'sentiment': sentiment,
            'date': pd.Timestamp.now() - pd.Timedelta(days=np.random.randint(0, 30)),
            'likes': np.random.randint(0, 1000),
            'retweets': np.random.randint(0, 500)
        })

    return pd.DataFrame(tweets)

# Load sample data
tweets_df = generate_sample_tweets()

# Sidebar filters
st.sidebar.header("Filters")

selected_hashtags = st.sidebar.multiselect(
    "Select Hashtags",
    options=tweets_df['hashtag'].unique(),
    default=tweets_df['hashtag'].unique()[:3]
)

date_range = st.sidebar.date_input(
    "Select Date Range",
    value=(tweets_df['date'].min().date(), tweets_df['date'].max().date())
)

# Filter data
filtered_tweets = tweets_df[
    (tweets_df['hashtag'].isin(selected_hashtags)) &
    (tweets_df['date'].dt.date >= date_range[0]) &
    (tweets_df['date'].dt.date <= date_range[1])
]

# Sentiment Analysis
st.header("📊 Sentiment Analysis")

col1, col2, col3 = st.columns(3)

sentiment_counts = filtered_tweets['sentiment'].value_counts()

with col1:
    st.metric("Positive", sentiment_counts.get('positive', 0))

with col2:
    st.metric("Neutral", sentiment_counts.get('neutral', 0))

with col3:
    st.metric("Negative", sentiment_counts.get('negative', 0))

# Sentiment over time
st.subheader("Sentiment Trend Over Time")
daily_sentiment = filtered_tweets.groupby([filtered_tweets['date'].dt.date, 'sentiment']).size().unstack().fillna(0)
daily_sentiment = daily_sentiment.div(daily_sentiment.sum(axis=1), axis=0) * 100

fig = px.area(daily_sentiment, title="Sentiment Distribution Over Time (%)")
fig.update_layout(height=400)
st.plotly_chart(fig, use_container_width=True)

# Sentiment by hashtag
st.subheader("Sentiment by Hashtag")
hashtag_sentiment = pd.crosstab(filtered_tweets['hashtag'], filtered_tweets['sentiment'], normalize='index') * 100

fig = px.bar(hashtag_sentiment, barmode='stack', title="Sentiment Distribution by Hashtag (%)")
fig.update_layout(height=400)
st.plotly_chart(fig, use_container_width=True)

# Word Cloud
st.header("☁️ Word Cloud")

# Generate word cloud from tweet text
text = ' '.join(filtered_tweets['text'])
text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
text = re.sub(r'@\w+', '', text)
text = re.sub(r'#\w+', '', text)

if text.strip():
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.imshow(wordcloud, interpolation='bilinear')
    ax.axis('off')
    st.pyplot(fig)
else:
    st.info("No text available for word cloud generation.")

# Top tweets
st.header("🔥 Top Tweets")

# Sort by engagement (likes + retweets)
filtered_tweets['engagement'] = filtered_tweets['likes'] + filtered_tweets['retweets']
top_tweets = filtered_tweets.nlargest(10, 'engagement')[['text', 'hashtag', 'sentiment', 'likes', 'retweets', 'engagement']]

st.dataframe(top_tweets)

# AI Trending Topics Detection
st.header("🤖 AI Trending Topics Detection")

if st.button("Detect Trending Topics"):
    st.info("AI Analysis: Analyzing tweet patterns and engagement...")

    # Mock AI analysis
    trending_topics = []

    # Analyze hashtag frequency and growth
    hashtag_freq = filtered_tweets['hashtag'].value_counts()
    hashtag_growth = filtered_tweets.groupby('hashtag')['date'].agg(lambda x: (x.max() - x.min()).days)

    for hashtag in hashtag_freq.index[:5]:
        freq = hashtag_freq[hashtag]
        growth_days = hashtag_growth[hashtag]

        if freq > 50 and growth_days > 7:
            trending_topics.append({
                'topic': hashtag,
                'frequency': freq,
                'growth_rate': freq / max(growth_days, 1),
                'sentiment': filtered_tweets[filtered_tweets['hashtag'] == hashtag]['sentiment'].mode().iloc[0] if not filtered_tweets[filtered_tweets['hashtag'] == hashtag].empty else 'neutral'
            })

    if trending_topics:
        st.success("Trending topics detected!")

        for topic in trending_topics:
            sentiment_color = {'positive': '🟢', 'negative': '🔴', 'neutral': '🟡'}
            st.write(f"{sentiment_color.get(topic['sentiment'], '🟡')} **{topic['topic']}** - {topic['frequency']} mentions, Growth rate: {topic['growth_rate']:.1f} per day")
    else:
        st.info("No significant trending topics detected in the selected timeframe.")

# Engagement Prediction
st.header("📈 Engagement Prediction")

if st.button("Predict Engagement"):
    st.info("AI Analysis: Predicting future engagement based on current trends...")

    # Mock prediction
    current_avg_engagement = filtered_tweets['engagement'].mean()
    predicted_engagement = current_avg_engagement * (1 + np.random.normal(0.1, 0.05))

    st.metric("Predicted Average Engagement", f"{predicted_engagement:.0f}")

    # Prediction chart
    future_dates = pd.date_range(start=filtered_tweets['date'].max(), periods=7, freq='D')
    predicted_values = np.random.normal(predicted_engagement, predicted_engagement * 0.2, 7)

    pred_df = pd.DataFrame({
        'date': future_dates,
        'predicted_engagement': predicted_values
    })

    fig = px.line(pred_df, x='date', y='predicted_engagement', title="Predicted Engagement for Next Week")
    fig.update_layout(height=300)
    st.plotly_chart(fig, use_container_width=True)

# Raw data
st.header("📋 Raw Tweet Data")
st.dataframe(filtered_tweets[['text', 'hashtag', 'sentiment', 'date', 'likes', 'retweets']].head(50))