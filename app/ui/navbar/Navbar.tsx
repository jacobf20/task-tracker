import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
    IconNotebook,
  IconSchool,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './Navbar.module.css';

const navbarLinks = [
  { label: 'Dashboard', icon: IconGauge, link: '/ui/dashboard' },
  {
    label: 'Classes',
    icon: IconSchool,
    initiallyOpened: true,
    links: [
      { label: 'Side Channel Analysis', link: '/ui/classes/' },
      { label: 'Cyber Analytics & ML', link: '/ui/classes/' },
      { label: 'Covert Communications', link: '/ui/classes/' },
      { label: 'Found. of Intelligent Security Systems', link: '/ui/classes/' },
    ],
  },
];

export function Navbar() {
  const links = navbarLinks.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
      <nav className={classes.navbar}>
          <ScrollArea className={classes.links}>
              <div className={classes.linksInner}>{links}</div>
          </ScrollArea>
      </nav>
  );
}