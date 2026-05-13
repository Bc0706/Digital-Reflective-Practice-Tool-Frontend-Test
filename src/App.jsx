import { useState } from 'react';

const SCREENS = {
  LOGIN: 'login',
  NGRN_DASHBOARD: 'ngrn-dashboard',
  FIND_EDUCATOR: 'find-educator',
  REFLECTION_STAGE_1: 'reflection-stage-1',
  REFLECTION_STAGE_2: 'reflection-stage-2',
  REFLECTION_STAGE_3: 'reflection-stage-3',
  REFLECTION_SENT: 'reflection-sent',
  NGRN_THREAD: 'ngrn-thread',
  CNE_DASHBOARD: 'cne-dashboard',
  CNE_REVIEW: 'cne-review'
};

const reflectionRecap = [
  {
    heading: 'What?',
    body:
      'I was assigned to a patient whose condition deteriorated mid shift. His blood pressure dropped and he became less responsive. I called for help but felt frozen for a moment before I acted.'
  },
  {
    heading: 'So What?',
    body:
      'This matters because I realised my instinct was right but my confidence to act on it wasn’t there yet. I felt scared of making the wrong call in front of the team, which delayed me by a few seconds that felt much longer.'
  },
  {
    heading: 'Now What?',
    body:
      'I want to practise the escalation process until it feels automatic. I’ll ask my CNE if we can run through a deteriorating patient scenario together so next time my response comes from muscle memory, not panic.'
  }
];

const cneReflection = [
  {
    heading: 'What?',
    body:
      'I attempted my first unsupervised IV cannulation on a patient this morning. I prepared the equipment, explained the procedure, and felt confident going in. I missed the vein on the first attempt and had to withdraw. The patient was calm and reassured me, but I felt embarrassed in front of the senior nurse who was observing.'
  },
  {
    heading: 'So What?',
    body:
      'This matters because it showed me how much of my confidence in clinical skills is still tied to getting things right the first time. When I missed, my first instinct was to apologise excessively rather than stay composed and try again. I think I put pressure on myself to perform perfectly in front of others, which actually made me more tense during the procedure. It also made me reflect on how patients often handle these moments better than we do.'
  },
  {
    heading: 'Now What?',
    body:
      'I want to practise cannulation technique in the simulation lab before my next attempt so my hand confidence improves independent of the pressure of a real patient. I’ll also work on staying composed when something doesn’t go to plan — pausing, reassessing, and continuing rather than spiralling into self criticism. I’ll speak to Rebecca about strategies for managing performance anxiety in clinical skills.'
  }
];

const educators = [
  {
    group: 'Available now',
    tone: 'green',
    people: [
      { name: 'Jane Smith', initials: 'JS', hospital: 'John Hunter Hospital', status: 'Online Now' },
      { name: 'Rebecca Jones', initials: 'RJ', hospital: 'John Hunter Hospital', status: 'Online Now' },
      { name: 'Amelia Brown', initials: 'AB', hospital: 'Maitland Hospital', status: 'Online Now' }
    ]
  },
  {
    group: 'Away',
    tone: 'orange',
    people: [
      { name: 'Jane Smith', initials: 'JS', hospital: 'John Hunter Hospital', status: 'Away — back soon' }
    ]
  },
  {
    group: 'Offline',
    tone: 'grey',
    people: [
      { name: 'Jane Smith', initials: 'JS', hospital: 'John Hunter Hospital', status: 'Offline' },
      { name: 'Laura Green', initials: 'LG', hospital: 'Belmont Hospital', status: 'Offline' }
    ]
  }
];

