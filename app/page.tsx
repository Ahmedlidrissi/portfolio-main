import { TerminalHero } from '@/components/terminal-hero';
import { BentoGrid } from '@/components/bento-grid';
import { ProfileSkillsExperience } from '@/components/profile-skills-experience';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Terminal Hero Section */}
      <TerminalHero />

      {/* Profile, Skills & Experience Section */}
      <ProfileSkillsExperience />

      {/* Bento Grid Projects Section */}
      <BentoGrid />

      {/* Footer */}
      <footer className="border-t py-12 px-4" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--heading)' }}>About</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Passionate about building scalable systems and crafting elegant solutions to complex engineering challenges.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--heading)' }}>Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--heading)' }}>Get in Touch</h3>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                Open to interesting projects and collaborations.
              </p>
              <a
                href="mailto:hello@example.com"
                className="inline-block px-4 py-2 text-white text-sm rounded transition-colors"
                style={{ background: 'var(--primary)' }}
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t pt-8" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm text-center" style={{ color: 'var(--muted)' }}>
              Engineered with precision. Designed for impact.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
