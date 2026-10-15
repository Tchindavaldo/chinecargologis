// Minimal in-browser stand-in for the Supabase client (demo mode only).
// Data lives in localStorage; nothing is sent to any backend.
import { DEMO_ADMIN, buildSettings, buildShipments, buildUsers } from './fixtures';

type Row = Record<string, any>;
const KEY = 'ccl-demo-db-v1';
const SKEY = 'ccl-demo-session';
const seeds: Record<string, () => Row[]> = {
  tolito_chinecargologis_shipments: buildShipments,
  tolito_chinecargologis_authorized_users: buildUsers,
  tolito_chinecargologis_site_settings: buildSettings,
};

let mem: Record<string, Row[]> | null = null;
function db(): Record<string, Row[]> {
  if (mem) return mem;
  try { mem = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { mem = null; }
  if (!mem) { mem = {}; for (const k in seeds) mem[k] = seeds[k](); save(); }
  return mem!;
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch { /* memory only */ } }
const uid = () => 'demo-' + Math.random().toString(36).slice(2, 10);

class Query implements PromiseLike<any> {
  private filters: ((r: Row) => boolean)[] = [];
  private op: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private payload: any;
  private cols = '*';
  private orderBy?: [string, boolean];
  private lim?: number;
  private mode: 'many' | 'single' | 'maybe' = 'many';
  private returning = false;
  constructor(private table: string) {}
  select(cols = '*') { if (this.op === 'select') this.cols = cols; else this.returning = true; return this; }
  insert(v: any) { this.op = 'insert'; this.payload = v; return this; }
  update(v: any) { this.op = 'update'; this.payload = v; return this; }
  upsert(v: any) { return this.insert(v); }
  delete() { this.op = 'delete'; return this; }
  eq(c: string, v: any) { this.filters.push(r => r[c] === v); return this; }
  neq(c: string, v: any) { this.filters.push(r => r[c] !== v); return this; }
  is(c: string, v: any) { this.filters.push(r => (r[c] ?? null) === v); return this; }
  ilike(c: string, v: string) { const re = new RegExp('^' + v.replace(/%/g, '.*') + '$', 'i'); this.filters.push(r => re.test(String(r[c] ?? ''))); return this; }
  order(c: string, o?: { ascending?: boolean }) { this.orderBy = [c, o?.ascending ?? true]; return this; }
  limit(n: number) { this.lim = n; return this; }
  single() { this.mode = 'single'; return this; }
  maybeSingle() { this.mode = 'maybe'; return this; }
  private run() {
    const all = (db()[this.table] ||= []);
    const match = (r: Row) => this.filters.every(f => f(r));
    let out: Row[] = [];
    const now = new Date().toISOString();
    if (this.op === 'insert') {
      const items = (Array.isArray(this.payload) ? this.payload : [this.payload]).map((p: Row) => ({ id: uid(), created_at: now, updated_at: now, ...p }));
      if (this.table.endsWith('shipments') && items.some((i: Row) => all.some(r => r.tracking_number === i.tracking_number)))
        return { data: null, error: { code: '23505', message: 'duplicate tracking number' } };
      all.push(...items); save(); out = items;
      if (!this.returning) return { data: null, error: null };
    } else if (this.op === 'update') {
      all.forEach((r, i) => { if (match(r)) { all[i] = { ...r, ...this.payload }; out.push(all[i]); } }); save();
      if (!this.returning) return { data: null, error: null };
    } else if (this.op === 'delete') {
      const keep = all.filter(r => !match(r)); out = all.filter(match); db()[this.table] = keep; save();
      if (!this.returning) return { data: null, error: null };
    } else out = all.filter(match);
    if (this.orderBy) { const [c, asc] = this.orderBy; out = [...out].sort((a, b) => (a[c] > b[c] ? 1 : -1) * (asc ? 1 : -1)); }
    if (this.lim != null) out = out.slice(0, this.lim);
    if (this.cols !== '*') { const ks = this.cols.split(',').map(s => s.trim()); out = out.map(r => Object.fromEntries(ks.map(k => [k, r[k]]))); }
    out = JSON.parse(JSON.stringify(out));
    if (this.mode === 'many') return { data: out, error: null };
    if (!out.length) return { data: null, error: this.mode === 'single' ? { code: 'PGRST116', message: 'No rows' } : null };
    return { data: out[0], error: null };
  }
  then<A = any, B = never>(ok?: ((v: any) => A | PromiseLike<A>) | null, ko?: ((e: any) => B | PromiseLike<B>) | null) {
    return new Promise(res => setTimeout(() => res(this.run()), 120)).then(ok, ko);
  }
}

type Listener = (event: string, session: any) => void;
const listeners = new Set<Listener>();
const makeSession = (email: string, id: string) => ({ access_token: 'demo', token_type: 'bearer', expires_in: 3600, refresh_token: 'demo', user: { id, email, aud: 'authenticated', app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() } });
function getSess() { try { return JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch { return null; } }
function setSess(s: any) { try { s ? localStorage.setItem(SKEY, JSON.stringify(s)) : localStorage.removeItem(SKEY); } catch { /* ignore */ } listeners.forEach(l => l(s ? 'SIGNED_IN' : 'SIGNED_OUT', s)); }
const notAvail = async () => ({ data: {}, error: { message: 'Not available in demo mode' } });

export const demoSupabase: any = {
  from: (t: string) => new Query(t),
  auth: {
    getSession: async () => ({ data: { session: getSess() }, error: null }),
    getUser: async () => ({ data: { user: getSess()?.user ?? null }, error: null }),
    onAuthStateChange(cb: Listener) {
      listeners.add(cb); setTimeout(() => cb('INITIAL_SESSION', getSess()), 0);
      return { data: { subscription: { unsubscribe: () => listeners.delete(cb) } } };
    },
    async signInWithPassword({ email, password }: { email: string; password: string }) {
      const u = db().tolito_chinecargologis_authorized_users.find(r => r.email === email && r.active);
      if (!u || (email === DEMO_ADMIN.email && password !== DEMO_ADMIN.password)) return { data: { user: null, session: null }, error: { message: 'Invalid login credentials' } };
      const s = makeSession(email, u.user_id || DEMO_ADMIN.id); setSess(s);
      return { data: { user: s.user, session: s }, error: null };
    },
    async signOut() { setSess(null); return { error: null }; },
    signUp: notAvail, signInWithOAuth: notAvail, resend: notAvail, resetPasswordForEmail: notAvail, updateUser: notAvail,
  },
  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'https://placehold.co/600x400/0f2a4a/ffffff?text=Demo+parcel' } }),
    }),
  },
};
