'use client';

import { useMemo, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: string;
  label: string;
  type: 'radio' | 'checkbox';
  required?: boolean;
  options: Option[];
  help?: string;
};

type Answers = Record<string, string | string[]>;

const sections: { title: string; questions: Question[] }[] = [
  {
    title: 'Goals & Purpose',
    questions: [
      {
        id: 'q1',
        label: 'What is the primary reason for deploying this cybersecurity-enabled system?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Security & Protection', value: 'Security & Protection' },
          { label: 'Convenience & Automation', value: 'Convenience & Automation' },
          { label: 'Energy Efficiency', value: 'Energy Efficiency' },
          { label: 'Remote Monitoring for Family/Pets', value: 'Remote Monitoring for Family/Pets' },
          { label: 'Health & Accessibility', value: 'Health & Accessibility' },
          { label: 'Entertainment', value: 'Entertainment' },
        ],
      },
      {
        id: 'q2',
        label: 'What are your top monitoring priorities? (Select up to 3)',
        type: 'checkbox',
        options: [
          { label: 'Family safety (children/elderly)', value: 'Family safety' },
          { label: 'Property security', value: 'Property security' },
          { label: 'Pet monitoring', value: 'Pet monitoring' },
          { label: 'Environmental (temp, leaks)', value: 'Environmental monitoring' },
          { label: 'Energy usage', value: 'Energy usage' },
          { label: 'No specific monitoring needs', value: 'No monitoring needs' },
        ],
      },
      {
        id: 'q3',
        label: 'How important are automated routines?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Essential - full automation', value: 'Essential' },
          { label: 'Important - several automations', value: 'Important' },
          { label: 'Nice to have - basic scheduling', value: 'Nice to have' },
          { label: 'Not important', value: 'Not important' },
        ],
      },
      {
        id: 'q4',
        label: 'What level of remote access do you require?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Full control from anywhere', value: 'Remote control' },
          { label: 'Limited access when away', value: 'Limited remote access' },
          { label: 'Local access only', value: 'Local-only access' },
          { label: 'No remote access needed', value: 'No remote access' },
        ],
      },
    ],
  },
  {
    title: 'Environment & Users',
    questions: [
      {
        id: 'q5',
        label: 'What type of property is this for?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Primary Residence', value: 'Primary Residence' },
          { label: 'Vacation Home', value: 'Vacation Home' },
          { label: 'Rental Property', value: 'Rental Property' },
          { label: 'Home-Based Business', value: 'Home-Based Business' },
        ],
      },
      {
        id: 'q6',
        label: 'What is your dwelling size?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Under 1,500 sq ft', value: 'Under 1,500 sq ft' },
          { label: '1,500 - 3,000 sq ft', value: '1,500 - 3,000 sq ft' },
          { label: 'Over 3,000 sq ft', value: 'Over 3,000 sq ft' },
        ],
      },
      {
        id: 'q7',
        label: 'Who are the primary users?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Single adult/Couple', value: 'Single adult/Couple' },
          { label: 'Family with children', value: 'Family with children' },
          { label: 'Multi-generational household', value: 'Multi-generational household' },
          { label: 'Includes elderly/disabled residents', value: 'Includes elderly/disabled residents' },
        ],
      },
    ],
  },
  {
    title: 'Security Requirements',
    questions: [
      {
        id: 'q8',
        label: 'What are your top security concerns? (Select up to 3)',
        type: 'checkbox',
        options: [
          { label: 'Unauthorized device access', value: 'Unauthorized access' },
          { label: 'Data privacy', value: 'Data privacy' },
          { label: 'Network security', value: 'Network security' },
          { label: 'Physical tampering', value: 'Physical tampering' },
          { label: 'System reliability', value: 'System reliability' },
        ],
      },
      {
        id: 'q9',
        label: 'What authentication method do you prefer?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Password only', value: 'Password only' },
          { label: 'Two-Factor Authentication (2FA)', value: '2FA' },
          { label: 'Biometric verification', value: 'Biometric verification' },
          { label: 'No strong preference', value: 'No strong preference' },
        ],
      },
      {
        id: 'q10',
        label: 'How should user access be managed?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Single administrator', value: 'Single administrator' },
          { label: 'Multiple administrators', value: 'Multiple administrators' },
          { label: 'Role-based access', value: 'Role-based access' },
          { label: 'Individual accounts', value: 'Individual accounts' },
        ],
      },
      {
        id: 'q11',
        label: 'What must work during power/internet outages?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Door locks', value: 'Door locks' },
          { label: 'Security alarms', value: 'Security alarms' },
          { label: 'Critical notifications', value: 'Critical notifications' },
          { label: 'Nothing critical', value: 'Nothing critical' },
        ],
      },
    ],
  },
  {
    title: 'Compliance & Trust',
    questions: [
      {
        id: 'q12',
        label: 'How important are privacy certifications?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Critical - only certified products', value: 'Critical' },
          { label: 'Important - prefer certified', value: 'Important' },
          { label: 'Nice to have', value: 'Nice to have' },
          { label: 'Not important', value: 'Not important' },
        ],
      },
      {
        id: 'q13',
        label: 'What validation would build trust?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Independent security audits', value: 'Independent audits' },
          { label: 'Trial period', value: 'Trial period' },
          { label: 'Manufacturer demonstrations', value: 'Manufacturer demonstrations' },
          { label: 'User reviews', value: 'User reviews' },
          { label: 'No specific validation', value: 'No specific validation' },
        ],
      },
      {
        id: 'q14',
        label: 'What is your minimum expected support lifespan?',
        type: 'radio',
        required: true,
        options: [
          { label: '2-3 years', value: '2-3 years' },
          { label: '4-5 years', value: '4-5 years' },
          { label: '6+ years', value: '6+ years' },
          { label: 'No expectation', value: 'No expectation' },
        ],
      },
      {
        id: 'q15',
        label: 'What would be an immediate deal-breaker? (Select all that apply)',
        type: 'checkbox',
        options: [
          { label: 'Mandatory cloud dependency', value: 'Cloud dependency' },
          { label: 'Poor privacy policy', value: 'Poor privacy policy' },
          { label: 'History of security breaches', value: 'History of security breaches' },
          { label: 'Lack of software updates', value: 'Lack of software updates' },
          { label: 'Cost exceeding budget', value: 'Cost exceeding budget' },
          { label: 'No specific deal-breakers', value: 'No specific deal-breakers' },
        ],
      },
    ],
  },
];

