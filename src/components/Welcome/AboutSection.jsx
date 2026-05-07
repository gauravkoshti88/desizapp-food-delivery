import React from 'react';
import Slider from './Slider';

const slideTexts = [
  {
    title: 'Customers',
    description:
      'DesiZapp is designed with customers at the heart of everything we do. From the moment you open the app, you are greeted with a seamless experience that makes browsing, ordering, and tracking your favorite meals effortless. We understand that convenience matters, which is why DesiZapp ensures lightning-fast delivery, exclusive deals, and personalized recommendations tailored to your taste. Whether you are at home, at work, or traveling, DesiZapp connects you with the best restaurants in your city so you can enjoy delicious food anytime, anywhere. Our mission is simple: to bring joy to your dining experience by combining technology, speed, and quality service into one powerful platform.',
  },
  {
    title: 'Restaurants',
    description:
      'DesiZapp is more than just a delivery service — it is a growth partner for restaurants. We empower food partners with tools to manage orders efficiently, reach new customers, and boost sales through our platform. With real-time dashboards, instant notifications, and detailed analytics, restaurants can focus on what they do best: creating amazing food. By joining DesiZapp, restaurants gain access to a vast network of hungry customers, promotional opportunities, and brand visibility that helps them stand out in a competitive market. We believe in building long-term partnerships where success is shared, and every restaurant has the chance to thrive in the digital age.',
  },
  {
    title: 'Delivery Heroes',
    description:
      'Behind every successful order is a dedicated delivery hero who ensures food reaches customers fresh and on time. At DesiZapp, we value our delivery partners and provide them with flexible working hours, competitive earnings, and the freedom to choose how they work. Being a delivery hero is not just about transporting meals — it is about connecting communities, spreading happiness, and becoming an essential part of the DesiZapp ecosystem. With advanced route optimization, real-time tracking, and support systems, our delivery heroes are equipped to perform their jobs efficiently and safely. We celebrate their contribution and strive to make DesiZapp a platform where delivery partners feel respected, empowered, and motivated to succeed.',
  },
];

function AboutSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent mb-8">
        About DesiZapp
      </h2>

      {/* Slider */}
      <div className="relative mb-10">
        <Slider slideTexts={slideTexts} />
      </div>
    </div>
  );
}

export default AboutSection;