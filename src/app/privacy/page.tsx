'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p>When you use Kusina De Amadeo, we collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Information you provide (name, email, delivery address)</li>
                <li>Authentication data when you sign in with Google or Facebook</li>
                <li>Order history and preferences</li>
                <li>Device information and IP address</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Process and deliver your orders</li>
                <li>Improve our services</li>
                <li>Communicate with you about orders and promotions</li>
                <li>Ensure security of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <p>We do not sell your personal information. We share information only:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>With delivery partners to fulfill orders</li>
                <li>When required by law</li>
                <li>With service providers who assist our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your information, including encryption and secure storage.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p>For privacy-related questions, contact us at:</p>
              <ul className="list-none mt-2 space-y-1">
                <li>Email: marquezjohnnathanieljade@gmail.com</li>
                <li>Address: 107 I, PUROK 4, DAGATAN, AMADEO, CAVITE 4119</li>
                <li>Phone: [Your business phone number]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
              <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