const initialAnswers: Answers = {};

function createRequirementSummary(answers: Answers) {
  const lines: string[] = [];
  if (answers.q1) {
    lines.push(`Primary objective: ${answers.q1}.`);
  }
  if (answers.q4) {
    lines.push(`Required remote access: ${answers.q4}.`);
  }
  if (answers.q9) {
    lines.push(`Authentication style: ${answers.q9}.`);
  }
  if (Array.isArray(answers.q15) && answers.q15.length > 0) {
    lines.push(`Deal-breakers: ${answers.q15.join(', ')}.`);
  }
  return lines.join(' ');
}

function buildRegulatoryAnalysis(answers: Answers) {
  const analysis: { regulation: string; match: string; score: number }[] = [];

  const selected = Array.isArray(answers.q8) ? answers.q8 : [];
  const auth = answers.q9 as string | undefined;
  const access = answers.q10 as string | undefined;

  if (selected.includes('Data privacy') || answers.q12 === 'Critical' || answers.q12 === 'Important') {
    analysis.push({ regulation: 'GDPR / Data Protection', match: 'Data privacy and certification focus', score: 80 });
  } else {
    analysis.push({ regulation: 'GDPR / Data Protection', match: 'Low emphasis on privacy controls', score: 40 });
  }

  if (auth === '2FA' || auth === 'Biometric verification') {
    analysis.push({ regulation: 'NIST SP 800-63', match: 'Strong authentication preference', score: 85 });
  } else if (auth === 'Password only') {
    analysis.push({ regulation: 'NIST SP 800-63', match: 'Password-only authentication reduces compliance score', score: 45 });
  } else {
    analysis.push({ regulation: 'NIST SP 800-63', match: 'Flexible authentication preference', score: 60 });
  }

  if (access === 'Role-based access' || access === 'Individual accounts') {
    analysis.push({ regulation: 'ISO 27001', match: 'Access management aligned with least privilege', score: 80 });
  } else {
    analysis.push({ regulation: 'ISO 27001', match: 'Simpler access model; may require additional controls', score: 55 });
  }

  if (answers.q11 === 'Security alarms' || answers.q11 === 'Door locks' || answers.q11 === 'Critical notifications') {
    analysis.push({ regulation: 'IEC 62443', match: 'Resilience requirements for critical functions', score: 75 });
  } else {
    analysis.push({ regulation: 'IEC 62443', match: 'Minimal outage resilience requested', score: 50 });
  }

  if (selected.includes('Data privacy') || selected.includes('Network security') || auth === '2FA' || auth === 'Biometric verification' || answers.q11 === 'Critical notifications') {
    analysis.push({ regulation: 'RED', match: 'Resilience, encryption, and data protection objectives are aligned.', score: 82 });
  } else {
    analysis.push({ regulation: 'RED', match: 'RED compliance is weak; strengthen resilience and data controls.', score: 52 });
  }

  return analysis;
}

