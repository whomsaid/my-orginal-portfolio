import { Inbox, Mail, MailOpen, Search } from 'lucide-react'
import { Card, inputCls, PageHeader } from '../ui.jsx'

export default function Messages() {
  const messages = [] // populated from the contact_messages table once the API is connected

  return (
    <>
      <PageHeader title="Contact Messages" description="Messages sent through the contact form on your portfolio." />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex gap-1 rounded-xl border border-line p-1" role="tablist" aria-label="Filter messages">
          {[
            { k: 'all', l: 'All', i: Inbox },
            { k: 'unread', l: 'Unread', i: Mail },
            { k: 'read', l: 'Read', i: MailOpen },
          ].map(({ k, l, i: I }, idx) => (
            <button key={k} type="button" role="tab" aria-selected={idx === 0} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${idx === 0 ? 'bg-blue/15 text-ink' : 'text-muted'}`}>
              <I size={13} aria-hidden="true" /> {l}
              <span className="font-mono text-[0.65rem] text-muted">0</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input className={`${inputCls} pl-9`} placeholder="Search name, email or subject" aria-label="Search messages" disabled={!messages.length} />
        </div>
      </div>
      <Card className="flex flex-col items-center px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue/20 to-violet/20 text-blue">
          <Inbox size={24} aria-hidden="true" />
        </span>
        <p className="mt-4 font-display font-semibold">Inbox is empty</p>
        <p className="mt-1 max-w-md text-sm text-muted">
          Messages will appear here with name, email, subject and the time they arrived, so you can mark them read, reply by email or delete them. Visitors can already reach you on WhatsApp from the contact section.
        </p>
      </Card>
    </>
  )
}
