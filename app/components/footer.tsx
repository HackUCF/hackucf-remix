import { Link } from '@remix-run/react';

export function Footer() {
  const SOCIAL_LINKS = [
    {
      id: 'instagram',
      icon: <img src="/instagram.svg" alt="Instagram" className="h-6 w-6" />,
      url: 'https://www.instagram.com/hack_ucf/',
      label: 'Instagram',
    },
    {
      id: 'x',
      icon: <img src="/x-social.svg" alt="X" className="h-6 w-6" />,
      url: 'https://x.com/HackUCF',
      label: 'Twitter',
    },
    {
      id: 'github',
      icon: <img src="/github.svg" alt="GitHub" className="h-6 w-6" />,
      url: 'https://github.com/HackUCF',
      label: 'GitHub',
    },
    {
      id: 'linkedin',
      icon: <img src="/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />,
      url: 'https://www.linkedin.com/company/collegiate-cyber-defense-club-at-ucf',
      label: 'LinkedIn',
    },
  ];

  const ACTION_LINKS = [
    {
      id: 'join-the-fun',
      text: 'Join the Fun',
      url: 'https://join.hackucf.org',
    },
    {
      id: 'hop-on-discord',
      text: 'Hop on Discord',
      url: 'https://discord.com/invite/VwkkDcJ',
    },
    { id: 'view-the-calendar', text: 'View the Calendar', url: '/calendar' },
    {
      id: 'present-at-meeting',
      text: 'Present at a Meeting',
      url: 'https://discord.com/invite/VwkkDcJ',
    },
    {
      id: 'donate',
      text: 'Donate',
      url: 'https://donate.stripe.com/7sI7un5vkfGV9xKaEE',
    },
  ];

  return (
    <footer
      className="bg-background text-white px-4 sm:px-6 lg:px-8 mb-16 pt-16"
      id="connect"
    >
      <div className="max-w-7xl mx-auto flex-col items-center justify-center h-full">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Stay Connected
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-8 text-white">
            You can follow us on social media to stay tuned for job and
            internship opportunities, or get updated when we hold a meeting.
            Don't forget to join our Discord!
          </p>
          <div className="flex justify-center space-x-6">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brandGold hover:bg-brandGoldHover text-background h-12 w-12 flex items-center justify-center rounded-md transition-colors duration-300"
                aria-label={`Follow us on ${social.label}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {ACTION_LINKS.map(action => (
            <Link
              key={action.id}
              to={action.url}
              className="bg-background hover:bg-brandGold hover:text-background border-brandGold text-brandGold border-2 py-2 px-4 rounded transition-colors duration-300"
            >
              {action.text}
            </Link>
          ))}
        </div>
        <div className="text-center">
          <p className="text-brandGold font-semibold mb-1">
            &copy;HackUCF {new Date().getFullYear()}
          </p>
          <p className="text-white text-sm">
            Made with ❤ by{' '}
            <a
              href="https://github.com/parchinski"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brandGold transition-colors duration-300"
            >
              bp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
