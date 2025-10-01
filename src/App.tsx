import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Materials from './components/Materials';
import TestsQuizzes from './components/TestsQuizzes';
import Videos from './components/Videos';
import Contact from './components/Contact';

type Section = 'home' | 'materials' | 'videos' | 'tests' | 'contact';

interface TestHistory {
  id: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
  answers: (string | number)[];
  questions: any[];
}

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const addTestResult = (result: TestHistory) => {
    setTestHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home onSectionChange={setCurrentSection} />;
      case 'materials':
        return <Materials materials={materials} setMaterials={setMaterials} />;
      case 'videos':
        return <Videos videos={videos} setVideos={setVideos} />;
      case 'tests':
        return <TestsQuizzes testHistory={testHistory} onTestComplete={addTestResult} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderSection()}
    </Layout>
  );
}

export default App;