function App() {
  const [screen, setScreen] = useState(SCREENS.LOGIN);
  const [voiceMode, setVoiceMode] = useState(false);
  const [toast, setToast] = useState('');

  function navigate(nextScreen) {
    setVoiceMode(false);
    setToast('');
    setScreen(nextScreen);
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  }

  return (
    <main className="site-shell" aria-label="Digital Reflective Practice Tool demo">
      <SiteHeader navigate={navigate} />

      <div className="site-content">
        {screen === SCREENS.LOGIN && <LoginScreen navigate={navigate} />}
        {screen === SCREENS.NGRN_DASHBOARD && <NgrnDashboard navigate={navigate} />}
        {screen === SCREENS.FIND_EDUCATOR && <FindEducatorScreen navigate={navigate} />}
        {screen === SCREENS.REFLECTION_STAGE_1 && (
          <ReflectionStageOne
            navigate={navigate}
            voiceMode={voiceMode}
            setVoiceMode={setVoiceMode}
          />
        )}
        {screen === SCREENS.REFLECTION_STAGE_2 && (
          <ReflectionStageTwo
            navigate={navigate}
            voiceMode={voiceMode}
            setVoiceMode={setVoiceMode}
          />
        )}
        {screen === SCREENS.REFLECTION_STAGE_3 && <ReflectionStageThree navigate={navigate} />}
        {screen === SCREENS.REFLECTION_SENT && <ReflectionSentScreen navigate={navigate} />}
        {screen === SCREENS.NGRN_THREAD && (
          <NgrnThreadScreen
            navigate={navigate}
            voiceMode={voiceMode}
            setVoiceMode={setVoiceMode}
            onSend={() => showToast('Demo reply sent.')}
          />
        )}
        {screen === SCREENS.CNE_DASHBOARD && <CneDashboard navigate={navigate} />}
        {screen === SCREENS.CNE_REVIEW && (
          <CneReviewScreen
            navigate={navigate}
            voiceMode={voiceMode}
            setVoiceMode={setVoiceMode}
            onSend={() => showToast('Demo response sent.')}
          />
        )}

        {toast && <div className="toast" role="status">{toast}</div>}
      </div>
    </main>
  );
}

function SiteHeader({ navigate }) {
  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={() => navigate(SCREENS.LOGIN)} aria-label="Back to login">
        <span className="brand-mark">DR</span>
        <span>
          <strong>Digital Reflective Practice Tool</strong>
          <small>Clickable university prototype</small>
        </span>
      </button>

      <nav className="demo-menu" aria-label="Demo navigation shortcuts">
        <button type="button" onClick={() => navigate(SCREENS.LOGIN)}>Login</button>
        <button type="button" onClick={() => navigate(SCREENS.NGRN_DASHBOARD)}>NGRN flow</button>
        <button type="button" onClick={() => navigate(SCREENS.CNE_DASHBOARD)}>CNE flow</button>
      </nav>
    </header>
  );
}

function Header({ compact = false }) {
  return (
    <header className={`top-header ${compact ? 'top-header--compact' : ''}`}>
      <div>
        <p className="eyebrow">Good morning, ABCD</p>
        <p className="subtle">Wednesday, 1 April 2026</p>
      </div>
      <Avatar initials="ABC" />
    </header>
  );
}

function Avatar({ initials, small = false }) {
  return <div className={`avatar ${small ? 'avatar--small' : ''}`}>{initials}</div>;
}

function LoginScreen({ navigate }) {
  return (
    <section className="screen login-screen">
      <div className="login-card">
        <div className="logo-mark">DR</div>
        <h1>Welcome Back</h1>
        <p className="lead">Please sign into your account</p>

        <label className="field-label" htmlFor="demo-email">Email Address</label>
        <input id="demo-email" className="input" value="demo@example.com" disabled />

        <label className="field-label" htmlFor="demo-password">Password</label>
        <input id="demo-password" className="input" type="password" value="password" disabled />

        <div className="button-stack">
          <button className="primary-button" type="button" onClick={() => navigate(SCREENS.NGRN_DASHBOARD)}>
            Continue as NGRN
          </button>
          <button className="secondary-button" type="button" onClick={() => navigate(SCREENS.CNE_DASHBOARD)}>
            Continue as Clinical Nurse Educator
          </button>
        </div>

        <p className="demo-note">Demo mode — no data is saved.</p>
      </div>
    </section>
  );
}

function NgrnDashboard({ navigate }) {
  return (
    <section className="screen with-floating-action">
      <Header />

      <div className="stats-grid" aria-label="NGRN statistics">
        <StatCard title="Reflections" number="9" label="Total reflections" />
        <StatCard title="Streak" number="5" label="Weeks active" />
        <StatCard title="Responses" number="3" label="From educator" />
      </div>

      <SectionTitle title="Recent Reflections" />

      <ReflectionListCard
        title="Managing a deteriorating patient for the first time"
        preview="I was assigned to a patient whose condition deteriorated mid shift. I called for help but felt frozen for a moment before I acted..."
        date="28 March"
        badge="Feedback Received"
        onClick={() => navigate(SCREENS.NGRN_THREAD)}
      />
      <ReflectionListCard
        title="First IV cannulation attempt"
        preview="Didn’t succeed on the first attempt. Patient was calm but I felt embarrassed in front of the team..."
        date="28 March"
      />
      <ReflectionListCard
        title="Medication round under pressure"
        preview="I noticed how easily interruptions affected my focus during the afternoon medication round..."
        date="24 March"
      />

      <button
        className="floating-button"
        type="button"
        aria-label="Start a new reflection"
        onClick={() => navigate(SCREENS.FIND_EDUCATOR)}
      >
        +
      </button>
    </section>
  );
}

