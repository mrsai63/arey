import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCMS, CMSHero, CMSService, CMSProject, CMSTestimonial, CMSFaq, CMSStep, CMSIndustry, CMSPageHero, CMSWhyUs, CMSContact } from "@/hooks/useCMS";
import { AVAILABLE_ICONS, IconRenderer } from "@/components/ui/IconRenderer";
import {
  Lock, LogOut, Save, Plus, Trash2, CheckCircle, Database, Settings,
  Home, RefreshCw, Layers, Phone, HelpCircle, Star, Sparkles, Image, Shield, AlertTriangle, Compass
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type TabType =
  | "overview"
  | "hero"
  | "logos"
  | "services"
  | "industries"
  | "whyUs"
  | "portfolio"
  | "process"
  | "testimonials"
  | "faq"
  | "pageHeroes"
  | "global";

function AdminPage() {
  const {
    data,
    loading,
    isFirebaseConnected,
    saveSection,
    isAuthenticated,
    login,
    logout,
    updatePasscode,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Authentication submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    setIsLoggingIn(true);
    const success = await login(passcode);
    setIsLoggingIn(false);
    if (!success) {
      setLoginError(true);
      toast.error("Incorrect passcode. Please try again.");
    } else {
      toast.success("Successfully logged into CMS!");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <RefreshCw className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground font-display tracking-widest">LOADING SITE DATA...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        
        <form
          onSubmit={handleLogin}
          className="glass relative w-full max-w-md rounded-3xl p-8 border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Lock className="h-6 w-6 animate-pulse" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Brand Shoots CMS</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter passcode to access site dashboard.</p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label htmlFor="passcode" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin Passcode</label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-full border border-border bg-background/60 px-5 py-3.5 text-center text-sm outline-none transition-colors focus:border-primary font-mono tracking-[0.5em] text-lg"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Invalid passcode. Default passcode is <code className="font-mono bg-destructive/20 px-1 py-0.5 rounded">admin123</code>.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-button font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 glow-blue cursor-pointer"
            >
              {isLoggingIn ? "Verifying..." : "Access Dashboard"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 text-foreground pb-20">
      <div className="container-bs max-w-7xl">
        {/* Admin Header */}
        <header className="flex flex-col gap-4 border-b border-border/60 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">CMS Console</span>
              <span className={`inline-flex items-center gap-1 text-xs ${isFirebaseConnected ? "text-emerald-400" : "text-amber-400"}`}>
                <Database className="h-3 w-3" />
                {isFirebaseConnected ? "Database Synced" : "Database Offline / Local Mode"}
              </span>
            </div>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Website Manager</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logout();
                toast.info("Logged out from CMS.");
              }}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground/80 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <nav className="flex flex-row overflow-x-auto gap-2 lg:col-span-3 lg:flex-col lg:overflow-x-visible">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "pageHeroes", label: "Page Headers", icon: Layers },
              { id: "hero", label: "Homepage Hero", icon: Sparkles },
              { id: "logos", label: "Client Logos", icon: Image },
              { id: "services", label: "Services (16)", icon: Layers },
              { id: "industries", label: "Industries Served", icon: Compass },
              { id: "whyUs", label: "Why Us & Stats", icon: CheckCircle },
              { id: "portfolio", label: "Portfolio Work", icon: Image },
              { id: "process", label: "Process (01-06)", icon: RefreshCw },
              { id: "testimonials", label: "Testimonials", icon: Star },
              { id: "faq", label: "FAQs", icon: HelpCircle },
              { id: "global", label: "Settings & Footer", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Main Workspace Forms */}
          <main className="lg:col-span-9">
            <div className="glass rounded-3xl p-6 border border-border/80 min-h-[500px]">
              {activeTab === "overview" && <OverviewTab data={data} isFirebaseConnected={isFirebaseConnected} />}
              {activeTab === "pageHeroes" && <PageHeroesTab pageHeroes={data.pageHeroes} onSave={(val) => saveSection("pageHeroes", val)} />}
              {activeTab === "hero" && <HeroTab hero={data.hero} onSave={(val) => saveSection("hero", val)} />}
              {activeTab === "logos" && <LogosTab logos={data.clientLogos} onSave={(val) => saveSection("clientLogos", val)} />}
              {activeTab === "services" && <ServicesTab services={data.services} onSave={(val) => saveSection("services", val)} />}
              {activeTab === "industries" && <IndustriesTab industries={data.industries} onSave={(val) => saveSection("industries", val)} />}
              {activeTab === "whyUs" && <WhyUsTab whyUs={data.whyUs} onSave={(val) => saveSection("whyUs", val)} />}
              {activeTab === "portfolio" && <PortfolioTab portfolio={data.portfolio} onSave={(val) => saveSection("portfolio", val)} />}
              {activeTab === "process" && <ProcessTab process={data.process} onSave={(val) => saveSection("process", val)} />}
              {activeTab === "testimonials" && <TestimonialsTab testimonials={data.testimonials} onSave={(val) => saveSection("testimonials", val)} />}
              {activeTab === "faq" && <FaqTab faq={data.faq} onSave={(val) => saveSection("faq", val)} />}
              {activeTab === "global" && (
                <GlobalTab
                  contact={data.contact}
                  onSaveContact={(val) => saveSection("contact", val)}
                  onUpdatePasscode={updatePasscode}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB COMPONENTS
// -------------------------------------------------------------

function OverviewTab({ data, isFirebaseConnected }: { data: any; isFirebaseConnected: boolean }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display">System Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Review the live CMS connection and stats.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background/50 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Database Sync</div>
          <div className={`mt-2 font-display text-xl font-bold flex items-center gap-2 ${isFirebaseConnected ? "text-emerald-400" : "text-amber-400"}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${isFirebaseConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            {isFirebaseConnected ? "Connected (RTDB)" : "Local Simulation"}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background/50 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Portfolio Projects</div>
          <div className="mt-2 font-display text-3xl font-bold">{data.portfolio?.projects?.length ?? 0}</div>
        </div>

        <div className="rounded-2xl border border-border bg-background/50 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Services Offered</div>
          <div className="mt-2 font-display text-3xl font-bold">{data.services?.items?.length ?? 0}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-surface/30 p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" /> Quick Tips for the Admin
        </h3>
        <ul className="text-sm space-y-3 text-muted-foreground list-disc list-inside">
          <li>Changes made in this console update the live website **instantly** without redeployment.</li>
          <li>For images and logo files, upload your asset to **Cloudinary** and paste the returned image URL.</li>
          <li>Use standard class names like <code className="font-mono bg-white/5 px-1 py-0.5 rounded text-primary">from-orange-500/30 to-red-700/20</code> for portfolio background gradients.</li>
          <li>Make sure to back up changes by review before saving, as DB rewrites are permanent.</li>
        </ul>
      </div>
    </div>
  );
}

function PageHeroesTab({ pageHeroes, onSave }: { pageHeroes: any; onSave: (val: any) => Promise<boolean> }) {
  const [state, setState] = useState(pageHeroes);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(pageHeroes), [pageHeroes]);

  const handleChange = (page: string, field: string, val: string) => {
    setState((prev: any) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: val,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Page Headers saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Page Headers / Heroes</h2>
          <p className="text-sm text-muted-foreground mt-1">Edit the main headings, sub-text, and tags for inner pages.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Headers"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {Object.entries(state).map(([pageKey, pageData]: [string, any]) => (
          <div key={pageKey} className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">{pageKey} PAGE HEADER</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow (Tag)</label>
                <input
                  type="text"
                  value={pageData.eyebrow}
                  onChange={(e) => handleChange(pageKey, "eyebrow", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => handleChange(pageKey, "title", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Subtitle Description</label>
                <textarea
                  rows={2}
                  value={pageData.sub}
                  onChange={(e) => handleChange(pageKey, "sub", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroTab({ hero, onSave }: { hero: CMSHero; onSave: (val: CMSHero) => Promise<boolean> }) {
  const [state, setState] = useState<CMSHero>(hero);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(hero), [hero]);

  const handleChange = (field: keyof CMSHero, val: any) => {
    setState((prev) => ({ ...prev, [field]: val }));
  };

  const handleFloatingCardChange = (index: number, field: string, val: string) => {
    const cards = [...state.floatingCards];
    cards[index] = { ...cards[index], [field]: val };
    handleChange("floatingCards", cards);
  };

  const handleStatChange = (index: number, field: string, val: string) => {
    const stats = [...state.stats];
    stats[index] = { ...stats[index], [field]: val };
    handleChange("stats", stats);
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Homepage Hero saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Homepage Hero Section</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage the core hero titles, animations, floating KPI cards, and stats.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Hero"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Badge Text</label>
            <input
              type="text"
              value={state.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Since Badge Year</label>
            <input
              type="text"
              value={state.sinceYear}
              onChange={(e) => handleChange("sinceYear", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title Line 1</label>
            <input
              type="text"
              value={state.title1}
              onChange={(e) => handleChange("title1", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title Line 2</label>
            <input
              type="text"
              value={state.title2}
              onChange={(e) => handleChange("title2", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Gradient Title Line (We Build Them.)</label>
            <input
              type="text"
              value={state.titleGradient}
              onChange={(e) => handleChange("titleGradient", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Hero Description Text</label>
            <textarea
              rows={3}
              value={state.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
            />
          </div>
        </div>

        {/* Stats counters */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider">Footer Counters (Left Side)</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {state.stats?.map((stat, i) => (
              <div key={i} className="rounded-xl border border-border bg-background/30 p-4 space-y-2">
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Stat Value</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(i, "value", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(i, "label", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider">Floating Metric Cards (Right Side Animation)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {state.floatingCards?.map((card, i) => (
              <div key={i} className="rounded-xl border border-border bg-background/30 p-4 grid gap-3 grid-cols-2">
                <div className="col-span-2 flex items-center gap-2 border-b border-border/40 pb-2">
                  <span className="text-xs font-semibold uppercase text-primary">CARD {i + 1}</span>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Label</label>
                  <input
                    type="text"
                    value={card.label}
                    onChange={(e) => handleFloatingCardChange(i, "label", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Value</label>
                  <input
                    type="text"
                    value={card.value}
                    onChange={(e) => handleFloatingCardChange(i, "value", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Icon</label>
                  <select
                    value={card.icon}
                    onChange={(e) => handleFloatingCardChange(i, "icon", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  >
                    {AVAILABLE_ICONS.map((ico) => (
                      <option key={ico} value={ico}>{ico}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Placement (x%, y%)</label>
                  <div className="flex gap-1 mt-1">
                    <input
                      type="text"
                      placeholder="X%"
                      value={card.x}
                      onChange={(e) => handleFloatingCardChange(i, "x", e.target.value)}
                      className="w-1/2 rounded-lg border border-border bg-background px-2 py-2 text-xs outline-none focus:border-primary text-center"
                    />
                    <input
                      type="text"
                      placeholder="Y%"
                      value={card.y}
                      onChange={(e) => handleFloatingCardChange(i, "y", e.target.value)}
                      className="w-1/2 rounded-lg border border-border bg-background px-2 py-2 text-xs outline-none focus:border-primary text-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogosTab({ logos, onSave }: { logos: string[]; onSave: (val: string[]) => Promise<boolean> }) {
  const [state, setState] = useState<string[]>(logos);
  const [newItem, setNewItem] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(logos), [logos]);

  const handleAdd = () => {
    if (!newItem.trim()) return;
    setState((prev) => [...prev, newItem.trim()]);
    setNewItem("");
  };

  const handleRemove = (index: number) => {
    setState((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Client list saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Trusted Client Logos</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage the clients displayed in the horizontal infinite marquee.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Logos"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new client name (e.g. Aurelia, Nike)"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-5 py-2.5 text-xs font-semibold text-primary hover:bg-primary/25 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-h-[400px] overflow-y-auto pr-2">
          {state.map((logo, index) => (
            <div key={index} className="flex items-center justify-between rounded-xl border border-border bg-background/30 px-4 py-3 text-sm">
              <span className="font-semibold text-foreground/80">{logo}</span>
              <button
                onClick={() => handleRemove(index)}
                className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesTab({ services, onSave }: { services: any; onSave: (val: any) => Promise<boolean> }) {
  const [state, setState] = useState(services);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(services), [services]);

  const handleHeaderChange = (field: string, val: string) => {
    setState((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof CMSService, val: string) => {
    const items = [...state.items];
    items[index] = { ...items[index], [field]: val };
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleRemove = (index: number) => {
    const items = state.items.filter((_: any, i: number) => i !== index);
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleAdd = () => {
    const newItem: CMSService = { icon: "TrendingUp", title: "New Service", desc: "Service description here." };
    setState((prev: any) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Services section saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Services Section ({state.items?.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">Edit title, subheading, and CRUD capabilities for services grid.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Services"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {/* Header edit */}
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Section Header</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow</label>
              <input
                type="text"
                value={state.eyebrow}
                onChange={(e) => handleHeaderChange("eyebrow", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
              <input
                type="text"
                value={state.title}
                onChange={(e) => handleHeaderChange("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Subtitle description</label>
              <textarea
                rows={2}
                value={state.sub}
                onChange={(e) => handleHeaderChange("sub", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Services items list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Services Items</h3>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 text-[11px] uppercase tracking-wider rounded-lg bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 hover:bg-primary/25 transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {state.items?.map((item: any, i: number) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border bg-background/20 p-4 items-start">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <IconRenderer name={item.icon} className="h-5 w-5" />
                </div>
                <div className="flex-1 grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Service Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(i, "title", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Icon</label>
                    <select
                      value={item.icon}
                      onChange={(e) => handleItemChange(i, "icon", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    >
                      {AVAILABLE_ICONS.map((ico) => (
                        <option key={ico} value={ico}>{ico}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end gap-2 sm:col-span-1">
                    <div className="flex-1">
                      <label className="text-[10px] uppercase text-muted-foreground">Description</label>
                      <input
                        type="text"
                        value={item.desc}
                        onChange={(e) => handleItemChange(i, "desc", e.target.value)}
                        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <button
                      onClick={() => handleRemove(i)}
                      className="rounded-lg border border-destructive/20 text-destructive/80 p-2.5 hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustriesTab({ industries, onSave }: { industries: any; onSave: (val: any) => Promise<boolean> }) {
  const [state, setState] = useState(industries);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(industries), [industries]);

  const handleHeaderChange = (field: string, val: string) => {
    setState((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof CMSIndustry, val: string) => {
    const items = [...state.items];
    items[index] = { ...items[index], [field]: val };
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleRemove = (index: number) => {
    const items = state.items.filter((_: any, i: number) => i !== index);
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleAdd = () => {
    const newItem: CMSIndustry = { icon: "Compass", label: "New Industry" };
    setState((prev: any) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Industries section saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Industries Served Section ({state.items?.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage grid of sectors served with label and icons.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Industries"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Section Header</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow</label>
              <input
                type="text"
                value={state.eyebrow}
                onChange={(e) => handleHeaderChange("eyebrow", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
              <input
                type="text"
                value={state.title}
                onChange={(e) => handleHeaderChange("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Subtitle description</label>
              <textarea
                rows={2}
                value={state.sub}
                onChange={(e) => handleHeaderChange("sub", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Industries Items</h3>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 text-[11px] uppercase tracking-wider rounded-lg bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 hover:bg-primary/25 transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              Add Industry
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {state.items?.map((item: any, i: number) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border bg-background/20 p-4 items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <IconRenderer name={item.icon} className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 grid gap-2 grid-cols-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleItemChange(i, "label", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-primary"
                      placeholder="Label"
                    />
                    <select
                      value={item.icon}
                      onChange={(e) => handleItemChange(i, "icon", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-primary"
                    >
                      {AVAILABLE_ICONS.map((ico) => (
                        <option key={ico} value={ico}>{ico}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(i)}
                  className="rounded-lg border border-destructive/20 text-destructive/80 p-2 ml-2 hover:bg-destructive/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyUsTab({ whyUs, onSave }: { whyUs: CMSWhyUs; onSave: (val: CMSWhyUs) => Promise<boolean> }) {
  const [state, setState] = useState<CMSWhyUs>(whyUs);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(whyUs), [whyUs]);

  const handleChange = (field: keyof CMSWhyUs, val: any) => {
    setState((prev: CMSWhyUs) => ({ ...prev, [field]: val }));
  };

  const handleBulletChange = (index: number, val: string) => {
    const bullets = [...state.bullets];
    bullets[index] = val;
    handleChange("bullets", bullets);
  };

  const handleCounterChange = (index: number, field: string, val: string | number) => {
    const counters = [...state.counters];
    counters[index] = { ...counters[index], [field]: val };
    handleChange("counters", counters);
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Why Us metrics and stats saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Why Us & Counters Section</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage the title, checklist features, and statistics counters.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Content"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow</label>
            <input
              type="text"
              value={state.eyebrow}
              onChange={(e) => handleChange("eyebrow", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
            <input
              type="text"
              value={state.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Sub Description</label>
            <textarea
              rows={2}
              value={state.sub}
              onChange={(e) => handleChange("sub", e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
            />
          </div>
        </div>

        {/* Bullet points checklist */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider">Features Checklist Bullets</h3>
          <div className="space-y-3">
            {state.bullets?.map((bullet: string, i: number) => (
              <div key={i}>
                <label className="text-[10px] uppercase text-muted-foreground">Bullet {i + 1}</label>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleBulletChange(i, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Counters grid */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider">Statistics Counters</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {state.counters?.map((count: { v: number; s: string; l: string }, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-background/30 p-4 grid gap-3 grid-cols-3">
                <div className="col-span-3 text-xs font-semibold uppercase text-primary border-b border-border/40 pb-1">COUNTER {i + 1}</div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Value</label>
                  <input
                    type="number"
                    value={count.v}
                    onChange={(e) => handleCounterChange(i, "v", parseInt(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Suffix</label>
                  <input
                    type="text"
                    value={count.s}
                    onChange={(e) => handleCounterChange(i, "s", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Label</label>
                  <input
                    type="text"
                    value={count.l}
                    onChange={(e) => handleCounterChange(i, "l", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioTab({ portfolio, onSave }: { portfolio: any; onSave: (val: any) => Promise<boolean> }) {
  const [state, setState] = useState(portfolio);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(portfolio), [portfolio]);

  const handleHeaderChange = (field: string, val: string) => {
    setState((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleProjectChange = (index: number, field: keyof CMSProject, val: string) => {
    const projects = [...state.projects];
    projects[index] = { ...projects[index], [field]: val };
    setState((prev: any) => ({ ...prev, projects }));
  };

  const handleRemove = (index: number) => {
    const projects = state.projects.filter((_: any, i: number) => i !== index);
    setState((prev: any) => ({ ...prev, projects }));
  };

  const handleAdd = () => {
    const newProj: CMSProject = {
      title: "New Project",
      tag: "Branding · Photo",
      grad: "from-blue-400/30 to-purple-700/20",
      span: "",
    };
    setState((prev: any) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Portfolio projects updated!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Portfolio Projects ({state.projects?.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage client campaigns, tag cards, and visual color styles.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Portfolio"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Section Header</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow</label>
              <input
                type="text"
                value={state.eyebrow}
                onChange={(e) => handleHeaderChange("eyebrow", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
              <input
                type="text"
                value={state.title}
                onChange={(e) => handleHeaderChange("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Projects List</h3>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 text-[11px] uppercase tracking-wider rounded-lg bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 hover:bg-primary/25 transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              Add Project
            </button>
          </div>

          <div className="space-y-4">
            {state.projects?.map((item: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-background/20 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs font-semibold text-primary uppercase">PROJECT {i + 1}: {item.title}</span>
                  <button
                    onClick={() => handleRemove(i)}
                    className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Client/Campaign Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleProjectChange(i, "title", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Tags (e.g. Photo · Brand)</label>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => handleProjectChange(i, "tag", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Gradient Classes (Tailwind syntax)</label>
                    <input
                      type="text"
                      value={item.grad}
                      onChange={(e) => handleProjectChange(i, "grad", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                      placeholder="from-amber-300/30 to-rose-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Grid layout span (desktop layout size)</label>
                    <select
                      value={item.span}
                      onChange={(e) => handleProjectChange(i, "span", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    >
                      <option value="">Normal (1 Column block)</option>
                      <option value="md:col-span-2">Double Width (2 columns)</option>
                      <option value="md:col-span-2 md:row-span-2">Feature Block (Double width & height)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase text-muted-foreground">External URL / Image Link (Optional)</label>
                    <input
                      type="text"
                      value={item.link || ""}
                      onChange={(e) => handleProjectChange(i, "link", e.target.value)}
                      placeholder="https://..."
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessTab({ process, onSave }: { process: any; onSave: (val: any) => Promise<boolean> }) {
  const [state, setState] = useState(process);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(process), [process]);

  const handleHeaderChange = (field: string, val: string) => {
    setState((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleStepChange = (index: number, field: keyof CMSStep, val: string) => {
    const steps = [...state.steps];
    steps[index] = { ...steps[index], [field]: val };
    setState((prev: any) => ({ ...prev, steps }));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Process steps saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Our Process (6-Step System)</h2>
          <p className="text-sm text-muted-foreground mt-1">Edit title, description, and the timeline steps sequence.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Steps"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Section Header</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow</label>
              <input
                type="text"
                value={state.eyebrow}
                onChange={(e) => handleHeaderChange("eyebrow", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
              <input
                type="text"
                value={state.title}
                onChange={(e) => handleHeaderChange("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Sub Description</label>
              <textarea
                rows={2}
                value={state.sub}
                onChange={(e) => handleHeaderChange("sub", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-border/60 pt-6">
          <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary mb-4">Steps (01 - 06)</h3>
          {state.steps?.map((step: any, i: number) => (
            <div key={i} className="flex gap-4 rounded-xl border border-border bg-background/20 p-4 items-start">
              <div className="font-display text-3xl font-bold text-primary/30 py-1">{step.n}</div>
              <div className="flex-1 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Step Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleStepChange(i, "title", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">Description</label>
                  <input
                    type="text"
                    value={step.desc}
                    onChange={(e) => handleStepChange(i, "desc", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsTab({ testimonials, onSave }: { testimonials: any; onSave: (val: any) => Promise<boolean> }) {
  const [state, setState] = useState(testimonials);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(testimonials), [testimonials]);

  const handleHeaderChange = (field: string, val: string) => {
    setState((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof CMSTestimonial, val: string) => {
    const items = [...state.items];
    items[index] = { ...items[index], [field]: val };
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleRemove = (index: number) => {
    const items = state.items.filter((_: any, i: number) => i !== index);
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleAdd = () => {
    const newItem: CMSTestimonial = { name: "Client Name", role: "Co-Founder, Company", text: "Brilliant work, highly recommend!" };
    setState((prev: any) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("Testimonials saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">Testimonials Reviews ({state.items?.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage comments and client reviews in the infinite horizontal slider.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save Testimonials"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Section Header</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow</label>
              <input
                type="text"
                value={state.eyebrow}
                onChange={(e) => handleHeaderChange("eyebrow", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
              <input
                type="text"
                value={state.title}
                onChange={(e) => handleHeaderChange("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Sub Description</label>
              <textarea
                rows={2}
                value={state.sub}
                onChange={(e) => handleHeaderChange("sub", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Client Quotes</h3>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 text-[11px] uppercase tracking-wider rounded-lg bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 hover:bg-primary/25 transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              Add Review
            </button>
          </div>

          <div className="space-y-4">
            {state.items?.map((item: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-background/20 p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Client Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(i, "name", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Company Role</label>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleItemChange(i, "role", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <button
                      onClick={() => handleRemove(i)}
                      className="flex-1 rounded-lg border border-destructive/20 text-destructive/80 py-2 hover:bg-destructive/10 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete Review
                    </button>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-[10px] uppercase text-muted-foreground">Review Quote Content</label>
                    <textarea
                      rows={2}
                      value={item.text}
                      onChange={(e) => handleItemChange(i, "text", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqTab({ faq, onSave }: { faq: any; onSave: (val: any) => Promise<boolean> }) {
  const [state, setState] = useState(faq);
  const [saving, setSaving] = useState(false);

  useEffect(() => setState(faq), [faq]);

  const handleHeaderChange = (field: string, val: string) => {
    setState((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof CMSFaq, val: string) => {
    const items = [...state.items];
    items[index] = { ...items[index], [field]: val };
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleRemove = (index: number) => {
    const items = state.items.filter((_: any, i: number) => i !== index);
    setState((prev: any) => ({ ...prev, items }));
  };

  const handleAdd = () => {
    const newItem: CMSFaq = { q: "New Question?", a: "New Answer text goes here." };
    setState((prev: any) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(state);
    setSaving(false);
    if (success) toast.success("FAQs saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display">FAQ Questions ({state.items?.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage FAQs, answers, and accordions layout.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving..." : "Save FAQs"}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Section Header</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Eyebrow</label>
              <input
                type="text"
                value={state.eyebrow}
                onChange={(e) => handleHeaderChange("eyebrow", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Title</label>
              <input
                type="text"
                value={state.title}
                onChange={(e) => handleHeaderChange("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">FAQs List</h3>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 text-[11px] uppercase tracking-wider rounded-lg bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 hover:bg-primary/25 transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {state.items?.map((item: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-background/20 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-border/40 pb-1">
                  <span className="text-xs font-semibold text-primary uppercase">FAQ {i + 1}</span>
                  <button
                    onClick={() => handleRemove(i)}
                    className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                <div className="grid gap-3">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Question</label>
                    <input
                      type="text"
                      value={item.q}
                      onChange={(e) => handleItemChange(i, "q", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Answer</label>
                    <textarea
                      rows={2}
                      value={item.a}
                      onChange={(e) => handleItemChange(i, "a", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobalTab({
  contact,
  onSaveContact,
  onUpdatePasscode,
}: {
  contact: CMSContact;
  onSaveContact: (val: CMSContact) => Promise<boolean>;
  onUpdatePasscode: (newPass: string) => Promise<boolean>;
}) {
  const [stateContact, setStateContact] = useState<CMSContact>(contact);
  const [savingContact, setSavingContact] = useState(false);

  const [newPass, setNewPass] = useState("");
  const [savingPass, setSavingPass] = useState(false);

  useEffect(() => setStateContact(contact), [contact]);

  const handleContactChange = (field: keyof CMSContact, val: string) => {
    setStateContact((prev: CMSContact) => ({ ...prev, [field]: val }));
  };

  const handleSaveContact = async () => {
    setSavingContact(true);
    const success = await onSaveContact(stateContact);
    setSavingContact(false);
    if (success) toast.success("Contact info saved!");
  };

  const handleSavePasscode = async () => {
    if (!newPass || newPass.trim().length < 4) {
      toast.error("Passcode must be at least 4 characters long.");
      return;
    }
    setSavingPass(true);
    const success = await onUpdatePasscode(newPass);
    setSavingPass(false);
    if (success) {
      toast.success("CMS Admin passcode updated successfully!");
      setNewPass("");
    } else {
      toast.error("Failed to update passcode.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display">Global Settings & Footer</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure global variables, contact info, and reset administrator passcode.</p>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {/* Contact Info form */}
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Global Contact CTA info</h3>
            <button
              onClick={handleSaveContact}
              disabled={savingContact}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
            >
              <Save className="h-3 w-3" />
              {savingContact ? "Saving..." : "Save Contact Info"}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">CTA Eyebrow</label>
              <input
                type="text"
                value={stateContact.eyebrow}
                onChange={(e) => handleContactChange("eyebrow", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">CTA Title</label>
              <input
                type="text"
                value={stateContact.title}
                onChange={(e) => handleContactChange("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">CTA Subtitle</label>
              <textarea
                rows={2}
                value={stateContact.sub}
                onChange={(e) => handleContactChange("sub", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Contact Email</label>
              <input
                type="text"
                value={stateContact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Contact Phone</label>
              <input
                type="text"
                value={stateContact.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Address Locations</label>
              <input
                type="text"
                value={stateContact.address}
                onChange={(e) => handleContactChange("address", e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Change Admin passcode */}
        <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-primary">Security Settings</h3>
            <button
              onClick={handleSavePasscode}
              disabled={savingPass}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 cursor-pointer font-button"
            >
              <Save className="h-3 w-3" />
              {savingPass ? "Updating..." : "Update Passcode"}
            </button>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Set New Admin Passcode</label>
            <input
              type="text"
              placeholder="Enter new alphanumeric passcode"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <p className="text-[10px] text-muted-foreground mt-2">Passcode changes will reflect immediately in database. Keep it secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
