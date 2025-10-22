import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Project3 = () => {
  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Social Media Sentiment Analyzer
          </h1>
          <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Problem Statement</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Brands and marketers need to understand public sentiment towards their products and campaigns in real-time.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-primary">Solution</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              A comprehensive sentiment analysis tool that processes tweets and social media data, providing word clouds and sentiment scores.
            </p>
            <div className="bg-accent text-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">AI Feature: Trending Topics Detection</h3>
              <p className="text-sm">AI algorithms identify emerging trends and predict engagement potential for social media content.</p>
            </div>
          </div>
          <div className="text-center space-x-4">
            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Live Demo
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Code
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Project3;