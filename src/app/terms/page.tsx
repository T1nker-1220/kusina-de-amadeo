'use client';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using Kusina De Amadeo's services, you agree to be bound by these Terms of Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Use of Services</h2>
              <p>Our services are available for personal, non-commercial use. You agree to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide accurate information when creating an account</li>
                <li>Maintain the security of your account</li>
                <li>Use the services in compliance with applicable laws</li>
                <li>Not engage in any fraudulent or harmful activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Orders and Payment</h2>
              <p>When placing orders:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>All prices are in Philippine Peso (PHP)</li>
                <li>Payment is required at the time of ordering</li>
                <li>We reserve the right to refuse service</li>
                <li>Delivery times are estimates only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. User Content</h2>
              <p>When you submit reviews or comments:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>You retain ownership of your content</li>
                <li>You grant us a license to use and display your content</li>
                <li>Content must not be offensive or inappropriate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Intellectual Property</h2>
              <p>All content and materials on our website are protected by copyright and other intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
              <p>We strive to provide the best service possible, but:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Services are provided "as is"</li>
                <li>We are not liable for indirect damages</li>
                <li>Our liability is limited to the amount paid for services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Changes to Terms</h2>
              <p>We may modify these terms at any time. Continued use of our services constitutes acceptance of new terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Contact Information</h2>
              <p>For questions about these terms, contact us at:</p>
              <ul className="list-none mt-2 space-y-1">
                <li>Email: marquezjohnnathanieljade@gmail.com</li>
                <li>Address: 107 I, PUROK 4, DAGATAN, AMADEO, CAVITE 4119</li>
                <li>Phone: [Your business phone number]</li>
              </ul>
            </section>

            <p className="mt-8">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
