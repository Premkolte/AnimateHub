// Snippets/ProfileCard.js

export const profileCardSnippets = [
    {
      title: 'Basic Profile Card',
      jsxCode: `(props) => (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img src="https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg" alt="Profile" className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-gray-600">Frontend Developer</p>
            <a href="#" className="text-blue-500 hover:underline">View Profile</a>
          </div>
        </div>
      )`,
      cssCode: `<div style="background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <img src="" alt="Profile" style="width: 100%; height: 200px; object-fit: cover;" />
        <div style="padding: 1rem;">
          <h3 style="font-size: 1.125rem; font-weight: bold;">John Doe</h3>
          <p style="color: #666; margin-bottom: 0.5rem;">Frontend Developer</p>
          <a href="#" style="color: #007bff; text-decoration: none;">View Profile</a>
        </div>
      </div>`
    },
    {
      title: 'Detailed Profile Card',
      jsxCode: `(props) => (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img src="https://thumbs.dreamstime.com/b/portrait-successful-mature-businesswoman-arms-crossed-confident-business-professional-female-smiling-smart-suit-business-180283728.jpg" alt="Profile" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">Jane Smith</h3>
            <p className="text-gray-600 mb-2">Backend Developer</p>
            <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, elit at lacinia ultricies, risus mi sollicitudin magna.</p>
            <a href="#" className="text-blue-500 hover:underline">View Profile</a>
          </div>
        </div>
      )`,
      cssCode: `<div style="background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <img src="profile.jpg" alt="Profile" style="width: 100%; height: 250px; object-fit: cover;" />
        <div style="padding: 1rem;">
          <h3 style="font-size: 1.25rem; font-weight: bold;">Jane Smith</h3>
          <p style="color: #666; margin-bottom: 0.5rem;">Backend Developer</p>
          <p style="margin-bottom: 0.5rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, elit at lacinia ultricies, risus mi sollicitudin magna.</p>
          <a href="#" style="color: #007bff; text-decoration: none;">View Profile</a>
        </div>
      </div>`
    },
    // Add more snippets as needed
  ];
  