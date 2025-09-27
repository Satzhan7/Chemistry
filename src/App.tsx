import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Materials from './components/Materials';
import TestsQuizzes from './components/TestsQuizzes';
import Contact from './components/Contact';

type Section = 'home' | 'materials' | 'tests' | 'contact';

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

  const addTestResult = (result: TestHistory) => {
    setTestHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home />;
      case 'materials':
        return <Materials />;
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