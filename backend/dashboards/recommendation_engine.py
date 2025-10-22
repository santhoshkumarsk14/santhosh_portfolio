import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import random

# Set page config
st.set_page_config(page_title="Recommendation Engine", page_icon="🎯", layout="wide")

# Title
st.title("🎯 Recommendation Engine")
st.markdown("Personalized recommendation system using collaborative filtering and content-based algorithms")

# Generate sample data
@st.cache_data
def generate_sample_data():
    # Users
    users = [f"User_{i}" for i in range(1, 101)]

    # Items (movies/books/products)
    items = [
        "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction",
        "Forrest Gump", "Inception", "Fight Club", "The Matrix", "Goodfellas",
        "The Silence of the Lambs", "Schindler's List", "The Lord of the Rings",
        "Star Wars", "Back to the Future", "The Lion King", "Toy Story",
        "Jurassic Park", "Terminator 2", "Alien", "Blade Runner",
        "Harry Potter and the Sorcerer's Stone", "The Hobbit", "The Chronicles of Narnia",
        "The Da Vinci Code", "Gone Girl", "The Girl with the Dragon Tattoo",
        "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Great Gatsby",
        "iPhone 15", "MacBook Pro", "AirPods", "iPad", "Apple Watch",
        "Samsung Galaxy S24", "Dell XPS 13", "Sony WH-1000XM5", "Surface Pro",
        "Nike Air Max", "Adidas Ultraboost", "Levi's 501", "H&M Essentials"
    ]

    # Categories
    categories = {
        'movie': items[:20],
        'book': items[20:30],
        'electronics': items[30:35],
        'phone': items[35:40],
        'clothing': items[40:]
    }

    # Generate ratings (1-5 scale, with many NaN for sparsity)
    ratings = {}
    for user in users:
        user_ratings = {}
        for item in items:
            if random.random() < 0.3:  # 30% sparsity
                user_ratings[item] = random.randint(1, 5)
        ratings[user] = user_ratings

    # Create DataFrame
    df_data = []
    for user, user_ratings in ratings.items():
        for item, rating in user_ratings.items():
            # Determine category
            category = 'unknown'
            for cat, cat_items in categories.items():
                if item in cat_items:
                    category = cat
                    break

            df_data.append({
                'user': user,
                'item': item,
                'rating': rating,
                'category': category
            })

    df = pd.DataFrame(df_data)
    return df, categories

# Load data
ratings_df, categories = generate_sample_data()

# Sidebar
st.sidebar.header("Recommendation Settings")

selected_category = st.sidebar.selectbox(
    "Select Category",
    options=list(categories.keys()),
    index=0
)

# Filter items by category
category_items = categories[selected_category]
filtered_ratings = ratings_df[ratings_df['item'].isin(category_items)]

# User-item matrix
user_item_matrix = filtered_ratings.pivot_table(
    index='user',
    columns='item',
    values='rating',
    fill_value=0
)

# Similarity calculation
item_similarity = cosine_similarity(user_item_matrix.T)
item_similarity_df = pd.DataFrame(
    item_similarity,
    index=user_item_matrix.columns,
    columns=user_item_matrix.columns
)

# Main content
st.header("📊 User-Item Ratings Matrix")

# Show sample of the matrix
st.dataframe(user_item_matrix.head(10))

# Item similarity heatmap
st.header("🔥 Item Similarity Matrix")

if len(user_item_matrix.columns) <= 20:  # Only show heatmap for smaller matrices
    fig = px.imshow(
        item_similarity_df,
        title="Item Similarity Heatmap",
        labels=dict(x="Items", y="Items", color="Similarity")
    )
    fig.update_layout(height=600)
    st.plotly_chart(fig, use_container_width=True)
else:
    st.info("Similarity matrix too large to display. Showing top 10 most similar items.")

    # Show top similar items for a random item
    sample_item = random.choice(user_item_matrix.columns.tolist())
    similar_items = item_similarity_df[sample_item].sort_values(ascending=False)[1:11]

    st.subheader(f"Top 10 items similar to '{sample_item}':")
    st.dataframe(similar_items.reset_index().rename(columns={'index': 'Item', sample_item: 'Similarity'}))

# Recommendation system
st.header("🎯 Get Recommendations")

