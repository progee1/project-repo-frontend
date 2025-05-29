import React from 'react';

function CompanyInfo() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
      <p className="text-lg leading-relaxed">
        Our platform offers a Bitcoin investment calculator and tracker that gives users insights into their potential earnings,
        historical performance, and price trends. We believe in empowering people to make smarter decisions when entering the crypto space.
      </p>

      <div className="mt-6 space-y-2">
        <p><strong>Email:</strong> contact@bitcoininvestco.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Crypto Street, Blockchain City, Web3</p>
      </div>
    </section>
  );
}

export default CompanyInfo;