function buildTestableRequirements(answers: Answers) {
  const requirements: { id: string; description: string; notes: string }[] = [];
  const summary = createRequirementSummary(answers);

  if (answers.q4 === 'Remote control' || answers.q4 === 'Limited remote access') {
    requirements.push({
      id: 'REQ-001',
      description: 'The smart home system shall restrict remote control to authenticated users when remote access is enabled.',
      notes: 'Derived from required remote access and authentication preferences.',
    });
  }

  if (answers.q9 === '2FA' || answers.q9 === 'Biometric verification') {
    requirements.push({
      id: 'REQ-002',
      description: 'The system shall support multi-factor authentication for all administrative sessions.',
      notes: 'Derived from strong authentication preference.',
    });
  } else if (answers.q9 === 'Password only') {
    requirements.push({
      id: 'REQ-002',
      description: 'The system shall enforce password complexity and account lockout policies for all users.',
      notes: 'Derived from password-only authentication preference.',
    });
  }

  if (Array.isArray(answers.q8) && answers.q8.includes('Data privacy')) {
    requirements.push({
      id: 'REQ-003',
      description: 'The system shall encrypt sensitive user data at rest and in transit.',
      notes: 'Aligned to data privacy and GDPR-related expectations.',
    });
  }

  if (answers.q10 === 'Role-based access') {
    requirements.push({
      id: 'REQ-004',
      description: 'The system shall enforce role-based access control for user account privileges.',
      notes: 'Derived from access management requirement.',
    });
  }

  if (answers.q11 && answers.q11 !== 'Nothing critical') {
    requirements.push({
      id: 'REQ-005',
      description: 'The system shall maintain critical security functionality during power or network outages based on selected critical functions.',
      notes: 'Captures resilience expectations for outage conditions.',
    });
  }

  if (summary) {
    requirements.unshift({
      id: 'REQ-000',
      description: `Baseline requirement summary: ${summary}`,
      notes: 'High-level requirement extracted from user intent.',
    });
  }

  return requirements;
}

function buildTestSpecifications(requirements: ReturnType<typeof buildTestableRequirements>) {
  return requirements.map((req) => {
    const steps: string[] = [];

    if (req.id === 'REQ-001') {
      steps.push('Review the remote access feature configuration.');
      steps.push('Attempt to perform remote operations without authentication.');
      steps.push('Verify access is denied and an audit event is recorded.');
    }

    if (req.id === 'REQ-002') {
      if (req.description.toLowerCase().includes('multi-factor')) {
        steps.push('Review authentication policy for admin login.');
        steps.push('Login using only a password and verify rejection.');
        steps.push('Login using the approved second factor and verify success.');
      } else {
        steps.push('Review the password policy and account lockout configuration.');
        steps.push('Attempt login with a weak password and verify rejection.');
        steps.push('Trigger multiple failed logins and verify account lockout or challenge behavior.');
      }
    }

    if (req.id === 'REQ-003') {
      steps.push('Collect samples of data sent from device to backend.');
      steps.push('Confirm transport uses TLS or equivalent encryption.');
      steps.push('Check encrypted storage scope for sensitive fields.');
    }

    if (req.id === 'REQ-004') {
      steps.push('Inspect user account roles configured in system settings.');
      steps.push('Attempt an action with lower privilege account and verify denial.');
      steps.push('Confirm audit logging captures role-based access changes.');
    }

    if (req.id === 'REQ-005') {
      steps.push('Simulate a power or network outage scenario.');
      steps.push(`Confirm the selected critical function (${req.notes}) remains available.`);
      steps.push('Verify any fallback notification is delivered as expected.');
    }

    return {
      id: `TS-${req.id}`,
      requirementId: req.id,
      description: req.description,
      steps,
    };
  });
}

