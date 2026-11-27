import {
  Brain, Code2, Cpu, Database, FlaskConical, Globe, Layers, Lightbulb, Monitor, PenTool,
  PlugZap, Puzzle, Server, Sparkles, Terminal, Workflow, Wrench,
} from 'lucide-react'

/** Content stores icon names as strings so the dashboard can choose them. */
export const ICONS = {
  brain: Brain, code: Code2, cpu: Cpu, database: Database, flask: FlaskConical, globe: Globe,
  layers: Layers, lightbulb: Lightbulb, monitor: Monitor, pen: PenTool, plug: PlugZap,
  puzzle: Puzzle, server: Server, sparkles: Sparkles, terminal: Terminal, workflow: Workflow, wrench: Wrench,
}

export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Sparkles
  return <Cmp aria-hidden="true" {...props} />
}
