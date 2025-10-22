import React, { useState, useEffect, useRef } from 'react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { number: 12, label: 'Projects Completed', suffix: '+' },
    { number: 5, label: 'AI Models Built', suffix: '+' },
    { number: 50, label: 'Datasets Analyzed', suffix: '+' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const AnimatedCounter = ({ targetNumber, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = targetNumber / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, [isVisible, targetNumber]);

    return (
      <span className="text-3xl md:text-4xl font-bold text-primary">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section ref={statsRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <AnimatedCounter targetNumber={stat.number} suffix={stat.suffix} />
              <p className="text-secondary mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;