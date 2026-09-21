import React from "react";
import "./Home.css";

function Home({ onLogin, onRegister }) {
  return (
    <div className="home-page">

      {/* Navbar */}
      <header className="home-navbar">
        <div className="home-brand">
          <div className="brand-symbol">〰</div>
          <div>
            <h2>SkillBridge</h2>
            <p>Freelance • Hire • Grow</p>
          </div>
        </div>

        <nav className="home-nav-links">
          <a className="active-nav" href="#home">⌂ Home</a>
          <a href="#projects">▦ Browse Projects</a>
          <a href="#talent">♟ Find Talent</a>
          <a href="#about">ⓘ About</a>
        </nav>

        <div className="home-auth-buttons">
          <button className="home-login-btn" onClick={onLogin}>
            Login
          </button>

          <button className="home-register-btn" onClick={onRegister}>
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="home-hero" id="home">

        <div className="hero-content">
          <p className="hero-label">FREELANCE • HIRE • GROW</p>

          <h1>
            Connect Skills with
            <span> Opportunities</span>
          </h1>

          <p className="hero-text">
            SkillBridge is a freelancing hiring platform that connects
            talented freelancers with clients looking for the right skills.
          </p>

          <div className="hero-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search for skills, projects or freelancers..."
            />
            <button onClick={onLogin}>Search</button>
          </div>

          <div className="hero-actions">
            <button onClick={onLogin} className="primary-action">
              Find Opportunities →
            </button>

            <button onClick={onRegister} className="secondary-action">
              Join SkillBridge
            </button>
          </div>
        </div>

        {/* Illustration Area */}
        <div className="hero-illustration">

          <div className="floating-info project-info">
            <div className="info-icon">💼</div>
            <div>
              <strong>Find Projects</strong>
              <small>Build your portfolio</small>
            </div>
          </div>

          <div className="floating-info talent-info">
            <div className="info-icon">👥</div>
            <div>
              <strong>Hire Talent</strong>
              <small>Get the right skills</small>
            </div>
          </div>

          <div className="character-area">
            <div className="character-head">👨🏻‍💻</div>
            <div className="character-body">🔵</div>
            <div className="character-laptop">💻</div>
          </div>

          <div className="floating-info growth-info">
            <div className="info-icon">📈</div>
            <div>
              <strong>Grow Together</strong>
              <small>Achieve more</small>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="benefit-item">
          <div className="benefit-icon">👥</div>
          <div>
            <h3>Top Talent</h3>
            <p>Verified professionals</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">🔒</div>
          <div>
            <h3>Secure Payments</h3>
            <p>Safe and transparent</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">💬</div>
          <div>
            <h3>Easy Communication</h3>
            <p>Work together seamlessly</p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section" id="about">
        <p className="section-label">WHY CHOOSE SKILLBRIDGE?</p>

        <h2>Everything You Need to Succeed</h2>

        <p className="section-description">
          Whether you’re looking for a project or a skilled freelancer,
          SkillBridge makes it simple, secure and efficient.
        </p>

        <div className="why-cards">

          <div className="why-card" id="projects">
            <div className="why-icon">⌕</div>
            <div>
              <h3>Find Projects</h3>
              <p>Discover projects that match your skills and interests.</p>
            </div>
            <span className="arrow-icon">→</span>
          </div>

          <div className="why-card" id="talent">
            <div className="why-icon">👥</div>
            <div>
              <h3>Hire Freelancers</h3>
              <p>Connect with talented professionals.</p>
            </div>
            <span className="arrow-icon">→</span>
          </div>

          <div className="why-card">
            <div className="why-icon">🚀</div>
            <div>
              <h3>Grow Together</h3>
              <p>Build your career and business.</p>
            </div>
            <span className="arrow-icon">→</span>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div>
          <p>READY TO GET STARTED?</p>
          <h2>Join SkillBridge Today</h2>
          <span>Find opportunities, hire talent and grow together.</span>
        </div>

        <button onClick={onRegister}>
          👥 Get Started →
        </button>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        SkillBridge <span>|</span> Freelance • Hire • Grow
      </footer>

    </div>
  );
}

export default Home;