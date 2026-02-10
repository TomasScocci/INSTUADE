import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingView } from './views/LandingView';
import { VotingView } from './views/VotingView';
import { RankingView } from './views/RankingView';
import { ProfileView } from './views/ProfileView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/vote" element={<VotingView />} />
        <Route path="/ranking" element={<RankingView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </Router>
  );
}

export default App;