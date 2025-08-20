import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Github, ExternalLink, Copy, Check, GitBranch, GitCommit, GitPullRequest, Users, Heart, Book, Terminal, MessageSquare, FileText, Eye, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

const ContributorGuide = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState('');

  const copyToClipboard = (text, commandId) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(commandId);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const commands = [
    {
      id: 'clone',
      title: 'Clone your fork',
      command: 'git clone https://github.com/Premkolte/AnimateHub',
      description: 'Replace YOUR-USERNAME with your GitHub username and REPO-NAME with the repository name'
    },
    {
      id: 'branch',
      title: 'Create a new branch',
      command: 'git checkout -b feature/your-feature-name',
      description: 'Create and switch to a new branch for your changes'
    },
    {
      id: 'add',
      title: 'Stage your changes',
      command: 'git add .',
      description: 'Add all modified files to staging area'
    },
    {
      id: 'commit',
      title: 'Commit your changes',
      command: 'git commit -m "Add: your descriptive commit message"',
      description: 'Commit your staged changes with a clear message'
    },
    {
      id: 'push',
      title: 'Push to your fork',
      command: 'git push origin feature/your-feature-name',
      description: 'Push your branch to your forked repository on GitHub'
    }
  ];

  const steps = [
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Fork the Repository',
      description: 'Click the "Fork" button on the GitHub repository page to create your own copy.',
      details: 'This creates a personal copy of the project in your GitHub account that you can freely modify.'
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'Clone Locally',
      description: 'Download your forked repository to your computer using git clone.',
      details: 'This creates a local working copy where you can make and test your changes.'
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Create a Branch',
      description: 'Create a new branch for your feature or bug fix.',
      details: 'Branches keep your changes organized and separate from the main codebase.'
    },
    {
      icon: <GitCommit className="w-6 h-6" />,
      title: 'Make Changes',
      description: 'Edit files, add features, or fix bugs in your local repository.',
      details: 'Take your time to write clean, well-documented code that follows the project standards.'
    },
    {
      icon: <GitCommit className="w-6 h-6" />,
      title: 'Commit & Push',
      description: 'Save your changes and upload them to your GitHub fork.',
      details: 'Write clear commit messages that explain what changes you made and why.'
    },
    {
      icon: <GitPullRequest className="w-6 h-6" />,
      title: 'Open Pull Request',
      description: 'Submit your changes for review by creating a pull request.',
      details: 'Describe your changes clearly and be open to feedback from maintainers.'
    }
  ];

  const prSteps = [
    {
      icon: <GitPullRequest className="w-7 h-7" />,
      title: 'Navigate to Pull Requests',
      description: 'Go to your forked repository on GitHub and click the "Pull requests" tab.',
      tip: 'You might also see a yellow banner suggesting to create a PR after pushing your branch!'
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Click "New Pull Request"',
      description: 'Click the green "New pull request" button to start creating your PR.',
      tip: 'Make sure you\'re comparing your branch to the correct base repository and branch.'
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: 'Review Your Changes',
      description: 'GitHub will show you a diff of all the changes you\'ve made. Review them carefully.',
      tip: 'This is your last chance to spot any issues before submitting. Look for typos or debugging code!'
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: 'Write a Descriptive Title',
      description: 'Create a clear, concise title that summarizes what your PR accomplishes.',
      tip: 'Good: "Add dark mode toggle to header". Bad: "Updated some files".'
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: 'Add Detailed Description',
      description: 'Explain what changes you made, why you made them, and how to test them.',
      tip: 'Include screenshots for UI changes and mention any breaking changes or dependencies.'
    },
    {
      icon: <CheckCircle2 className="w-7 h-7" />,
      title: 'Submit Your PR',
      description: 'Click "Create pull request" to submit your contribution for review!',
      tip: 'Congratulations! You\'ve just made your first contribution. The maintainers will review it soon.'
    }
  ];

  const faqs = [
    {
      question: 'What is a fork?',
      answer: 'A fork is your personal copy of someone else\'s repository. It allows you to freely experiment with changes without affecting the original project. You can later submit your changes back to the original project through a pull request.',
      category: 'basics',
      icon: <GitBranch className="w-5 h-5" />
    },
    {
      question: 'What is a pull request?',
      answer: 'A pull request (PR) is a way to propose changes to a repository. It lets you tell others about changes you\'ve pushed to a GitHub repository and request that your changes be reviewed and potentially merged into the main project.',
      category: 'basics',
      icon: <GitPullRequest className="w-5 h-5" />
    },
    {
      question: 'What should I name my branch?',
      answer: 'Use descriptive names like "feature/user-authentication", "fix/login-bug", or "docs/readme-update". Avoid generic names like "my-changes" or "patch". The name should clearly indicate what the branch contains.',
      category: 'workflow',
      icon: <GitBranch className="w-5 h-5" />
    },
    {
      question: 'How do I write good commit messages?',
      answer: 'Start with a verb like "Add", "Fix", "Update", or "Remove". Keep it under 50 characters for the title. Example: "Add user profile validation" or "Fix header responsive design issue".',
      category: 'workflow',
      icon: <GitCommit className="w-5 h-5" />
    },
    {
      question: 'What if my PR gets rejected?',
      answer: 'Don\'t take it personally! Rejections often happen due to timing, project direction, or minor issues that can be fixed. Read the feedback carefully, ask questions if unclear, and use it as a learning opportunity.',
      category: 'troubleshooting',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      question: 'How do I handle merge conflicts?',
      answer: 'Merge conflicts occur when your changes conflict with recent updates to the main branch. Pull the latest changes, resolve conflicts manually in your editor, then commit the resolution. Many IDEs have built-in tools to help with this.',
      category: 'troubleshooting',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      question: 'What if I make a mistake?',
      answer: 'Don\'t worry! Git is designed to handle mistakes. You can always create new commits to fix issues, or ask for help in the project\'s discussion forums. The maintainers are usually happy to help newcomers.',
      category: 'troubleshooting',
      icon: <Heart className="w-5 h-5" />
    },
    {
      question: 'How long do pull requests take to review?',
      answer: 'Review times vary by project and maintainer availability. Some PRs are reviewed within hours, others may take days or weeks. Be patient and don\'t hesitate to politely follow up if there\'s no response after a reasonable time.',
      category: 'process',
      icon: <Eye className="w-5 h-5" />
    },
    {
      question: 'Should I create an issue before making a PR?',
      answer: 'For significant changes or new features, yes! Create an issue first to discuss your idea with maintainers. For small bug fixes or typos, you can usually go straight to a PR.',
      category: 'process',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      question: 'How do I update my PR after feedback?',
      answer: 'Simply make the requested changes in your local branch, commit them, and push to the same branch. Your PR will automatically update with the new commits.',
      category: 'process',
      icon: <CheckCircle2 className="w-5 h-5" />
    }
  ];

  const faqCategories = {
    basics: { name: 'Getting Started', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    workflow: { name: 'Git Workflow', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    process: { name: 'Review Process', color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    troubleshooting: { name: 'Common Issues', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' }
  };

  const resources = [
    {
      title: 'GitHub\'s Official Guide',
      description: 'Comprehensive documentation for GitHub beginners',
      url: 'https://docs.github.com/en/get-started',
      icon: <Book className="w-5 h-5" />
    },
    {
      title: 'Git Handbook',
      description: 'Learn the basics of Git version control',
      url: 'https://guides.github.com/introduction/git-handbook/',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      title: 'First Contributions',
      description: 'Hands-on tutorial for your first open source contribution',
      url: 'https://firstcontributions.github.io/',
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#3b82f6] to-[#6a99d6] dark:from-purple-900 dark:to-purple-900 text-white dark:text-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 mr-3 text-red-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Welcome, Future Contributor!</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-white/90 dark:text-gray-200/90">
            We're thrilled you want to contribute! Let's make your first contribution smooth and enjoyable.
          </p>
          <div className="bg-white/10 dark:bg-purple-800/30 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-lg">
              Every expert was once a beginner. This guide will walk you through everything you need to know 
              to make your first contribution with confidence. You've got this! 🚀
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Step-by-Step Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Your Contribution Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-2xl p-6 border-l-4 border-[#3b82f6] dark:border-purple-600 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.37)] dark:hover:shadow-[0_8px_32px_0_rgba(147,51,234,0.37)] transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-900 dark:to-purple-700 p-3 rounded-full mr-4 text-white">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#3b82f6] dark:text-purple-400">STEP {index + 1}</span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{step.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{step.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Git Commands Cheat Sheet */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Essential Git Commands
          </h2>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/50">
            <div className="grid gap-4">
              {commands.map((cmd) => (
                <div key={cmd.id} className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-700 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#accefbff] dark:text-purple-400 font-semibold">{cmd.title}</h4>
                    <button
                      onClick={() => copyToClipboard(cmd.command, cmd.id)}
                      className="flex items-center space-x-2 bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 px-3 py-1 rounded text-sm text-white transition-all duration-300 hover:scale-105"
                    >
                      {copiedCommand === cmd.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCommand === cmd.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-[#3b82f6] dark:text-purple-300 block mb-2 font-mono">{cmd.command}</code>
                  <p className="text-gray-400 dark:text-gray-400 text-sm">{cmd.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pull Request Creation Guide */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Creating Your Pull Request
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Once you've pushed your changes, it's time to create a pull request. This is where your contribution 
              gets reviewed and potentially merged into the main project!
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-2xl border border-blue-200/30 dark:border-purple-700/30">
            <div className="grid gap-8">
              {prSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-600 dark:to-blue-500 p-4 rounded-full text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                      {step.icon}
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-blue-300 to-purple-300 dark:from-purple-500 dark:to-blue-500 mx-auto mt-4 last:hidden"></div>
                  </div>
                  <div className="flex-1 bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/50 dark:border-gray-700/50">
                    <div className="flex items-center mb-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold text-sm">
                        STEP {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 border-l-4 border-blue-400 dark:border-blue-500">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <span className="font-semibold">💡 Pro tip:</span> {step.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Got questions? We've got answers! Click on any question to expand it.
            </p>
          </div>

          {/* FAQ Groups */}
          {Object.entries(faqCategories).map(([categoryKey, categoryInfo]) => {
            const categoryFaqs = faqs.filter(faq => faq.category === categoryKey);
            
            return (
              <div key={categoryKey} className="mb-8">
                <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${categoryInfo.color} bg-clip-text text-transparent`}>
                  {categoryInfo.name}
                </h3>
                <div className="space-y-3">
                  {categoryFaqs.map((faq, index) => {
                    const faqIndex = faqs.indexOf(faq);
                    return (
                      <div key={faqIndex} className="bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg overflow-hidden border border-gray-200/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300">
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === faqIndex ? null : faqIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryInfo.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                              {faq.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                              {faq.question}
                            </h3>
                          </div>
                          <div className={`bg-gradient-to-r ${categoryInfo.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                            {expandedFAQ === faqIndex ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>
                        {expandedFAQ === faqIndex && (
                          <div className={`px-6 pb-6 bg-gradient-to-r ${categoryInfo.bgColor} border-t border-gray-200/30 dark:border-gray-700/30`}>
                            <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 mt-4 backdrop-blur-sm border border-white/50 dark:border-gray-700/50">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* Helpful Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Learning Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-2xl p-6 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.37)] dark:hover:shadow-[0_8px_32px_0_rgba(147,51,234,0.37)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 group border border-gray-200/20 dark:border-gray-700/50"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-900 dark:to-purple-700 p-3 rounded-full mr-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#3b82f6] dark:group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-[#3b82f6] dark:group-hover:text-purple-400 transition-colors duration-300">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{resource.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#3b82f6] to-[#6a99d6] dark:from-purple-900 dark:to-purple-900 rounded-xl p-8 text-center text-white dark:text-gray-200 shadow-[0px_3px_20px_0px_rgba(255,255,255,0.3)] dark:shadow-[0_8px_32px_0_rgba(147,51,234,0.37)]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make Your First Contribution?</h2>
          <p className="text-lg mb-8 text-white/90 dark:text-gray-200/90">
            You're all set! Remember, the community is here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={() => window.open("https://github.com/Premkolte/AnimateHub", "_blank")}
                className="bg-white/95 dark:bg-gray-900/95 text-[#3b82f6] dark:text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center transform hover:-translate-y-0.5"
            >
              <Github className="w-5 h-5 mr-2" />
              Continue to GitHub
            </button>
            <button className="bg-white/20 dark:bg-purple-800/40 text-white dark:text-gray-200 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 dark:hover:bg-purple-700/50 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 border border-white/20">
              Join Our Community Chat
            </button>
          </div>
          <p className="text-sm text-white/80 dark:text-gray-300/80 mt-6">
            💡 Pro tip: Don't hesitate to ask questions in our community channels. We're all here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributorGuide;