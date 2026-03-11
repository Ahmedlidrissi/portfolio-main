import { TerminalHero } from '@/components/terminal-hero';
import { BentoGrid } from '@/components/bento-grid';
import { ProfileSkillsExperience } from '@/components/profile-skills-experience';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      {/* Terminal Hero Section */}
      <TerminalHero />

      {/* Profile, Skills & Experience Section */}
      <ProfileSkillsExperience />

      {/* Bento Grid Projects Section */}
      <BentoGrid />

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-slate-50 font-semibold mb-3">About</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Passionate about building scalable systems and crafting elegant solutions to complex engineering challenges.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-slate-50 font-semibold mb-3">Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-slate-50 font-semibold mb-3">Get in Touch</h3>
              <p className="text-slate-400 text-sm mb-2">
                Open to interesting projects and collaborations.
              </p>
              <a
                href="mailto:hello@example.com"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-sm text-center">
              Engineered with precision. Designed for impact.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
