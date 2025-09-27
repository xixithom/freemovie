import { useState } from 'react';

// Dữ liệu mẫu cho các users
const usersData = [
  {
    id: 1,
    name: "A",
    email: "nguyenvana@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Frontend Developer | React Enthusiast 🚀",
    followers: 1243,
    following: 562,
    posts: 89,
    isOnline: true
  },
  {
    id: 2,
    name: " B",
    email: "tranthib@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "UI/UX Designer 🎨 | Love creating beautiful interfaces",
    followers: 2876,
    following: 823,
    posts: 156,
    isOnline: false
  },
  {
    id: 3,
    name: " C",
    email: "levanc@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Fullstack Developer 💻 | Coffee lover ☕",
    followers: 892,
    following: 321,
    posts: 45,
    isOnline: true
  },
  {
    id: 4,
    name: "D",
    email: "phamthid@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Mobile Developer 📱 | React Native",
    followers: 2105,
    following: 654,
    posts: 112,
    isOnline: true
  }
];

function UserCard() {
  // State để theo dõi user nào đang được follow
  const [followedUsers, setFollowedUsers] = useState(new Set());

  // Hàm toggle follow/unfollow
  const toggleFollow = (userId) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId); // Unfollow
      } else {
        newSet.add(userId); // Follow
      }
      return newSet;
    });
  };

  // Hàm follow tất cả users
  const followAll = () => {
    const allUserIds = usersData.map(user => user.id);
    setFollowedUsers(new Set(allUserIds));
  };

  // Hàm unfollow tất cả users
  const unfollowAll = () => {
    setFollowedUsers(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">👥 User Directory</h1>
          <p className="text-gray-600">Kết nối và theo dõi những người dùng thú vị</p>
          
          {/* Thống kê */}
          <div className="flex justify-center space-x-6 mt-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{usersData.length}</div>
              <div className="text-gray-500">Tổng users</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{followedUsers.size}</div>
              <div className="text-gray-500">Đang theo dõi</div>
            </div>
          </div>

          {/* Nút điều khiển */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={followAll}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
            >
              👍 Follow Tất Cả
            </button>
            <button
              onClick={unfollowAll}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
            >
              👋 Unfollow Tất Cả
            </button>
          </div>
        </div>

        {/* Grid chứa các user card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usersData.map(user => {
            const isFollowed = followedUsers.has(user.id);
            const isOnline = user.isOnline;

            return (
              <div 
                key={user.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                {/* Header với avatar và online status */}
                <div className="relative p-6">
                  <div className="relative inline-block">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {/* Online status indicator */}
                    <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                      isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  {/* Follow button */}
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ${
                      isFollowed 
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isFollowed ? '✅ Đã follow' : '👥 Follow'}
                  </button>
                </div>

                {/* User info */}
                <div className="px-6 pb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{user.email}</p>
                  <p className="text-gray-700 mb-4 text-sm">{user.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                      <div className="font-bold text-gray-800">{user.followers.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{user.following}</div>
                      <div className="text-xs text-gray-500">Following</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{user.posts}</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                  </div>

                  {/* Additional actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition duration-200">
                      💬 Message
                    </button>
                    <button className="flex-1 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition duration-200">
                      👁️ Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer thông tin */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Hiển thị {usersData.length} users • {followedUsers.size} đang được theo dõi
        </div>
      </div>
    </div>
  );
}

export default UserCard;