function FindEducatorScreen({ navigate }) {
  return (
    <section className="screen">
      <Header compact />
      <div className="screen-title-row">
        <button className="back-chip" type="button" onClick={() => navigate(SCREENS.NGRN_DASHBOARD)}>
          ← Back
        </button>
        <h1>Find a Clinical Educator</h1>
      </div>

      <input className="search-input" type="search" placeholder="Search" aria-label="Search clinical educators" />

      {educators.map((group) => (
        <div className="educator-group" key={group.group}>
          <h2 className="group-heading">
            <span className={`status-dot status-dot--${group.tone}`} />
            {group.group}
          </h2>

          {group.people.map((person, index) => (
            <button
              type="button"
              className="educator-card"
              key={`${group.group}-${person.name}-${index}`}
              onClick={() => navigate(SCREENS.REFLECTION_STAGE_1)}
            >
              <Avatar initials={person.initials} small />
              <span>
                <strong>{person.name}</strong>
                <small>{person.hospital}</small>
                <small className="availability-text">{person.status}</small>
              </span>
            </button>
          ))}
        </div>
      ))}
    </section>
  );
}

function ReflectionStageOne({ navigate, voiceMode, setVoiceMode }) {
  return (
    <section className="screen reflection-screen">
      <ReflectionHeader stage={1} />
      <PromptCard
        title="What?"
        question="What happened?"
        body="Describe the situation as clearly as you can. What did you do, see, or experience? Stick to the facts of what occurred before exploring how you felt."
      />

      <label className="field-label" htmlFor="reflection-title">Reflection Title</label>
      <input
        id="reflection-title"
        className="input"
        defaultValue="Managing a deteriorating patient for the first time"
      />

      <label className="field-label" htmlFor="what-text">Your reflection</label>
      <textarea
        id="what-text"
        className="textarea textarea--large"
        placeholder="e.g. I was assigned to a patient whose condition deteriorated mid-shift..."
      />

      {voiceMode && <Waveform label="Voice reflection mode active" />}

      <BottomControls
        leftLabel="Go Back"
        rightLabel="Next Stage"
        onLeft={() => navigate(SCREENS.FIND_EDUCATOR)}
        onRight={() => navigate(SCREENS.REFLECTION_STAGE_2)}
        showMic
        micActive={voiceMode}
        onMic={() => setVoiceMode(!voiceMode)}
      />
    </section>
  );
}

function ReflectionStageTwo({ navigate, voiceMode, setVoiceMode }) {
  return (
    <section className="screen reflection-screen">
      <ReflectionHeader stage={2} helper="Stage 1 is complete. You’re now on stage 2 of 3." />
      <PromptCard
        title="So What?"
        question="Why does this experience matter?"
        body="Reflect on the significance of what happened. What did you feel? What does this reveal about your practice or values?"
      />

      <label className="field-label" htmlFor="so-what-text">Your reflection</label>
      <textarea
        id="so-what-text"
        className="textarea textarea--large"
        defaultValue={`This experience matters because it revealed how much my confidence in clinical decision making is still developing. When the patient’s observations started to change, I felt a wave of self doubt. I knew something wasn’t right, but I second guessed myself before acting. That hesitation bothered me afterward.

I think it connects to a deeper fear of being wrong in front of more experienced colleagues. I’ve noticed this pattern before, where my clinical instinct is sound but my confidence to act on it lags behind.`}
      />

      {voiceMode && <Waveform label="Voice mode active" />}

      <BottomControls
        leftLabel="Go Back"
        rightLabel="Next Stage"
        onLeft={() => navigate(SCREENS.REFLECTION_STAGE_1)}
        onRight={() => navigate(SCREENS.REFLECTION_STAGE_3)}
        showMic
        micActive={voiceMode}
        onMic={() => setVoiceMode(!voiceMode)}
      />
    </section>
  );
}

function ReflectionStageThree({ navigate }) {
  return (
    <section className="screen reflection-screen">
      <ReflectionHeader stage={3} helper="Stage 2 is complete. You’re now on stage 3 of 3." />
      <PromptCard
        title="Now What?"
        question="What will you do differently?"
        body="Think about what you’ll take forward from this experience. What actions, habits, or conversations might help you respond better next time?"
      />

      <label className="field-label" htmlFor="now-what-text">Your action plan</label>
      <textarea
        id="now-what-text"
        className="textarea textarea--large"
        defaultValue="I want to practise the escalation process until it feels automatic. I’ll ask my CNE if we can run through a deteriorating patient scenario together so next time my response comes from muscle memory, not panic."
      />

      <div className="button-row sticky-actions">
        <button className="ghost-button" type="button" onClick={() => navigate(SCREENS.REFLECTION_STAGE_2)}>
          Go Back
        </button>
        <button className="primary-button" type="button" onClick={() => navigate(SCREENS.REFLECTION_SENT)}>
          Submit Reflection
        </button>
      </div>
    </section>
  );
}