function buildGenericTestCases(requirements: ReturnType<typeof buildTestableRequirements>) {
  return requirements.map((req) => {
    const steps: string[] = [];
    const title = `Verify requirement ${req.id}`;

    if (req.id === 'REQ-001') {
      steps.push('Confirm remote access is only permitted after successful authentication.');
      steps.push('Attempt an unauthenticated remote action and verify it is rejected.');
      steps.push('Review audit logs for unauthorized remote access attempts.');
    }

    if (req.id === 'REQ-002') {
      if (req.description.toLowerCase().includes('multi-factor')) {
        steps.push('Identify supported authentication factors in the system.');
        steps.push('Attempt login with only the primary factor and verify it is denied.');
        steps.push('Authenticate with the required second factor and verify access is granted.');
      } else {
        steps.push('Review the configured password policy and account lockout settings.');
        steps.push('Attempt login with a weak password and verify it is rejected.');
        steps.push('Trigger repeated failed logins and verify the account is locked or challenged.');
      }
    }

    if (req.id === 'REQ-003') {
      steps.push('Capture a sample of sensitive data in transit and verify encryption is applied.');
      steps.push('Inspect storage or database settings for encryption of sensitive fields.');
      steps.push('Verify plaintext data is not retained in logs or backups.');
    }

    if (req.id === 'REQ-004') {
      steps.push('Review the configured user roles and assigned privileges.');
      steps.push('Attempt an action with a lower-privilege account and verify it is denied.');
      steps.push('Confirm any privilege changes are logged for audit purposes.');
    }

    if (req.id === 'REQ-005') {
      steps.push('Simulate a service outage scenario for the selected critical component.');
      steps.push('Verify the system either continues critical operation or fails safely.');
      steps.push('Confirm notifications or fallback behavior occur as documented.');
    }

    return {
      id: `TC-${req.id}`,
      requirementId: req.id,
      title,
      description: `Generic test case for ${req.description.toLowerCase()}`,
      steps,
      notes: 'Adapt this generic test case to your IoT device or system language and execution environment.',
    };
  });
}

