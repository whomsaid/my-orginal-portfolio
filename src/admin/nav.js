import {
  BadgeCheck, BookOpen, Contact, FileUser, FlaskConical, FolderKanban, GraduationCap, Images, Inbox,
  Languages, LayoutDashboard, LogOut, Palette, Settings, Share2, User, Wrench,
} from 'lucide-react'

/** Dashboard sidebar, in the order from the brief. `ready` = interactive screen exists today. */
export const ADMIN_NAV = [
  { slug: 'overview', label: 'Overview', icon: LayoutDashboard, ready: true },
  { slug: 'profile', label: 'Profile Management', icon: User },
  { slug: 'about', label: 'About Me', icon: BookOpen },
  { slug: 'projects', label: 'Projects', icon: FolderKanban, ready: true },
  { slug: 'project-images', label: 'Project Images', icon: Images, ready: true },
  { slug: 'skills', label: 'Skills', icon: BadgeCheck },
  { slug: 'services', label: 'Services', icon: Wrench },
  { slug: 'research', label: 'Research and Articles', icon: FlaskConical },
  { slug: 'education', label: 'Education', icon: GraduationCap },
  { slug: 'contact-info', label: 'Contact Information', icon: Contact },
  { slug: 'messages', label: 'Contact Messages', icon: Inbox, ready: true },
  { slug: 'cv', label: 'CV Management', icon: FileUser },
  { slug: 'social', label: 'Social Media', icon: Share2 },
  { slug: 'appearance', label: 'Website Appearance', icon: Palette },
  { slug: 'languages', label: 'Language Management', icon: Languages },
  { slug: 'settings', label: 'Settings', icon: Settings },
  { slug: 'logout', label: 'Logout', icon: LogOut },
]
