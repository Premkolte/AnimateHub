// Snippets/NavbarIcons.js

export const navbarIconSnippets = [
    {
      title: 'Search Icon (Animated)',
      tags: ['icon', 'navbar', 'search', 'hover', 'scale'],
      jsxCode: `() => (
        <div className="flex items-center">
          <input type="text" placeholder="Search..." className="border p-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 motion-reduce:transition-none" />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 17.5l4.5 4.5"
              />
            </svg>
          </button>
        </div>
      )`,
      cssCode: `<div style="display: flex; align-items: center;">
        <input type="text" placeholder="Search..." style="border: 1px solid #ccc; padding: 0.5rem; border-radius: 5px; transition: all 0.3s;" />
        <button style="margin-left: 0.5rem; background-color: #007bff; color: white; padding: 0.5rem; border: none; border-radius: 5px; transition: all 0.3s; transform-origin: center; will-change: transform;">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.5 17.5l4.5 4.5"/>
          </svg>
        </button>
      </div>`
    },
    {
      title: 'Notification Icon (Animated)',
      tags: ['icon', 'navbar', 'notification', 'hover', 'rotate'],
      jsxCode: `() => (
        <div className="relative">
          <button className="bg-blue-500 text-white p-2 rounded-full transition-all duration-300 transform hover:rotate-12 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
          <span className="absolute top-0 right-0 block h-4 w-4 bg-red-500 rounded-full"></span>
        </div>
      )`,
      cssCode: `<div style="position: relative;">
        <button style="background-color: #007bff; color: white; padding: 0.5rem; border: none; border-radius: 50%; transition: all 0.3s; transform-origin: center; will-change: transform;">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
        <span style="position: absolute; top: 0; right: 0; display: block; height: 0.75rem; width: 0.75rem; background-color: #ff073a; border-radius: 50%;"></span>
      </div>`
    },
    {
      title: 'Profile Icon (Animated)',
      tags: ['icon', 'navbar', 'profile', 'avatar', 'hover', 'rotate'],
      jsxCode: `() => (
        <div className="flex items-center">
          <div className="relative">
            <button className="bg-blue-500 text-white p-2 rounded-full transition-all duration-300 transform hover:rotate-12 motion-reduce:transition-none motion-reduce:hover:transform-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
              </svg>
            </button>
            <span className="absolute top-0 right-0 block h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
          <span className="ml-2 text-gray-700 font-semibold">John Doe</span>
        </div>
      )`,
      cssCode: `<div style="display: flex; align-items: center;">
        <div style="position: relative;">
          <button style="background-color: #007bff; color: white; padding: 0.5rem; border: none; border-radius: 50%; transition: all 0.3s; transform-origin: center; will-change: transform;">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
            </svg>
          </button>
          <span style="position: absolute; top: 0; right: 0; display: block; height: 0.25rem; width: 0.25rem; background-color: #34d399; border-radius: 50%;"></span>
        </div>
        <span style="margin-left: 0.5rem; color: #4b5563; font-weight: 600;">John Doe</span>
      </div>`
    },
    {
      title: 'Menu Icon (Animated)',
      tags: ['icon', 'navbar', 'menu', 'hamburger', 'hover', 'rotate'],
      jsxCode: `() => (
        <button className="p-2 bg-blue-500 text-white rounded-lg transition-all duration-300 transform hover:rotate-90 motion-reduce:transition-none motion-reduce:hover:transform-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      )`,
      cssCode: `<button style="padding: 0.5rem; background-color: #007bff; color: white; border: none; border-radius: 5px; transition: all 0.3s; transform-origin: center; will-change: transform;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>`
    }
    // Add more icon snippets as needed
  ];