function ReflectionHeader({ stage, helper }) {
  return (
    <header className="reflection-header">
      <div>
        <p className="eyebrow">New Reflection</p>
        <h1>{stage === 1 ? 'What?' : stage === 2 ? 'So What?' : 'Now What?'}</h1>
      </div>
      <Avatar initials="ABC" />
      <div className="progress" aria-label={`Stage ${stage} of 3`}>
        {[1, 2, 3].map((step) => (
          <span key={step} className={`progress-step ${step <= stage ? 'progress-step--active' : ''}`}>
            {step}
          </span>
        ))}
      </div>
      <p className="subtle full-width">{helper || `You’re on stage ${stage} of 3.`}</p>
    </header>
  );
}

function PromptCard({ title, question, body }) {
  return (
    <article className="prompt-card">
      <h2>{title}</h2>
      <p className="prompt-question">“{question}”</p>
      <p>{body}</p>
    </article>
  );
}

function ReflectionSentScreen({ navigate }) {
  return (
    <section className="screen">
      <PageHeading title="Reflection: Managing a deteriorating patient for the first time" />
      <ReflectionRecap sections={reflectionRecap} />

      <div className="sent-status" aria-label="Reflection sent status">
        Reflection Sent
      </div>

      <div className="button-row">
        <button className="ghost-button" type="button" onClick={() => navigate(SCREENS.NGRN_DASHBOARD)}>
          Go Back
        </button>
        <button className="primary-button" type="button" onClick={() => navigate(SCREENS.NGRN_THREAD)}>
          Reply
        </button>
      </div>
    </section>
  );
}

function NgrnThreadScreen({ navigate, voiceMode, setVoiceMode, onSend }) {
  return (
    <section className="screen thread-screen">
      <PageHeading title="Reflection: Managing a deteriorating patient for the first time" />
      <ReflectionRecap sections={reflectionRecap} compact />

      <article className="message-card educator-message">
        <div className="message-header">
          <strong>Jane Doe</strong>
          <span>9:41 AM</span>
        </div>
        <p>
          Thanks for sharing this Jessica — it takes courage to reflect honestly on a moment that felt difficult in the moment.
        </p>
        <p>
          What stands out to me is that you did act, and you acted correctly. That freeze response is incredibly common in new graduates and doesn’t reflect a lack of competence — it reflects how seriously you take your patients.
        </p>
        <p>
          Your plan to practise escalation until it feels automatic is a great one. Let’s set aside some time this week to walk through a deteriorating patient scenario together.
        </p>
      </article>

      <ReplyComposer
        label="Replying to: Jane Doe"
        defaultValue={`Thank you Rebecca, that really helps to hear. I think I put a lot of pressure on myself to already know what to do, so it’s reassuring to know that reaction is normal.

I’d love to do that simulation — even just thinking about it makes me feel more prepared. Would Thursday after handover work for you? I’m off at 3:30.`}
        voiceMode={voiceMode}
        setVoiceMode={setVoiceMode}
        onSend={onSend}
      />

      <button className="ghost-button full-button" type="button" onClick={() => navigate(SCREENS.NGRN_DASHBOARD)}>
        Go Back
      </button>
    </section>
  );
}

function CneDashboard({ navigate }) {
  return (
    <section className="screen">
      <Header />

      <article className="alert-card">
        <div className="alert-number">9</div>
        <div>
          <strong>Awaiting Responses</strong>
          <p>Need responses</p>
        </div>
      </article>

      <SectionTitle title="Awaiting your response" />
      {[1, 2, 3, 4].map((item) => (
        <button
          key={item}
          className="response-card"
          type="button"
          onClick={() => navigate(SCREENS.CNE_REVIEW)}
        >
          <span>
            <strong>Jessica Smith</strong>
            <small>First IV cannulation attempt</small>
          </span>
          <span className="response-meta">
            <small>28 March</small>
            <span className="pill pill--new">New</span>
          </span>
        </button>
      ))}

      <SectionTitle title="My nurses" />
      <button className="nurse-card" type="button" onClick={() => navigate(SCREENS.CNE_REVIEW)}>
        <Avatar initials="JS" small />
        <span>
          <strong>Jessica Smith</strong>
          <small>Last Reflection 2hrs ago</small>
        </span>
        <span className="pill pill--warning">Needs Reply</span>
      </button>

      <button className="ghost-button full-button" type="button" onClick={() => navigate(SCREENS.LOGIN)}>
        Back to login
      </button>
    </section>
  );
}

