import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Landing from './components/Landing/Landing';
import PersonalArea from './components/Personal/PersonalArea';
import WorkArea from './components/Work/WorkArea';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentArea, setCurrentArea] = useState<'landing' | 'personal' | 'work'>('landing');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentArea('personal');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentArea('landing');
  };

  const navigateToArea = (area: 'personal' | 'work') => {
    setCurrentArea(area);
  };

  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-gray-900">
          {currentArea === 'landing' && (
            <Landing onLogin={handleLogin} />
          )}
          {currentArea === 'personal' && currentUser && (
            <PersonalArea 
              user={currentUser} 
              onLogout={handleLogout}
              onNavigate={navigateToArea}
            />
          )}
          {currentArea === 'work' && currentUser && (
            <WorkArea 
              user={currentUser} 
              onLogout={handleLogout}
              onNavigate={navigateToArea}
            />
          )}
        </div>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;