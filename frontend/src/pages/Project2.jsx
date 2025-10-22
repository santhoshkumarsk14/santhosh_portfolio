import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Project2 = () => {
  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Finance & Investment Insights
          </h1>
          <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Problem Statement</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Investors need comprehensive tools to analyze stock performance, identify trends, and assess risks in real-time.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-primary">Solution</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              An interactive dashboard featuring candlestick charts, moving averages, and risk metrics for stocks and cryptocurrencies.
            </p>
            <div className="bg-accent text-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">AI Feature: Trend Alerts</h3>
              <p className="text-sm">AI-powered system that detects unusual patterns and sends alerts for potential investment opportunities or risks.</p>
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

export default Project2;