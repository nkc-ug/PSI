import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/profile.css'; // Custom styling

interface Group {
  name: string;
  members: number;
  introduce: string;
}

interface Word {
  title: string;
  description: string;
  icon?: string;
}

interface ProfileData {
  userName: string;
  joinedGroups: Group[];
  recentWords: Word[];
  createdWords: Word[];
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://127.0.0.1:5000/api/profile') // Adjust the endpoint to match your backend
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error loading profile data</div>;
  }

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-icon"><i className="icon-user" /></div>
        <div className="sidebar-icon"><i className="icon-book" /></div>
        <div className="sidebar-icon"><i className="icon-group" /></div>
        <div className="sidebar-icon"><i className="icon-notification" /></div>
        <div className="sidebar-icon"><i className="icon-star" /></div>
        <div className="sidebar-icon"><i className="icon-back" /></div>
      </div>

      {/* Main Section */}
      <div className="main-section">
        {/* User Info */}
        <div className="user-info">
          <div className="user-avatar">
            <i className="icon-avatar" />
          </div>
          <div className="user-name">
            <h3>{profileData.userName}</h3>
          </div>
        </div>

        {/* Joined Groups */}
        <div className="joined-groups">
          <h4>加入済みのグループ</h4>
          {profileData.joinedGroups.map((group, index) => (
            <div key={index} className="group">
              <h5>{group.name}</h5>
              <p>メンバー: {group.members}人</p>
              <p>{group.introduce}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="recent-words">
          <h4>最近閲覧した単語</h4>
          {profileData.recentWords.map((word, index) => (
            <div key={index} className="word-card">
              <h5>{word.title}</h5>
              <p>{word.description}</p>
            </div>
          ))}
        </div>

        <div className="created-words">
          <h4>作成した単語</h4>
          {profileData.createdWords.map((word, index) => (
            <div key={index} className="word-card">
              <h5>{word.title}</h5>
              <p>{word.description}</p>
              <div className="word-icon">{word.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
