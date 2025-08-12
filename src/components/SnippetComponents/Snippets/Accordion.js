export const accordionSnippets = [
  {
    title: "Basic Accordion",
    cssCode: `<div style="width: 100%; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
  <div style="border-bottom: 1px solid #e5e7eb;">
    <div onclick="toggleAccordion(this)" style="padding: 1rem; background-color: #f9fafb; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-weight: 500; color: #111827;">Section 1</h3>
      <span style="transition: transform 0.3s ease;">▼</span>
    </div>
    <div class="accordion-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background-color: white;">
      <div style="padding: 1rem;">
        <p style="margin: 0; color: #4b5563;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
  <div>
    <div onclick="toggleAccordion(this)" style="padding: 1rem; background-color: #f9fafb; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-weight: 500; color: #111827;">Section 2</h3>
      <span style="transition: transform 0.3s ease;">▼</span>
    </div>
    <div class="accordion-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background-color: white;">
      <div style="padding: 1rem;">
        <p style="margin: 0; color: #4b5563;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
</div>
<script>
function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('span');
  
  if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.style.transform = 'rotate(180deg)';
  } else {
    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
  }
}
</script>`,
    jsxCode: `const [openSection, setOpenSection] = useState(null);

const toggleSection = (index) => {
  setOpenSection(openSection === index ? null : index);
};

return (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="border-b border-gray-200 last:border-b-0">
      <button 
        className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onClick={() => toggleSection(0)}
      >
        <h3 className="font-medium text-gray-900">Section 1</h3>
        <svg 
          className={\`w-5 h-5 transition-transform duration-300 \${openSection === 0 ? 'rotate-180' : ''}\`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {openSection === 0 && (
        <div className="p-4 bg-white">
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      )}
    </div>
    <div>
      <button 
        className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onClick={() => toggleSection(1)}
      >
        <h3 className="font-medium text-gray-900">Section 2</h3>
        <svg 
          className={\`w-5 h-5 transition-transform duration-300 \${openSection === 1 ? 'rotate-180' : ''}\`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {openSection === 1 && (
        <div className="p-4 bg-white">
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      )}
    </div>
  </div>
)`,
  },
  {
    title: "Styled Accordion",
    cssCode: `<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <div style="border: 1px solid #e9d5ff; border-radius: 0.5rem; overflow: hidden;">
    <div onclick="toggleStyledAccordion(this)" style="padding: 1rem; background-color: #faf5ff; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-weight: 600; color: #6b21a8;">Getting Started</h3>
      <span style="color: #9333ea; transition: transform 0.3s ease;">▼</span>
    </div>
    <div class="styled-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background-color: white;">
      <div style="padding: 1rem;">
        <p style="margin: 0; color: #4b5563;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
  <div style="border: 1px solid #e9d5ff; border-radius: 0.5rem; overflow: hidden;">
    <div onclick="toggleStyledAccordion(this)" style="padding: 1rem; background-color: #faf5ff; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-weight: 600; color: #6b21a8;">Advanced Features</h3>
      <span style="color: #9333ea; transition: transform 0.3s ease;">▼</span>
    </div>
    <div class="styled-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background-color: white;">
      <div style="padding: 1rem;">
        <p style="margin: 0; color: #4b5563;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
</div>
<script>
function toggleStyledAccordion(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('span');
  
  if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.style.transform = 'rotate(180deg)';
  } else {
    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
  }
}
</script>`,
    jsxCode: `const [openItem, setOpenItem] = useState(null);

const toggleItem = (index) => {
  setOpenItem(openItem === index ? null : index);
};

return (
  <div className="space-y-2">
    <div className="border border-purple-200 rounded-lg overflow-hidden">
      <button 
        className="flex justify-between items-center w-full p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
        onClick={() => toggleItem(0)}
      >
        <h3 className="font-semibold text-purple-800">Getting Started</h3>
        <svg 
          className={\`w-5 h-5 text-purple-600 transition-transform duration-300 \${openItem === 0 ? 'rotate-180' : ''}\`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {openItem === 0 && (
        <div className="p-4 bg-white">
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      )}
    </div>
    <div className="border border-purple-200 rounded-lg overflow-hidden">
      <button 
        className="flex justify-between items-center w-full p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
        onClick={() => toggleItem(1)}
      >
        <h3 className="font-semibold text-purple-800">Advanced Features</h3>
        <svg 
          className={\`w-5 h-5 text-purple-600 transition-transform duration-300 \${openItem === 1 ? 'rotate-180' : ''}\`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {openItem === 1 && (
        <div className="p-4 bg-white">
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      )}
    </div>
  </div>
)`,
  },
  {
    title: "FAQ Accordion",
    cssCode: `<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 42rem; margin: 0 auto;">
  <div style="border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; background-color: white; overflow: hidden;">
    <div onclick="toggleFAQ(this)" style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 1rem; text-align: left; cursor: pointer;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="display: flex; align-items: center; justify-content: center; background-color: #dbeafe; color: #2563eb; width: 1.5rem; height: 1.5rem; border-radius: 50%; font-size: 0.875rem; font-weight: 500;">Q</span>
        <h3 style="margin: 0; font-weight: 600; color: #334155;">How do I create an account?</h3>
      </div>
      <span style="font-size: 1.5rem; color: #94a3b8; transition: transform 0.3s ease;">+</span>
    </div>
    <div class="faq-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background-color: white;">
      <div style="padding: 1rem; border-top: 1px solid #f1f5f9;">
        <p style="margin: 0; color: #475569; padding-left: 2.25rem;">To create an account, click on the "Sign Up" button in the top right corner.</p>
      </div>
    </div>
  </div>
  <div style="border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; background-color: white; overflow: hidden;">
    <div onclick="toggleFAQ(this)" style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 1rem; text-align: left; cursor: pointer;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="display: flex; align-items: center; justify-content: center; background-color: #dbeafe; color: #2563eb; width: 1.5rem; height: 1.5rem; border-radius: 50%; font-size: 0.875rem; font-weight: 500;">Q</span>
        <h3 style="margin: 0; font-weight: 600; color: #334155;">What payment methods do you accept?</h3>
      </div>
      <span style="font-size: 1.5rem; color: #94a3b8; transition: transform 0.3s ease;">+</span>
    </div>
    <div class="faq-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background-color: white;">
      <div style="padding: 1rem; border-top: 1px solid #f1f5f9;">
        <p style="margin: 0; color: #475569; padding-left: 2.25rem;">We accept all major credit cards and PayPal.</p>
      </div>
    </div>
  </div>
</div>
<script>
function toggleFAQ(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('span:last-child');
  
  if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.style.transform = 'rotate(45deg)';
  } else {
    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
  }
}
</script>`,
    jsxCode: `const [openFAQ, setOpenFAQ] = useState(null);

const toggleFAQ = (index) => {
  setOpenFAQ(openFAQ === index ? null : index);
};

return (
  <div className="space-y-4 max-w-2xl mx-auto">
    <div className="rounded-lg shadow-sm border border-gray-100 bg-white overflow-hidden">
      <button 
        className="flex justify-between items-center w-full p-4 text-left hover:bg-slate-50 transition-colors duration-200"
        onClick={() => toggleFAQ(0)}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-sm font-medium">Q</span>
          <h3 className="font-semibold text-slate-700">How do I create an account?</h3>
        </div>
        <span className={\`text-2xl text-slate-400 transition-transform duration-300 \${openFAQ === 0 ? 'rotate-45' : ''}\`}>+</span>
      </button>
      {openFAQ === 0 && (
        <div className="p-4 bg-white border-t border-gray-100">
          <p className="text-slate-600 pl-9">To create an account, click on the "Sign Up" button in the top right corner.</p>
        </div>
      )}
    </div>
    <div className="rounded-lg shadow-sm border border-gray-100 bg-white overflow-hidden">
      <button 
        className="flex justify-between items-center w-full p-4 text-left hover:bg-slate-50 transition-colors duration-200"
        onClick={() => toggleFAQ(1)}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-sm font-medium">Q</span>
          <h3 className="font-semibold text-slate-700">What payment methods do you accept?</h3>
        </div>
        <span className={\`text-2xl text-slate-400 transition-transform duration-300 \${openFAQ === 1 ? 'rotate-45' : ''}\`}>+</span>
      </button>
      {openFAQ === 1 && (
        <div className="p-4 bg-white border-t border-gray-100">
          <p className="text-slate-600 pl-9">We accept all major credit cards and PayPal.</p>
        </div>
      )}
    </div>
  </div>
)`,
  }
];