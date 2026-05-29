import QuestionnaireForm from './components/QuestionnaireForm';

export default function HomePage() {
  return (
    <main>
      <section className="card hero-panel">
        <div className="hero-grid">
          <div>
            <h1>SECURER-COMPLIANCE V1</h1>
            <p style={{ marginTop: '16px', color: 'var(--muted)', fontSize: '1.05rem' }}>
              Capture requirements and compliance guidance using a clean questionnaire-based workflow.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="tag">User</span>
          </div>
        </div>
      </section>

      <section className="card">
        <QuestionnaireForm />
      </section>

      <section className="card">
        <h2>How the project works</h2>
        <ul style={{ marginTop: '18px', lineHeight: 1.8, color: 'var(--muted)' }}>
          <li>Complete the questionnaire to describe device functionality and security requirements.</li>
          <li>Review the generated requirement statements and test case structure.</li>
          <li>Export the results as structured JSON for later use.</li>
        </ul>
      </section>

      <footer>
        Built for focused system intake and structured output review.
      </footer>
    </main>
  );
}
