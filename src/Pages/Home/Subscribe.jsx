import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="relative min-h-fit flex flex-col justify-center py-10 px-4 sm:px-8 overflow-hidden ">
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 dark:bg-secondary-800/70 backdrop-blur-xl rounded-full mb-8 shadow-lg border border-white/40 dark:border-secondary-700/40 group hover:bg-white/80 dark:hover:bg-secondary-800/80 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-accent-400 animate-pulse" />
            <span className="text-sm font-bold text-primary-700 dark:text-accent-300">
              Join Our Community
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Stay in the Loop
            </span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Get exclusive updates, behind-the-scenes content, and early access to our latest animations and creative projects.
          </p>
        </div>

        {/* Newsletter Card */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="relative bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/30 dark:border-slate-800 shadow-xl group hover:bg-white/15 dark:hover:bg-white/8 transition-all duration-500 ease-out">
              
              {/* Content */}
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                {/* Left Side - Icon & Text */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 rounded-2xl mb-4 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mb-2">
                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                      Never Miss an Update
                    </span>
                  </h2>
                  <p className="text-base text-secondary-600 dark:text-secondary-300 font-medium leading-relaxed">
                    Subscribe for the latest animations, design tips, and exclusive content delivered straight to your inbox.
                  </p>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 w-full max-w-md">
                  <form
                    className="space-y-4"
                    onSubmit={e => {
                      e.preventDefault();
                      handleSubscribe();
                    }}
                  >
                    {/* Email Input */}
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 bg-white/30 dark:bg-slate-800 backdrop-blur-2xl border border-white/40 dark:border-white/20 rounded-2xl text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500 focus:border-transparent transition-all duration-300 font-medium text-base shadow-lg"
                        required
                        disabled={isSubscribed}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-400/5 dark:to-accent-400/5 rounded-2xl pointer-events-none"></div>
                    </div>

                    {/* Subscribe Button */}
                    <button
                      type="submit"
                      disabled={isSubscribed}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`w-full px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl ${
                        isSubscribed
                          ? "bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white focus:ring-green-500"
                          : "bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 text-white shadow-primary-500/30 dark:shadow-accent-500/30 hover:shadow-primary-500/50 dark:hover:shadow-accent-500/50 focus:ring-primary-500 dark:focus:ring-accent-500"
                      }`}
                    >
                      {isSubscribed ? (
                        <>
                          <CheckCircle className="w-6 h-6 animate-bounce" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          Subscribe Now
                          <ArrowRight
                            className={`w-6 h-6 transition-transform duration-300 ${
                              isHovered ? 'translate-x-2' : ''
                            }`}
                          />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Success Message */}
                  {isSubscribed && (
                    <div className="mt-6 animate-fade-in bg-green-50/80 dark:bg-green-900/30 backdrop-blur-xl border border-green-200/50 dark:border-green-700/30 rounded-xl p-4 shadow-lg">
                      <p className="text-green-700 dark:text-green-300 font-semibold text-center">
                        🎉 Welcome aboard! Check your email for confirmation.
                      </p>
                    </div>
                  )}

                  {/* Trust Indicators */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 font-medium">
                      ✓ No spam, unsubscribe anytime &nbsp;•&nbsp; ✓ 10,000+ happy subscribers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { opacity: 0.8; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
          75% { opacity: 0.6; }
        }
        .animate-float { animation: float 8s linear infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-8px);}
        }
        .animate-bounce { animation: bounce 1s infinite; }
      `}</style>
    </section>
  );
}