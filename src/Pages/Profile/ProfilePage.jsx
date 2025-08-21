import { useState, useRef } from 'react';
import { FiEdit2, FiSave, FiLink, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  // Initial user data
  const initialUserData = {
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'johndoe@gmail.com',
    isVerified: false,
    avatarUrl: 'https://i.pinimg.com/736x/14/43/55/144355d7b36c5f646435423798281ce9.jpg',
    bio: 'Frontend Developer | Open Source Contributor',
    website: 'https://johndoe.com',
    github: 'johndoe',
    linkedin: 'johndoe',
    twitter: 'johndoe',
    totalContributions: 12,
    pendingSubmissions: 3,
    role: 'user'
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...initialUserData });
  const fileInputRef = useRef(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const handleSave = () => {
    // In a real app, you would make an API call here
    setUserData({ ...tempData });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // In a real app, you would upload the image to your server here
        // and then update the avatarUrl with the returned URL
        setTempData(prev => ({
          ...prev,
          avatarUrl: reader.result
        }));
      };
      reader.onerror = () => {
        toast.error('Error reading the image file');
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Reset form
  const resetForm = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0 h-fit flex justify-center">
                <div className="relative group">
                  <img
                    src={tempData.avatarUrl}
                    alt={`${tempData.fullName}'s profile`}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-secondary-700 object-cover shadow-md"
                    width={160}
                    height={160}
                  />
                  {isEditing && (
                    <button
                      onClick={triggerFileInput}
                      className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-all transform hover:scale-110"
                      aria-label="Change profile picture"
                    >
                      <FiEdit2 size={18} />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    aria-label="Upload profile picture"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 mt-6 md:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {tempData.username}
                  </h1>
                  <div className="flex gap-3">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 rounded-md transition-colors flex items-center gap-2"
                      >
                        <FiEdit2 size={16} />
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={resetForm}
                          className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center gap-2"
                        >
                          <FiSave size={16} />
                          Save Changes
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mb-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {userData.totalContributions}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Contributions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {userData.pendingSubmissions}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                  </div>
                  {userData.role === 'admin' && (
                    <div className="text-center">
                      <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full">
                        Admin
                      </span>
                    </div>
                  )}
                </div>

                {/* Full Name */}
                <div className="mb-4">
                  {isEditing ? (
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={tempData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {userData.fullName}
                    </h2>
                  )}
                </div>

                {/* Bio */}
                <div className="mb-6">
                  {isEditing ? (
                    <div className="space-y-1">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={tempData.bio}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      {userData.bio || 'No bio provided.'}
                    </p>
                  )}
                </div>

                {/* Email */}
                {!userData.email && <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {userData.email}
                      </span>
                      {!userData.isVerified && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Not Verified
                        </span>
                      )}
                    </div>
                  </div>
                </>
                }

                {/* Social Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Social Links
                  </h3>
                  <div className="space-y-2">
                    {isEditing ? (
                      <>
                        <div className="flex items-center">
                          <FiLink className="text-gray-500 mr-2" />
                          <input
                            type="url"
                            name="website"
                            value={tempData.website}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center">
                          <FiGithub className="text-gray-500 mr-2" />
                          <input
                            type="text"
                            name="github"
                            value={tempData.github}
                            onChange={handleInputChange}
                            placeholder="GitHub username"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center">
                          <FiLinkedin className="text-gray-500 mr-2" />
                          <input
                            type="text"
                            name="linkedin"
                            value={tempData.linkedin}
                            onChange={handleInputChange}
                            placeholder="LinkedIn username"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center">
                          <FiTwitter className="text-gray-500 mr-2" />
                          <input
                            type="text"
                            name="twitter"
                            value={tempData.twitter}
                            onChange={handleInputChange}
                            placeholder="Twitter username"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-wrap gap-4">
                        {userData.website && (
                          <a
                            href={userData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          >
                            <FiLink className="mr-1.5" />
                            {new URL(userData.website).hostname.replace('www.', '')}
                          </a>
                        )}
                        {userData.github && (
                          <a
                            href={`https://github.com/${userData.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                          >
                            <FiGithub className="mr-1.5" />
                            @{userData.github}
                          </a>
                        )}
                        {userData.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${userData.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          >
                            <FiLinkedin className="mr-1.5" />
                            {userData.linkedin}
                          </a>
                        )}
                        {userData.twitter && (
                          <a
                            href={`https://twitter.com/${userData.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
                          >
                            <FiTwitter className="mr-1.5" />
                            @{userData.twitter}
                          </a>
                        )}
                        {!userData.website && !userData.github && !userData.linkedin && !userData.twitter && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">No social links added</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 p-4">
                  <h3 className="text-lg font-semibold mb-2">Post {index + 1}</h3>
                  <p className="text-gray-600 dark:text-gray-400">This is a sample post description.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;