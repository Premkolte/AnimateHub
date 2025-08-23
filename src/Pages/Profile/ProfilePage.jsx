import { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiSave, FiLink, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import AllComponents from './components/AllComponents';
import PendingComponents from './components/PendingComponents';
import RejectedComponents from './components/RejectedComponents';

const ProfilePage = () => {
  const { username } = useParams();

  // The data we are going to populate
  const [userData, setUserData] = useState({
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
    rejectedSubmissions: 2,
    role: 'user'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);


  // --------------- API CALLS ---------------
  const fetchUserData = async () => {
    try {
      const apiResponse = await axiosInstance.get(`/profile/u/${username}`);
      const response = apiResponse.data;

      if (response.success) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const updateUserData = async (updatedData) => {
    try {
      const apiResponse = await axiosInstance.patch(`/profile/update`, updatedData);
      const response = apiResponse.data;
      setUserData(response.data);
      return response;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
  // --------------- API CALLS ---------------


  useEffect(() => {
    fetchUserData();
  }, []);



  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      await updateUserData(userData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  // Handle profile picture change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('avatar', file);

      setIsUploading(true)

      // API call to update avatar
      const apiResponse = await axiosInstance.patch('/profile/update/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = apiResponse.data;

      if (response.success) {
        setUserData(prev => ({
          ...prev,
          avatarUrl: response.data.avatarUrl,
        }));
        toast.success('Profile picture updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Reset form
  const resetForm = () => {
    fetchUserData();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900 py-8 sm:py-12 px-4 sm:px-6">
      <div className="">
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg border border-gray-200 dark:border-secondary-700 overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0 h-fit flex justify-center">
                <div className="relative">
                  <img
                    src={userData.avatarUrl}
                    alt={`${userData.fullName}'s profile`}
                    className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-secondary-800 object-cover shadow-lg transition-opacity duration-200 ${!userData.isMyProfile ? 'cursor-default' : 'cursor-pointer hover:opacity-90'
                      } ${isUploading ? 'opacity-70' : ''}`}
                    width={160}
                    height={160}
                    onClick={userData.isMyProfile && !isUploading ? triggerFileInput : undefined}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 rounded-full backdrop-blur-xs">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    aria-label="Upload profile picture"
                    disabled={isUploading}
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 flex flex-col gap-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.username}
                    </h1>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {userData.isMyProfile && (
                      !isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-5 py-2.5 text-sm font-medium bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-secondary-600 rounded-lg transition-all flex items-center gap-2 border border-gray-200 dark:border-secondary-600 text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:shadow-sm"
                        >
                          <FiEdit2 size={16} className="shrink-0" />
                          Edit Profile
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={resetForm}
                            className="px-5 py-2.5 text-sm font-medium bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-secondary-600 rounded-lg transition-all border border-gray-200 dark:border-secondary-600 text-gray-700 dark:text-gray-200 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-5 py-2.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                          >
                            <FiSave size={16} className="shrink-0" />
                            Save Changes
                          </button>
                        </>
                      )
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                      {userData.totalContributions}
                      <span className='text-gray-500 dark:text-gray-400'>{" "}components</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                      {userData.pendingSubmissions}
                      <span className='text-gray-500 dark:text-gray-400'>{" "}Followers</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-normal px-2.5 py-0.5 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full">
                      {userData.role}
                    </p>
                  </div>
                </div>

                {/* Full Name */}
                <>
                  {isEditing && userData.isMyProfile ? (
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={userData.fullName}
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
                </>

                {/* Bio */}
                <>
                  {isEditing && userData.isMyProfile ? (
                    <div className="space-y-1">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={userData.bio}
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
                </>

                {/* Email */}
                {userData.email && <>
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
                </>
                }

                {/* Social Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isEditing ? 'Edit Social Links' : 'Connect with me'}
                  </h3>

                  {isEditing ? (
                    <div className="space-y-3 p-4 bg-gray-50 dark:bg-secondary-700/30 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-2 bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <FiLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <label htmlFor="website" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Website
                            </label>
                            <input
                              id="website"
                              type="url"
                              name="website"
                              value={userData.website || ''}
                              onChange={handleInputChange}
                              placeholder="https://example.com"
                              className="w-full px-0 py-1 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-2 bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <FiGithub className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                          </div>
                          <div className="flex-1">
                            <label htmlFor="github" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              GitHub
                            </label>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">github.com/</span>
                              <input
                                id="github"
                                type="text"
                                name="github"
                                value={userData.github || ''}
                                onChange={handleInputChange}
                                placeholder="username"
                                className="flex-1 px-0 py-1 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-2 bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <FiLinkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <label htmlFor="linkedin" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              LinkedIn
                            </label>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">linkedin.com/in/</span>
                              <input
                                id="linkedin"
                                type="text"
                                name="linkedin"
                                value={userData.linkedin || ''}
                                onChange={handleInputChange}
                                placeholder="username"
                                className="flex-1 px-0 py-1 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-2 bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700">
                          <div className="p-2 bg-sky-50 dark:bg-sky-900/30 rounded-lg">
                            <FiTwitter className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                          </div>
                          <div className="flex-1">
                            <label htmlFor="twitter" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Twitter
                            </label>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">@</span>
                              <input
                                id="twitter"
                                type="text"
                                name="twitter"
                                value={userData.twitter || ''}
                                onChange={handleInputChange}
                                placeholder="username"
                                className="flex-1 px-0 py-1 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Only the username is needed for social media profiles
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {userData.website && (
                        <a
                          href={userData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 rounded-lg bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-secondary-600 transition-colors border border-gray-200 dark:border-secondary-600 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          <FiLink className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium">Website</span>
                        </a>
                      )}
                      {userData.github && (
                        <a
                          href={`https://github.com/${userData.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 rounded-lg bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-secondary-600 transition-colors border border-gray-200 dark:border-secondary-600 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          <FiGithub className="w-4 h-4 mr-2 text-gray-700 dark:text-gray-200" />
                          <span className="text-sm font-medium">GitHub</span>
                        </a>
                      )}
                      {userData.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${userData.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 rounded-lg bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-secondary-600 transition-colors border border-gray-200 dark:border-secondary-600 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          <FiLinkedin className="w-4 h-4 mr-2 text-blue-700 dark:text-blue-400" />
                          <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                      )}
                      {userData.twitter && (
                        <a
                          href={`https://twitter.com/${userData.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 rounded-lg bg-white dark:bg-secondary-700 hover:bg-gray-50 dark:hover:bg-secondary-600 transition-colors border border-gray-200 dark:border-secondary-600 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          <FiTwitter className="w-4 h-4 mr-2 text-sky-500 dark:text-sky-400" />
                          <span className="text-sm font-medium">Twitter</span>
                        </a>
                      )}
                      {!userData.website && !userData.github && !userData.linkedin && !userData.twitter && (
                        <div className="w-full py-4 text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">No social links added yet</p>
                          {userData.isMyProfile && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              Add your social links in edit mode
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            {/* Tabs Navigation */}
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`relative flex-1 py-3 text-center text-sm font-medium transition-colors ${activeTab === 'all'
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                  >
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'all' ? 2 : 1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>POSTS</span>
                      {activeTab === 'all' && (
                        <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></div>
                      )}
                    </div>
                  </button>

                  {userData.isMyProfile && (
                    <>
                      <button
                        onClick={() => setActiveTab('pending')}
                        className={`relative flex-1 py-3 text-center text-sm font-medium transition-colors ${activeTab === 'pending'
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                      >
                        <div className="flex flex-col items-center">
                          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'pending' ? 2 : 1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>PENDING</span>
                          {userData.pendingSubmissions > 0 && (
                            <span className="absolute -top-1 right-4 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                              {userData.pendingSubmissions}
                            </span>
                          )}
                          {activeTab === 'pending' && (
                            <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></div>
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('rejected')}
                        className={`relative flex-1 py-3 text-center text-sm font-medium transition-colors ${activeTab === 'rejected'
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                      >
                        <div className="flex flex-col items-center">
                          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'rejected' ? 2 : 1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>REJECTED</span>
                          {userData.rejectedSubmissions > 0 && (
                            <span className="absolute -top-1 right-4 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                              {userData.rejectedSubmissions}
                            </span>
                          )}
                          {activeTab === 'rejected' && (
                            <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></div>
                          )}
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === 'all' && <AllComponents />}
              {activeTab === 'pending' && userData.isMyProfile && <PendingComponents />}
              {activeTab === 'rejected' && userData.isMyProfile && <RejectedComponents />}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProfilePage;