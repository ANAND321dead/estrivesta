import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2, Layers, BarChart2, Megaphone, Users, DollarSign,
  CheckCircle, RefreshCw, CameraOff, Lightbulb, ArrowRight,
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

const roles = [
  { id: 'se', label: 'Software Engineer', icon: Code2 },
  { id: 'pm', label: 'Product Manager', icon: Layers },
  { id: 'da', label: 'Data Analyst', icon: BarChart2 },
  { id: 'mm', label: 'Marketing Manager', icon: Megaphone },
  { id: 'hr', label: 'Human Resources', icon: Users },
  { id: 'fa', label: 'Finance Analyst', icon: DollarSign },
];

const difficulties = [
  { id: 'easy', label: 'Easy', color: 'mint' },
  { id: 'medium', label: 'Medium', color: 'warning' },
  { id: 'hard', label: 'Hard', color: 'danger' },
];

const categories = ['All', 'Behavioral', 'Technical', 'HR'];

const questionBank = {
  se: {
    All: [
      'Tell me about a challenging project you worked on and how you overcame the technical hurdles.',
      'Describe a time you had to learn a new technology quickly to deliver a project.',
    ],
    Behavioral: [
      'Tell me about a time you disagreed with a senior engineer and how you resolved it.',
      'Describe a situation where you had to work under a tight deadline.',
    ],
    Technical: [
      'Explain how you would design a URL shortening service like bit.ly that handles millions of requests.',
      'Walk me through your approach to debugging a production issue that only occurs intermittently.',
    ],
    HR: [
      'Why do you want to work for our company specifically?',
      'Where do you see yourself in the next five years?',
    ],
  },
  pm: {
    All: [
      'Walk me through how you would prioritize features for a new product launch.',
      'Tell me about a product you launched that failed and what you learned.',
    ],
    Behavioral: [
      'Describe a time you had to make a decision with incomplete data.',
      'Tell me about a time you influenced engineering to change their roadmap.',
    ],
    Technical: [
      'How would you measure the success of a new onboarding flow?',
      'Design a feature that helps users discover content they did not know they wanted.',
    ],
    HR: [
      'What makes you passionate about product management?',
      'How do you handle disagreements with leadership on product direction?',
    ],
  },
  da: {
    All: [
      'Explain a complex data analysis project you worked on and the business impact it had.',
      'How do you handle missing or corrupted data in a dataset?',
    ],
    Behavioral: [
      'Tell me about a time your analysis contradicted your team\'s assumptions.',
      'Describe a situation where you had to present findings to non-technical stakeholders.',
    ],
    Technical: [
      'Walk me through how you would build a churn prediction model from scratch.',
      'Explain the difference between supervised and unsupervised learning with examples.',
    ],
    HR: [
      'Why did you choose data analytics as a career?',
      'How do you stay updated with the latest tools and techniques?',
    ],
  },
  mm: {
    All: [
      'Tell me about a marketing campaign you led from concept to execution.',
      'How do you measure the ROI of a brand awareness campaign?',
    ],
    Behavioral: [
      'Describe a time a campaign underperformed and how you pivoted.',
      'Tell me about a time you had to manage a limited budget effectively.',
    ],
    Technical: [
      'How would you build a go-to-market strategy for a B2B SaaS product in India?',
      'Explain your approach to A/B testing ad creatives at scale.',
    ],
    HR: [
      'What trends in marketing excite you the most right now?',
      'How do you balance creativity with data-driven decisions?',
    ],
  },
  hr: {
    All: [
      'Tell me about a difficult employee situation you handled and the outcome.',
      'How do you ensure fairness and reduce bias in the hiring process?',
    ],
    Behavioral: [
      'Describe a time you had to deliver difficult feedback to a colleague.',
      'Tell me about a conflict you mediated between two team members.',
    ],
    Technical: [
      'How would you design an onboarding program for 50 new hires in a month?',
      'What metrics would you track to measure employee engagement?',
    ],
    HR: [
      'What drew you to a career in human resources?',
      'How do you maintain confidentiality while being approachable?',
    ],
  },
  fa: {
    All: [
      'Walk me through a financial model you built and the key assumptions behind it.',
      'Tell me about a time your financial analysis influenced a major business decision.',
    ],
    Behavioral: [
      'Describe a time you found a significant discrepancy in financial reports.',
      'Tell me about a time you had to present bad financial news to leadership.',
    ],
    Technical: [
      'How would you value a startup with no revenue but strong user growth?',
      'Explain how you would build a 12-month cash flow forecast for a growing company.',
    ],
    HR: [
      'Why are you interested in finance as a career path?',
      'How do you handle the pressure of month-end close deadlines?',
    ],
  },
};

function getQuestion(roleId, category) {
  const pool = questionBank[roleId]?.[category] || questionBank[roleId]?.All || [];
  return pool[Math.floor(Math.random() * pool.length)] || 'Tell me about yourself and why you are interested in this role.';
}

const difficultyColorMap = {
  easy: { selected: 'bg-accent-mint text-white border-accent-mint', label: 'Easy' },
  medium: { selected: 'bg-accent-warning text-white border-accent-warning', label: 'Medium' },
  hard: { selected: 'bg-accent-danger text-white border-accent-danger', label: 'Hard' },
};

export default function PracticePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('All');
  const [question, setQuestion] = useState('');
  const [questionKey, setQuestionKey] = useState(0);

  // Camera check state
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [faceCentered, setFaceCentered] = useState(false);
  const [goodLighting, setGoodLighting] = useState(false);

  const shuffleQuestion = () => {
    setQuestion(getQuestion(selectedRole, category));
    setQuestionKey((k) => k + 1);
  };

  const selectRole = (roleId) => {
    setSelectedRole(roleId);
    setQuestion(getQuestion(roleId, category));
    setQuestionKey((k) => k + 1);
  };

  const switchCategory = (cat) => {
    setCategory(cat);
    if (selectedRole) {
      setQuestion(getQuestion(selectedRole, cat));
      setQuestionKey((k) => k + 1);
    }
  };

  const startCamera = async () => {
    setCameraError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraReady(true);
      setMicReady(true);
    } catch (err) {
      setCameraError(true);
    }
  };

  useEffect(() => {
    if (step === 2) {
      startCamera();
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [step]);

  const selectedRoleObj = roles.find((r) => r.id === selectedRole);
  const checklist = [
    { checked: cameraReady, label: 'Camera detected', desc: 'Webcam is connected and streaming', auto: true },
    { checked: micReady, label: 'Microphone detected', desc: 'Microphone is capturing audio', auto: true },
    { checked: faceCentered, label: 'Face centered', desc: 'Your face is positioned in the frame', auto: false },
    { checked: goodLighting, label: 'Good lighting', desc: 'Your face is well-lit and visible', auto: false },
  ];
  const allChecked = checklist.every((c) => c.checked);

  const diffStyle = difficultyColorMap[difficulty];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      <div className="md:ml-[240px] min-h-screen pb-20 md:pb-0">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 py-8">
          {/* Step indicator */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center gap-3">
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= 1
                      ? 'bg-accent-violet text-white'
                      : 'border-2 border-border text-text-muted'
                  }`}
                >
                  {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                </div>
                <span className={`text-sm font-medium ${step >= 1 ? 'text-white' : 'text-text-muted'}`}>
                  Choose Question
                </span>
              </div>
              {/* Connector */}
              <div className="w-16 h-0.5 rounded-full bg-border relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-accent-violet transition-all duration-500"
                  style={{ width: step > 1 ? '100%' : '0%' }}
                />
              </div>
              {/* Step 2 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= 2
                      ? 'bg-accent-violet text-white'
                      : 'border-2 border-border text-text-muted'
                  }`}
                >
                  2
                </div>
                <span className={`text-sm font-medium ${step >= 2 ? 'text-white' : 'text-text-muted'}`}>
                  Camera Check
                </span>
              </div>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-8" style={{ animation: 'fadeInUp 0.4s ease' }}>
              <div>
                <h1 className="text-[28px] font-bold text-white mb-2">Set Up Your Practice Session</h1>
                <p className="text-text-secondary">Choose your role, difficulty, and get your question</p>
              </div>

              {/* Role selector */}
              <div>
                <h2 className="text-white text-sm font-semibold mb-4">What are you interviewing for?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        onClick={() => selectRole(role.id)}
                        className={`relative flex items-center gap-3 p-4 rounded-[12px] border text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-accent-violet bg-accent-violet/10'
                            : 'border-border bg-bg-surface hover:border-accent-violet/40 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-accent-violet/20' : 'bg-bg-elevated'
                        }`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-accent-violet' : 'text-text-secondary'}`} />
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
                          {role.label}
                        </span>
                        {isSelected && (
                          <CheckCircle className="absolute top-3 right-3 w-4 h-4 text-accent-violet" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h2 className="text-white text-sm font-semibold mb-4">Select Difficulty</h2>
                <div className="flex gap-3">
                  {difficulties.map((diff) => {
                    const isSelected = difficulty === diff.id;
                    const style = difficultyColorMap[diff.id];
                    return (
                      <button
                        key={diff.id}
                        onClick={() => setDifficulty(diff.id)}
                        className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                          isSelected
                            ? style.selected
                            : 'bg-bg-surface border-border text-text-secondary hover:border-accent-violet/40'
                        }`}
                      >
                        {diff.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category tabs */}
              <div>
                <h2 className="text-white text-sm font-semibold mb-4">Question Category</h2>
                <div className="flex gap-1 border-b border-border">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => switchCategory(cat)}
                      className={`px-4 py-2.5 text-sm font-medium relative transition-colors duration-200 ${
                        category === cat ? 'text-accent-violet' : 'text-text-secondary hover:text-white'
                      }`}
                    >
                      {cat}
                      {category === cat && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-violet" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question preview */}
              {selectedRole && question && (
                <div
                  className="relative bg-bg-surface border border-border rounded-[12px] p-6 overflow-hidden"
                  style={{ animation: 'fadeInUp 0.3s ease' }}
                  key={questionKey}
                >
                  <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-accent-violet" />
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-text-secondary text-sm font-medium">Your Question</h3>
                    <button
                      onClick={shuffleQuestion}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent-violet border border-border hover:border-accent-violet/50 rounded-[6px] px-2.5 py-1.5 transition-all"
                    >
                      <RefreshCw className="w-3 h-3" />
                      New Question
                    </button>
                  </div>
                  <p className="text-white text-lg leading-[1.7] mb-4">{question}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{selectedRoleObj?.label}</Badge>
                    <Badge variant={difficulty === 'easy' ? 'success' : difficulty === 'medium' ? 'warning' : 'danger'}>
                      {diffStyle.label}
                    </Badge>
                    <Badge variant="default">{category}</Badge>
                  </div>
                </div>
              )}

              {/* Bottom action */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!selectedRole}
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => setStep(2)}
                  className={!selectedRole ? '' : ''}
                >
                  Continue to Camera Check
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 — Camera Check */}
          {step === 2 && (
            <div className="flex flex-col gap-6" style={{ animation: 'fadeInUp 0.4s ease' }}>
              <div>
                <h1 className="text-[28px] font-bold text-white mb-2">Let's make sure you're ready</h1>
                <p className="text-text-secondary">Check your camera, microphone, and environment before starting</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left — webcam preview */}
                <div>
                  <div className="relative bg-bg-surface border border-border rounded-[12px] overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    {cameraError ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <CameraOff className="w-12 h-12 text-text-muted" />
                        <div className="text-center">
                          <p className="text-white font-semibold mb-1">Camera access required</p>
                          <p className="text-text-secondary text-sm">Please allow camera and microphone access</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={startCamera}>
                          Retry
                        </Button>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        {/* Face positioning guide */}
                        {!cameraError && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div
                              className="border-2 border-dashed border-white/30 rounded-[50%] flex items-center justify-center"
                              style={{ width: '45%', height: '70%' }}
                            >
                              <span className="text-white/50 text-xs font-medium bg-black/30 px-2 py-1 rounded">
                                Position your face here
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Right — checklist + tips */}
                <div className="flex flex-col gap-5">
                  {/* Checklist */}
                  <div>
                    <h2 className="text-white text-lg font-bold mb-4">Pre-session checklist</h2>
                    <div className="flex flex-col gap-3">
                      {checklist.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 p-3 rounded-[8px] border transition-all duration-300 ${
                            item.checked
                              ? 'bg-accent-mint/5 border-accent-mint/20'
                              : 'bg-bg-surface border-border'
                          }`}
                        >
                          {item.auto ? (
                            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.checked ? 'text-accent-mint' : 'text-text-muted'}`} />
                          ) : (
                            <button
                              onClick={() => {
                                if (index === 2) setFaceCentered(!faceCentered);
                                if (index === 3) setGoodLighting(!goodLighting);
                              }}
                              className="flex-shrink-0 mt-0.5"
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                item.checked
                                  ? 'border-accent-mint bg-accent-mint'
                                  : 'border-border hover:border-accent-violet/50'
                              }`}>
                                {item.checked && <CheckCircle className="w-3 h-3 text-white" />}
                              </div>
                            </button>
                          )}
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${item.checked ? 'text-accent-mint' : 'text-text-secondary'}`}>
                              {item.label}
                            </p>
                            <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips box */}
                  <div className="bg-bg-elevated border border-border rounded-[12px] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-accent-warning" />
                      <span className="text-sm font-semibold text-white">Tips for best results</span>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {[
                        'Look at the camera lens, not the screen',
                        'Sit facing a window for natural light',
                        'Speak at a normal, conversational pace',
                        'Keep your face within the frame',
                      ].map((tip) => (
                        <li key={tip} className="flex items-center gap-2 text-sm text-text-secondary">
                          <span className="w-1 h-1 rounded-full bg-accent-violet flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom action */}
              <div className="flex justify-between items-center pt-2">
                <Button variant="ghost" size="md" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!allChecked}
                  onClick={() => navigate('/session')}
                >
                  Start Recording
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
