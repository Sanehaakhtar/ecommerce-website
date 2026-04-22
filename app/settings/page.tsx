"use client";

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
        <div className="max-w-4xl mx-auto space-y-5">
        <header>
          <p className="label-caps mb-1">Account</p>
          <h1 className="text-xl font-bold tracking-tight">Settings</h1>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Manage your profile, security, and notifications.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-4">
          <section className="bento-card p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xs font-bold text-[var(--foreground)]">Profile</h2>
                <p className="text-[9px] text-[var(--text-muted)]">Update your personal details.</p>
              </div>
              <button className="rounded-lg border border-[var(--border-subtle)] px-3 py-1.5 text-[9px] font-semibold text-[var(--foreground)] hover:bg-[var(--bg-muted)] transition">
                Save changes
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-16 rounded-full bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] font-bold text-sm">
                  SA
                </div>
                <label className="text-[9px] font-semibold text-[var(--accent)] cursor-pointer">
                  Upload avatar
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="label-premium !text-[10px]">First name</label>
                    <input type="text" defaultValue="Saneha" className="input-premium !text-xs !py-2 !rounded-lg" />
                  </div>
                  <div>
                    <label className="label-premium !text-[10px]">Last name</label>
                    <input type="text" defaultValue="Akhtar" className="input-premium !text-xs !py-2 !rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="label-premium !text-[10px]">Email address</label>
                  <input type="email" defaultValue="saneha@shopspace.com" className="input-premium !text-xs !py-2 !rounded-lg" />
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-4">
            <section className="bento-card p-4">
              <div className="mb-3">
                <h2 className="text-xs font-bold text-[var(--foreground)]">Account security</h2>
                <p className="text-[9px] text-[var(--text-muted)]">Keep your account protected.</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="label-premium !text-[10px]">Current password</label>
                  <input type="password" className="input-premium !text-xs !py-2 !rounded-lg" placeholder="••••••••" />
                </div>
                <div>
                  <label className="label-premium !text-[10px]">New password</label>
                  <input type="password" className="input-premium !text-xs !py-2 !rounded-lg" placeholder="Create a new password" />
                </div>
                <button className="w-full rounded-lg bg-[var(--accent)] py-2 text-[10px] font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition">
                  Update password
                </button>
              </div>
            </section>

            <section className="bento-card p-4">
              <div className="mb-3">
                <h2 className="text-xs font-bold text-[var(--foreground)]">Notifications</h2>
                <p className="text-[9px] text-[var(--text-muted)]">Pick when we should notify you.</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Order updates", defaultChecked: true },
                  { label: "Weekly offers", defaultChecked: true },
                  { label: "New arrivals", defaultChecked: false },
                ].map((item) => (
                  <label key={item.label} className="flex items-center justify-between text-[11px] text-[var(--foreground)]">
                    <span>{item.label}</span>
                    <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-[var(--bg-muted)] transition">
                      <input
                        type="checkbox"
                        defaultChecked={item.defaultChecked}
                        className="peer sr-only"
                      />
                      <span className="h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition peer-checked:translate-x-4 peer-checked:bg-[var(--accent)]" />
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