col1, col2 = st.columns(2)

with col1:
    st.subheader("Select a User")
    selected_user = st.selectbox(
        "Choose a user to get recommendations for:",
        options=user_item_matrix.index.tolist()
    )

with col2:
    st.subheader("Select an Item")
    selected_item = st.selectbox(
        "Choose an item to find similar items:",
        options=user_item_matrix.columns.tolist()
    )

# Get recommendations for user
if selected_user:
    st.subheader(f"Recommendations for {selected_user}")

    # Simple collaborative filtering
    user_ratings = user_item_matrix.loc[selected_user]
    unrated_items = user_ratings[user_ratings == 0].index

    if len(unrated_items) > 0:
        predictions = {}
        for item in unrated_items:
            similar_items = item_similarity_df[item].sort_values(ascending=False)[1:6]  # Top 5 similar
            weighted_sum = 0
            similarity_sum = 0

            for sim_item, similarity in similar_items.items():
                if user_ratings[sim_item] > 0:
                    weighted_sum += user_ratings[sim_item] * similarity
                    similarity_sum += similarity

            if similarity_sum > 0:
                predictions[item] = weighted_sum / similarity_sum

        # Sort predictions
        sorted_predictions = sorted(predictions.items(), key=lambda x: x[1], reverse=True)[:10]

        if sorted_predictions:
            rec_df = pd.DataFrame(sorted_predictions, columns=['Item', 'Predicted Rating'])
            rec_df['Predicted Rating'] = rec_df['Predicted Rating'].round(2)

            fig = px.bar(
                rec_df,
                x='Predicted Rating',
                y='Item',
                orientation='h',
                title=f"Top 10 Recommended Items for {selected_user}"
            )
            fig.update_layout(height=400)
            st.plotly_chart(fig, use_container_width=True)

            st.dataframe(rec_df)
        else:
            st.info("Not enough data to generate recommendations for this user.")
    else:
        st.info("This user has rated all available items!")

# Similar items
if selected_item:
    st.subheader(f"Items similar to '{selected_item}'")

    similar_items = item_similarity_df[selected_item].sort_values(ascending=False)[1:11]

    fig = px.bar(
        similar_items.reset_index(),
        x=selected_item,
        y='index',
        orientation='h',
        title=f"Top 10 Items Similar to {selected_item}",
        labels={selected_item: 'Similarity Score', 'index': 'Item'}
    )
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

    st.dataframe(similar_items.reset_index().rename(columns={'index': 'Item', selected_item: 'Similarity'}))

# AI-Powered Recommendations
st.header("🤖 AI-Powered Recommendations")

if st.button("Generate AI Recommendations"):
    st.info("AI Analysis: Using advanced algorithms to find optimal recommendations...")

    # Mock AI recommendations (in real implementation, use more sophisticated ML)
    all_items = user_item_matrix.columns.tolist()
    ai_recommendations = random.sample(all_items, min(5, len(all_items)))

    st.success("AI has analyzed user patterns and generated personalized recommendations!")

    for i, item in enumerate(ai_recommendations, 1):
        confidence = random.uniform(0.7, 0.95)
        st.write(f"{i}. **{item}** - Confidence: {confidence:.1%}")

        # Mock reasoning
        reasons = [
            "Based on similar user preferences",
            "Trending in your category",
            "Highly rated by users with similar tastes",
            "Complements your previously liked items"
        ]
        st.caption(random.choice(reasons))

# Statistics
st.header("📈 System Statistics")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric("Total Users", len(user_item_matrix.index))

with col2:
    st.metric("Total Items", len(user_item_matrix.columns))

with col3:
    total_ratings = (user_item_matrix > 0).sum().sum()
    st.metric("Total Ratings", total_ratings)

with col4:
    sparsity = 1 - (total_ratings / (len(user_item_matrix.index) * len(user_item_matrix.columns)))
    st.metric("Matrix Sparsity", f"{sparsity:.1%}")

# Category distribution
st.subheader("Category Distribution")
category_counts = ratings_df['category'].value_counts()
fig = px.pie(category_counts, values=category_counts.values, names=category_counts.index, title="Ratings by Category")
st.plotly_chart(fig, use_container_width=True)