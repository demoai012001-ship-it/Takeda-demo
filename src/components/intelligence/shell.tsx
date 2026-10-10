import { useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Activity,
  BrainCircuit,
  Sparkles,
  Trophy,
  TrendingUp,
  PanelsTopLeft,
  ChevronRight,
  Search,
  Bell,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/demo-data";
const icons = {
  dashboard: LayoutDashboard,
  users: Users,
  activity: Activity,
  brain: BrainCircuit,
  sparkles: Sparkles,
  trophy: Trophy,
  trending: TrendingUp,
  command: PanelsTopLeft,
};
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [query, setQuery] = useState("");
  const title = path.startsWith("/hcp")
    ? "HCP profile"
    : (navigation.find((n) => n.path === path)?.label ?? "Intelligence");
  return (
    <div className="app-shell">
      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <div className="brand">
          <Link to="/" className="takeda">
            takeda
          </Link>
          <div className="brand-side">
            Medical
            <br />
            Affairs
          </div>
          {menu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenu(false)}
              aria-label="Close navigation"
            >
              <X />
            </Button>
          )}
        </div>
        <div className="workspace">
          <strong>IBD Scientific Engagement</strong>
          <span>Intelligence Platform</span>
        </div>
        <div className="nav-label">INTELLIGENCE WORKSPACE</div>
        <nav>
          {navigation.map((n) => {
            const Icon = icons[n.icon];
            return (
              <Link
                key={n.path}
                to={n.path}
                onClick={() => setMenu(false)}
                className={`nav-link ${path === n.path ? "active" : ""}`}
              >
                <Icon />
                {n.label}
                {n.path === "/signals" && <span className="nav-count">12</span>}
                {n.path === "/engine" && <span className="nav-count">AI</span>}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-status">
            <span className="status-dot" /> Scientific intelligence connected
          </div>
          <div className="sidebar-user">
            <div className="user-avatar">AK</div>
            <div>
              <strong>Alex Kim</strong>
              <small>Medical Affairs Director</small>
            </div>
            <ChevronDown size={13} />
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              onClick={() => setMenu(!menu)}
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
            <span>Medical Affairs</span>
            <ChevronRight size={12} />
            <strong>{title}</strong>
          </div>
          <div className="topbar-right">
            <form
              className="searchbox"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/explorer", search: { q: query } });
              }}
            >
              <Search />
              <input
                aria-label="Search physicians"
                placeholder="Search physicians, institutions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="keycap">↵</span>
            </form>
            <div className="notification-wrap">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                title="Notifications"
                onClick={() => setNotifications(!notifications)}
              >
                <Bell />
              </Button>
              <span className="notification-dot" />
              {notifications && (
                <div className="notification-popover">
                  <strong>Scientific intelligence updates</strong>
                  <p>
                    <span className="badge green">New</span> 5 physicians have rapidly increasing
                    engagement.
                  </p>
                  <p>3 KOLs published new research this month.</p>
                  <Link
                    to="/signals"
                    className="link-action"
                    onClick={() => setNotifications(false)}
                  >
                    View engagement signals <ChevronRight size={12} />
                  </Link>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Demo information"
              title="Synthetic executive demo"
              onClick={() =>
                alert(
                  "Executive demo · All physician records and scientific signals are synthetic. AI analysis is simulated; no live clinical or patient data is used.",
                )
              }
            >
              <HelpCircle />
            </Button>
            <div className="user-avatar">AK</div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