export default function QuestionnaireForm() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const currentSection = sections[currentPage];

  const progress = ((currentPage + 1) / sections.length) * 100;

  const analysis = useMemo(() => buildRegulatoryAnalysis(answers), [answers]);
  const requirements = useMemo(() => buildTestableRequirements(answers), [answers]);
  const specifications = useMemo(() => buildTestSpecifications(requirements), [requirements]);
  const genericTestCases = useMemo(() => buildGenericTestCases(requirements), [requirements]);

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId]) ? [...prev[questionId]] : [];
      const index = current.indexOf(value);
      if (index >= 0) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }
      return { ...prev, [questionId]: current };
    });
  };

  const validateSection = () => {
    return currentSection.questions.every((question) => {
      if (!question.required) return true;
      const value = answers[question.id];
      if (question.type === 'radio') {
        return typeof value === 'string' && value.length > 0;
      }
      if (question.type === 'checkbox') {
        return Array.isArray(value) && value.length > 0;
      }
      return true;
    });
  };

  const submitForm = () => {
    if (!validateSection()) {
      window.alert('Please complete all required items before submitting.');
      return;
    }
    setSubmitted(true);
  };

  const downloadResults = () => {
    const payload = {
      collected_answers: answers,
      regulatory_analysis: analysis,
      testable_requirements: requirements,
      test_specifications: specifications,
      generic_test_cases: genericTestCases,
      generated_at: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'securer_compliance_results.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="summary-box" style={{ marginBottom: '18px' }}>
        <p style={{ fontWeight: 700, marginBottom: '10px' }}>Section</p>
        <div className="progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>Current section</p>
            <h2>{currentSection.title}</h2>
          </div>
          <div>
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>Completion</p>
            <span className="tag">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {!submitted ? (
        <div className="grid">
          {currentSection.questions.map((question) => {
            const value = answers[question.id];
            const selectedValues = Array.isArray(value) ? value : [value].filter(Boolean);
            return (
              <div key={question.id} className="question-block active">
                <label className="question-label">
                  {question.label} {question.required ? '*' : ''}
                </label>
                <div className="options">
                  {question.options.map((option) => {
                    const isChecked = selectedValues.includes(option.value);
                    return (
                      <label key={option.value} className={`option ${isChecked ? 'selected' : ''}`}>
                        <input
                          type={question.type}
                          name={question.id}
                          value={option.value}
                          checked={isChecked}
                          onChange={() =>
                            question.type === 'radio'
                              ? handleRadioChange(question.id, option.value)
                              : handleCheckboxChange(question.id, option.value)
                          }
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              className="secondary"
              onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            {currentPage < sections.length - 1 ? (
              <button type="button" className="primary" onClick={() => {
                if (validateSection()) {
                  setCurrentPage((page) => page + 1);
                } else {
                  window.alert('Please complete all required items for this section.');
                }
              }}>
                Next
              </button>
            ) : (
              <button type="button" className="primary" onClick={submitForm}>
                Submit Questionnaire
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid">
          <div className="analysis-box">
            <h2>Requirements Summary</h2>
            <p style={{ margin: '16px 0 0', color: 'var(--muted)' }}>
              The questionnaire has been converted into compliance-aligned requirements and analysis. Use this as the basis for regulatory evaluation, test design, and mitigation planning.
            </p>
            <div className="summary-grid" style={{ marginTop: '22px' }}>
              {requirements.map((req) => (
                <div key={req.id} style={{ padding: '16px', borderRadius: '18px', background: '#ffffff', border: '1px solid var(--border)' }}>
                  <p style={{ fontWeight: 700 }}>{req.id}</p>
                  <p style={{ marginTop: '10px', color: 'var(--text)' }}>{req.description}</p>
                  <p style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '0.95rem' }}>{req.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-box">
            <h2>Regulatory Comparison</h2>
            <div className="summary-grid" style={{ marginTop: '22px' }}>
              {analysis.map((item) => (
                <div key={item.regulation} style={{ padding: '16px', borderRadius: '18px', background: '#ffffff', border: '1px solid var(--border)' }}>
                  <p style={{ fontWeight: 700 }}>{item.regulation}</p>
                  <p style={{ marginTop: '10px' }}>{item.match}</p>
                  <p style={{ marginTop: '10px', color: 'var(--muted)' }}>Achieved score: {item.score}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-box">
            <h2>Test Specifications</h2>
            <div className="summary-grid" style={{ marginTop: '22px' }}>
              {specifications.map((spec) => (
                <div key={spec.id} style={{ padding: '16px', borderRadius: '18px', background: '#ffffff', border: '1px solid var(--border)' }}>
                  <p style={{ fontWeight: 700 }}>{spec.id}</p>
                  <p style={{ marginTop: '10px' }}>{spec.description}</p>
                  <ol style={{ marginTop: '12px', paddingLeft: '20px', color: 'var(--muted)' }}>
                    {spec.steps.map((step, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-box">
            <h2>Generic Test Cases</h2>
            <p style={{ marginTop: '10px', color: 'var(--muted)' }}>
              These language-agnostic test cases are ready to be adapted to any IoT or system implementation.
            </p>
            <div className="summary-grid" style={{ marginTop: '22px' }}>
              {genericTestCases.map((tc) => (
                <div key={tc.id} style={{ padding: '16px', borderRadius: '18px', background: '#ffffff', border: '1px solid var(--border)' }}>
                  <p style={{ fontWeight: 700 }}>{tc.id}</p>
                  <p style={{ marginTop: '10px' }}>{tc.title}</p>
                  <p style={{ marginTop: '10px', color: 'var(--muted)' }}>{tc.notes}</p>
                  <ol style={{ marginTop: '12px', paddingLeft: '20px', color: 'var(--muted)' }}>
                    {tc.steps.map((step, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
            <button type="button" className="secondary" onClick={downloadResults}>
              Download JSON results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
