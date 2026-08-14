import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ targetNumber, suffix, isVisible }) => {
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

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { number: 3, label: 'Years of Experience', suffix: '+' },
    { number: 10, label: 'Microservices Delivered', suffix: '+' },
    { number: 300, label: 'Enterprise Users Served', suffix: '+' }
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

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={statsRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <AnimatedCounter targetNumber={stat.number} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-secondary mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