function CneReviewScreen({ navigate, voiceMode, setVoiceMode, onSend }) {
  return (
    <section className="screen thread-screen">
      <Header compact />
      <div className="screen-title-row">
        <button className="back-chip" type="button" onClick={() => navigate(SCREENS.CNE_DASHBOARD)}>
          ← Back
        </button>
        <div>
          <h1>Reflection: First IV cannulation attempt</h1>
          <p className="subtle">Jessica Smith</p>
        </div>
      </div>

      <ReflectionRecap sections={cneReflection} />

      <ReplyComposer
        label="Replying to: Jessica Smith"
        defaultValue={`Jessica, thank you for sharing this and for being so honest about what you felt in that moment. That kind of self awareness is exactly what reflective practice is for.

Missing on a first attempt is genuinely normal, and the fact that your patient was calm is a good sign that your communication and manner were reassuring even when your technique didn’t go as planned.

I’d suggest booking some time in the sim lab this week. Let’s also set aside 20 minutes before your next shift to talk through what a composed recovery looks like when a procedure doesn’t go to plan the first time.`}
        voiceMode={voiceMode}
        setVoiceMode={setVoiceMode}
        onSend={onSend}
      />
    </section>
  );
}

function ReplyComposer({ label, defaultValue, voiceMode, setVoiceMode, onSend }) {
  return (
    <article className="composer-card">
      <label className="field-label" htmlFor={label.replaceAll(' ', '-')}>
        {label}
      </label>
      <textarea id={label.replaceAll(' ', '-')} className="textarea" defaultValue={defaultValue} />

      {voiceMode && <Waveform label="Voice reply mode active" />}

      <div className="composer-actions">
        <button
          className={`icon-button ${voiceMode ? 'icon-button--active' : ''}`}
          type="button"
          onClick={() => setVoiceMode(!voiceMode)}
          aria-label="Toggle fake voice mode"
        >
          🎙
        </button>
        <button className="primary-button send-button" type="button" onClick={onSend}>
          Send →
        </button>
      </div>
    </article>
  );
}

function ReflectionRecap({ sections, compact = false }) {
  return (
    <div className={`recap-stack ${compact ? 'recap-stack--compact' : ''}`}>
      {sections.map((section) => (
        <article className="recap-card" key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </article>
      ))}
    </div>
  );
}

function PageHeading({ title }) {
  return (
    <header className="page-heading">
      <h1>{title}</h1>
      <Avatar initials="ABC" />
    </header>
  );
}

function BottomControls({ leftLabel, rightLabel, onLeft, onRight, showMic, micActive, onMic }) {
  return (
    <div className="bottom-controls sticky-actions">
      {showMic && (
        <button
          className={`icon-button ${micActive ? 'icon-button--active' : ''}`}
          type="button"
          aria-label="Toggle fake voice mode"
          onClick={onMic || (() => {})}
        >
          🎙
        </button>
      )}
      <button className="ghost-button" type="button" onClick={onLeft}>{leftLabel}</button>
      <button className="primary-button" type="button" onClick={onRight}>{rightLabel}</button>
    </div>
  );
}

function Waveform({ label }) {
  return (
    <div className="waveform" aria-label={label}>
      <span className="recording-dot" />
      <div className="wave-bars" aria-hidden="true">
        {[16, 34, 22, 48, 30, 62, 38, 22, 54, 28, 44, 18].map((height, index) => (
          <i key={index} style={{ height: `${height}px` }} />
        ))}
      </div>
      <small>{label}</small>
    </div>
  );
}

function StatCard({ title, number, label }) {
  return (
    <article className="stat-card">
      <p>{title}</p>
      <strong>{number}</strong>
      <small>{label}</small>
    </article>
  );
}

function SectionTitle({ title }) {
  return <h2 className="section-title">{title}</h2>;
}

function ReflectionListCard({ title, preview, date, badge, onClick }) {
  const Component = onClick ? 'button' : 'article';

  return (
    <Component className="reflection-list-card" onClick={onClick} type={onClick ? 'button' : undefined}>
      <div>
        <h3>{title}</h3>
        <p>{preview}</p>
      </div>
      <footer>
        <span>{date}</span>
        {badge && <span className="pill pill--success">{badge}</span>}
      </footer>
    </Component>
  );
}

export default App;
