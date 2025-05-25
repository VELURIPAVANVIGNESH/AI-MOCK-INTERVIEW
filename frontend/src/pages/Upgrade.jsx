import React, { useState } from 'react';
import './Upgrade.css';
import Footer from '../Footer';
import Header from '../Header';

const PricingSection = () => {
  const [loading, setLoading] = useState({});

  // Razorpay configuration
  const RAZORPAY_KEY_ID = 'rzp_test_Mxu4fhimeS9KN5';

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (planName, amount, planType) => {
    setLoading(prev => ({ ...prev, [planType]: true }));

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        throw new Error('Razorpay script failed to load');
      }

      // Create order on your backend (you'll need to implement this endpoint)
      // For demo purposes, we're proceeding without server-side order creation
      // In production, you should create an order on your backend first

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paise (multiply by 100)
        currency: 'INR',
        name: 'Interview Assistant',
        description: `${planName} Plan Subscription`,
        image: 'https://via.placeholder.com/150x150?text=IA', // Replace with your logo URL
        handler: function (response) {
          // Payment successful
          console.log('Payment successful:', response);
          
          // Here you would typically:
          // 1. Send payment details to your backend
          // 2. Verify payment signature on backend
          // 3. Activate user subscription
          
          handlePaymentSuccess(response, planName, planType);
        },
        prefill: {
          name: 'John Doe', // Get from user profile
          email: 'john.doe@example.com', // Get from user profile
          contact: '9999999999' // Get from user profile
        },
        notes: {
          plan: planName,
          subscription_type: planType,
          timestamp: new Date().toISOString()
        },
        theme: {
          color: '#1dbd5f'
        },
        modal: {
          ondismiss: function() {
            setLoading(prev => ({ ...prev, [planType]: false }));
            console.log('Payment modal dismissed');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        handlePaymentFailure(response.error, planType);
      });

      rzp.open();

    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Payment gateway not available. Please try again later.');
      setLoading(prev => ({ ...prev, [planType]: false }));
    }
  };

  const handlePaymentSuccess = (response, planName, planType) => {
    setLoading(prev => ({ ...prev, [planType]: false }));
    
    // Show success message
    alert(`Payment successful! 🎉\n\nPayment ID: ${response.razorpay_payment_id}\nPlan: ${planName}\n\nYour subscription is now active!`);
    
    // Here you would typically:
    // - Send payment details to backend for verification
    // - Redirect to dashboard
    // - Update user subscription status
    
    // Example backend call (implement this endpoint):
    /*
    fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer ${userToken}
      },
      body: JSON.stringify({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        plan: planName,
        amount: amount
      })
    });
    */
  };

  const handlePaymentFailure = (error, planType) => {
    setLoading(prev => ({ ...prev, [planType]: false }));
    
    let errorMessage = 'Payment failed. Please try again.';
    
    if (error.code === 'BAD_REQUEST_ERROR') {
      errorMessage = 'Payment request was invalid. Please contact support.';
    } else if (error.code === 'GATEWAY_ERROR') {
      errorMessage = 'Payment gateway error. Please try again.';
    } else if (error.code === 'NETWORK_ERROR') {
      errorMessage = 'Network error. Please check your connection and try again.';
    }
    
    alert(`❌ ${errorMessage}\n\nError: ${error.description || error.reason}`);
  };

  const handleFreeTrial = (planType) => {
    setLoading(prev => ({ ...prev, [planType]: true }));
    
    // Simulate API call for free trial activation
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [planType]: false }));
      alert('🎉 Free trial started successfully!\n\nYou now have 7 days of free access to all Basic plan features.\n\nRedirecting to dashboard...');
      
      // Here you would typically:
      // - Create trial subscription in backend
      // - Redirect to dashboard
      // window.location.href = '/dashboard';
    }, 1500);
  };

  const handleContactSales = () => {
    // You can implement this as a modal, redirect, or mailto link
    const subject = encodeURIComponent('Enterprise Plan Inquiry - Interview Assistant');
    const body = encodeURIComponent(`Hi,

I'm interested in the Enterprise plan for Interview Assistant. Please provide more information about:

- Custom pricing for our organization
- Implementation timeline
- Available features and customizations
- Support options

Best regards`);
    
    // Option 1: Open email client
    window.location.href = `mailto:sales@interviewassistant.com?subject=${subject}&body=${body}`;
    
    // Option 2: You could also redirect to a contact form
    // window.location.href = '/contact-sales';
    
    // Option 3: Open a modal with contact form
    // setShowContactModal(true);
  };

  return (
    <div>
      <Header />

      <div className="pricing-section">
        <div className="pricing-container">
          
          <div className="pricing-header text-center">
            <h1 className="pricing-title">
              Choose Your Interview Assistant Plan
            </h1>
            <p className="pricing-subtitle">
              Elevate your interview skills with our AI-powered mock interview platform. Select the plan that fits your career goals perfectly.
            </p>
          </div>
          
          <div className="pricing-plans-grid">
            
            {/* Basic Plan */}
            <div className="plan-card basic">
              <h2 className="plan-title">Basic</h2>
              <p className="plan-description">Ideal for beginners preparing for their initial interviews</p>
              <div className="plan-pricing">
                <div className="plan-price">₹599</div>
                <div className="plan-period">per month</div>
              </div>
              <ul className="plan-features">
                <li><span className="check-mark">✓</span> 5 AI interview simulations</li>
                <li><span className="check-mark">✓</span> Basic feedback on responses</li>
                <li><span className="check-mark">✓</span> General interview questions</li>
                <li><span className="check-mark">✓</span> Email support</li>
              </ul>
              <button 
                className={`plan-button ${loading.basic ? 'loading' : ''}`}
                onClick={() => handleFreeTrial('basic')}
                disabled={loading.basic}
              >
                {loading.basic ? 'Starting Trial...' : 'Start Free Trial'}
              </button>
            </div>
            
            {/* Professional Plan */}
            <div className="plan-card professional">
              <span className="popular-badge">Most Popular</span>
              <h2 className="plan-title">Professional</h2>
              <p className="plan-description">Comprehensive preparation for serious job seekers</p>
              <div className="plan-pricing">
                <div className="plan-price">₹1,299</div>
                <div className="plan-period">per month</div>
              </div>
              <ul className="plan-features">
                <li><span className="check-mark">✓</span> Unlimited interview simulations</li>
                <li><span className="check-mark">✓</span> Detailed response analysis</li>
                <li><span className="check-mark">✓</span> Industry-specific questions</li>
                <li><span className="check-mark">✓</span> Technical skills assessment</li>
                <li><span className="check-mark">✓</span> Interview performance tracking</li>
                <li><span className="check-mark">✓</span> Priority support</li>
              </ul>
              <button 
                className={`plan-button active ${loading.professional ? 'loading' : ''}`}
                onClick={() => handlePayment('Professional', 1299, 'professional')}
                disabled={loading.professional}
              >
                {loading.professional ? 'Processing...' : 'Get Started'}
              </button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="plan-card enterprise">
              <h2 className="plan-title">Enterprise</h2>
              <p className="plan-description">Tailored for organizations training multiple candidates</p>
              <div className="plan-pricing">
                <div className="plan-price">₹3,499</div>
                <div className="plan-period">per user/month</div>
              </div>
              <ul className="plan-features">
                <li><span className="check-mark">✓</span> Everything in Professional</li>
                <li><span className="check-mark">✓</span> Custom interview scenarios</li>
                <li><span className="check-mark">✓</span> Company-specific questions</li>
                <li><span className="check-mark">✓</span> Bulk user management</li>
                <li><span className="check-mark">✓</span> Admin dashboard & analytics</li>
                <li><span className="check-mark">✓</span> Dedicated account manager</li>
                <li><span className="check-mark">✓</span> Custom HR integrations</li>
              </ul>
              <button 
                className="plan-button"
                onClick={handleContactSales}
              >
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="pricing-footer text-center">
            All plans include a 7-day free trial. No credit card required to start. Prices exclude applicable taxes.
          </div>
          <br />
          <br />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PricingSection;