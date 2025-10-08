import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

function Toast({ type='success', message, onClose, timeout=2500 }) {
    if (!message) return null;
    const color = type === 'success' ? 'from-emerald-500 to-teal-500' : 'from-rose-500 to-red-500';
    useEffect(() => {
        const t = setTimeout(() => onClose && onClose(), timeout);
        return () => clearTimeout(t);
    }, [message]);
    return (
        <div className="fixed right-4 top-4 z-50">
            <div className={`rounded-xl bg-gradient-to-r ${color} px-4 py-3 text-white shadow-lg`}>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6h2V7zm0 8h-2v2h2v-2z"/></svg>
                    <span className="text-sm font-semibold">{message}</span>
                    <button onClick={onClose} className="ml-2 rounded-md bg-white/20 px-2 text-xs">Đóng</button>
                </div>
            </div>
        </div>
    );
}

function GradientText({ children }) {
    return (
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {children}
        </span>
    );
}

function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 p-4">
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="rounded-md p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.41 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29 10.59 10.59 16.89 4.29z"/></svg>
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

function NavBar({ activeTab, onChangeTab }) {
    const go = (tab) => {
        onChangeTab(tab);
        window.history.pushState({}, '', tab === 'features' ? '/#features' : tab === 'pricing' ? '/#pricing' : '/');
    };
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
                <a href="/" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); go('home'); }}>
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5a1 1 0 10-2 0v4.382l-3.447 3.447a1 1 0 101.414 1.414l3.74-3.74A1 1 0 0013 12V7z"/></svg>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">OKRun</span>
                </a>
                <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 sm:flex">
                    <a className={`${activeTab==='features' ? 'text-blue-600' : 'hover:text-blue-600'} transition`} href="#features" onClick={(e)=>{ e.preventDefault(); go('features'); }}>Tính năng</a>
                    <a className={`${activeTab==='pricing' ? 'text-blue-600' : 'hover:text-blue-600'} transition`} href="#pricing" onClick={(e)=>{ e.preventDefault(); go('pricing'); }}>Giá</a>
                </nav>
                <div className="flex items-center gap-3">
                    <a href="/auth/signup" className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 sm:block">Đăng ký</a>
                    <a href="/login" className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95">Đăng nhập</a>
                </div>
            </div>
        </header>
    );
}

function Hero({ onShowFeatures }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl"/>
            <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl"/>
            <div className="mx-auto max-w-6xl items-center gap-10 px-4 pb-28 pt-40 text-center sm:px-6 lg:px-8">
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600"/> Ra mắt bản Beta AI khuyến nghị OKR
                </p>
                <h1 className="text-5xl font-extrabold leading-tight text-slate-900 sm:text-6xl">
                    <GradientText>OKR hiện đại</GradientText> giúp đội ngũ tập trung và bứt phá
                </h1>
                <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-slate-600">
                    Đặt mục tiêu rõ ràng, theo dõi kết quả theo thời gian thực và cộng tác mượt mà. OKRun mang đến trải nghiệm OKR trực quan, mạnh mẽ và dễ sử dụng.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a href="/auth/signup" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-lg font-semibold text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl">
                        Dùng thử miễn phí
                    </a>
                    <button onClick={onShowFeatures} className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 text-lg font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                        Xem tính năng
                    </button>
                </div>
                <div className="mt-7 flex items-center justify-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500"/> 99.9% uptime</div>
                    <div>|</div>
                    <div>Bảo mật theo tiêu chuẩn OAuth2/OIDC</div>
                </div>
            </div>
        </section>
    );
}

function Section({ id, title, children }) {
    return (
        <section id={id} className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
                </div>
                <div className="mt-10">{children}</div>
            </div>
        </section>
    );
}

function Features() {
    const items = [
        { title: 'Theo dõi tiến độ', desc: 'Biểu đồ trực quan và báo cáo chi tiết giúp bám sát mục tiêu.', icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h4v8H3v-8zm7-6h4v14h-4V7zm7 -4h4v18h-4V3z"/></svg>), color: 'from-blue-600 to-indigo-600' },
        { title: 'Cộng tác đội nhóm', desc: 'Phân quyền linh hoạt, bình luận và theo dõi hoạt động rõ ràng.', icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13z"/></svg>), color: 'from-emerald-600 to-teal-600' },
        { title: 'Đặt mục tiêu thông minh', desc: 'Thiết lập SMART và gợi ý OKR phù hợp theo dữ liệu lịch sử.', icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2v20c-4.97-.5-9-4.78-9-10S6.03 2.5 11 2zm2 0c4.97.5 9 4.78 9 10s-4.03 9.5-9 10V2z"/></svg>), color: 'from-purple-600 to-fuchsia-600' },
    ];
    return (
        <Section id="features" title="Tính năng nổi bật">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((f, i) => (
                    <div key={i} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${f.color} p-3 text-white shadow`}>{f.icon}</div>
                        <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                        <p className="mt-2 text-slate-600">{f.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

function Pricing() {
    return (
        <Section id="pricing" title="Gói giá">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                    <p className="mt-2 text-slate-600">Dành cho nhóm nhỏ, thử nghiệm OKR.</p>
                    <div className="mt-4 text-3xl font-extrabold">0đ</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">Pro</h3>
                    <p className="mt-2 text-slate-600">Tính năng đầy đủ, hỗ trợ triển khai.</p>
                    <div className="mt-4 text-3xl font-extrabold">Liên hệ</div>
                </div>
            </div>
        </Section>
    );
}

function DashboardTopbar({ onLogout, onToggleSidebar, user, onOpenProfile, onOpenPassword }) {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((o) => !o);
    const triggerRef = useRef(null);
    const [triggerWidth, setTriggerWidth] = useState(0);

    useEffect(() => {
        const measure = () => {
            if (triggerRef.current) setTriggerWidth(triggerRef.current.offsetWidth);
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const displayName = user?.name || 'User';
    const email = user?.email || 'user@example.com';
    const avatar = user?.avatar || '/images/default.png';

    return (
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-4">
                <button onClick={onToggleSidebar} className="rounded-xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50" aria-label="Toggle sidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
                </button>
                <input className="hidden lg:block w-80 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tìm kiếm..." />
            </div>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <button ref={triggerRef} onClick={toggle} className="flex items-center gap-3 rounded-full border border-slate-200 bg-white pl-3 pr-4 py-2 hover:bg-slate-50" aria-haspopup="menu">
                        <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                        <span className="hidden md:block text-base font-semibold text-slate-700">{displayName}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl" style={{minWidth: Math.max(triggerWidth, 360)}}>
                            <div className="border-b border-slate-200 p-5">
                                <div className="font-semibold text-slate-900">{displayName}</div>
                                <div className="text-sm text-slate-500">{email}</div>
                            </div>
                            <div className="p-2">
                                <button onClick={()=>{setOpen(false); onOpenProfile();}} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z"/></svg>
                                    Hồ sơ cá nhân
                                </button>
                                <button onClick={()=>{setOpen(false); onOpenPassword();}} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8 4a8 8 0 11-16 0 8 8 0 0116 0z"/></svg>
                                    Đổi mật khẩu
                                </button>
                                <button onClick={onLogout} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3H10a2 2 0 00-2 2v4h2V5h10v14H10v-4H8v4a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"/></svg>
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, href, collapsed }) {
    return (
        <a href={href} className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}>
            <span className="inline-flex h-6 w-6 items-center justify-center text-slate-500 group-hover:text-blue-600">{icon}</span>
            {!collapsed && <span className="truncate">{label}</span>}
        </a>
    );
}

function DashboardSidebar({ open }) {
    const collapsed = !open;
    return (
        <aside className={`${open ? 'w-72' : 'w-20'} sticky top-0 hidden h-screen shrink-0 border-r border-slate-200 bg-white p-4 transition-all duration-200 md:block`}>
            <div className={`mb-8 flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
                <a href="/dashboard" className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3" title="Dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                </a>
                {!collapsed && <a href="/dashboard" className="text-xl font-extrabold text-slate-900">OKRun</a>}
            </div>
            <nav className="space-y-1">
                {/* Dashboard */}
                <SidebarItem collapsed={collapsed} href="/dashboard" label="Dashboard" icon={(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>)} />
                {/* Đội nhóm */}
                <SidebarItem collapsed={collapsed} href="/team" label="Đội nhóm" icon={(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13z"/></svg>)} />
                {/* Chu kỳ */}
                <a href="#" onClick={(e)=>{ e.preventDefault(); window.history.pushState({}, '', '/dashboard?panel=cycles'); const ev = new Event('open-cycles-panel'); window.dispatchEvent(ev); }} className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}>
                    <span className="inline-flex h-6 w-6 items-center justify-center text-slate-500 group-hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6V2l6 6-6 6V10C7.03 10 3 14.03 3 19c0 1.05.17 2.06.49 3.01C2.02 20.54 1 17.89 1 15c0-5.52 4.48-10 10-10z"/></svg></span>
                    {!collapsed && <span className="truncate">Chu kỳ</span>}
                </a>
                {/* Mục tiêu */}
                {/* Objectives opens embedded panel on dashboard */}
                <a href="#" onClick={(e)=>{ e.preventDefault(); window.history.pushState({}, '', '/dashboard?panel=objectives'); const ev = new Event('open-objectives-panel'); window.dispatchEvent(ev); }} className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}>
                    <span className="inline-flex h-6 w-6 items-center justify-center text-slate-500 group-hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a5 5 0 015 5h2a7 7 0 10-7 7v-2a5 5 0 115-5h-2a3 3 0 11-3-3V7z"/></svg></span>
                    {!collapsed && <span className="truncate">Mục tiêu</span>}
                </a>
                {/* Phòng ban */}
                <a href="#" onClick={(e)=>{ e.preventDefault(); window.history.pushState({}, '', '/dashboard?panel=departments'); const ev = new Event('open-departments-panel'); window.dispatchEvent(ev); }} className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}>
                    <span className="inline-flex h-6 w-6 items-center justify-center text-slate-500 group-hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v2H3V4zm2 4h14v12H5V8zm4 2v8h6v-8H9z"/></svg></span>
                    {!collapsed && <span className="truncate">Phòng ban</span>}
                </a>
                {/* Quản lý người dùng */}
                <a href="#" onClick={(e)=>{ e.preventDefault(); window.history.pushState({}, '', '/dashboard?panel=users'); const ev = new Event('open-users-panel'); window.dispatchEvent(ev); }} className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}>
                    <span className="inline-flex h-6 w-6 items-center justify-center text-slate-500 group-hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13z"/></svg></span>
                    {!collapsed && <span className="truncate">Quản lý người dùng</span>}
                </a>
            </nav>
        </aside>
    );
}

function ProfilePage({ embedded = false }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        avatar: null
    });
    const [avatarPreview, setAvatarPreview] = useState('');
    const [toast, setToast] = useState({ type: 'success', message: '' });

    const fetchProfile = async () => {
        try {
            const res = await fetch('/profile', {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.success) {
                setUser(result.data);
                setFormData({
                    full_name: result.data.name || '',
                    email: result.data.email || '',
                    avatar: null
                });
                setAvatarPreview(result.data.avatar || '');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, avatar: file }));
            const reader = new FileReader();
            reader.onload = (e) => setAvatarPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const form = new FormData();
            form.append('_token', token);
            form.append('full_name', formData.full_name);
            if (formData.avatar) form.append('avatar', formData.avatar);

            const res = await fetch('/profile', {
                method: 'POST',
                body: form,
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin'
            });

            const result = await res.json();
            if (result.success) {
                setToast({ type: 'success', message: result.message || 'Cập nhật hồ sơ thành công!' });
                fetchProfile(); // Reload profile data
            } else {
                setToast({ type: 'error', message: result.message || 'Cập nhật hồ sơ thất bại!' });
            }
        } catch (error) {
            console.error('Update profile error:', error);
            setToast({ type: 'error', message: 'Cập nhật hồ sơ thất bại: ' + error.message });
        }
    };

    if (loading) {
        return (
            <div className={embedded ? "p-0" : "px-4 py-6"}>
                <div className="mx-auto w-full max-w-2xl">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="text-center text-slate-500">Đang tải...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={embedded ? "p-0" : "px-4 py-6"}>
            <div className="mx-auto w-full max-w-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Section - User Info Display */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <img
                                    src={avatarPreview || '/default-avatar.png'}
                                    alt="Avatar"
                                    className="h-24 w-24 rounded-full object-cover border-2 border-blue-200 mx-auto"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mt-4">{formData.full_name || 'Admin'}</h3>
                            <p className="text-slate-600 mt-1">{formData.email}</p>
                        </div>
                    </div>

                    {/* Right Section - Profile Form */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Chỉnh sửa hồ sơ</h2>

                        <form onSubmit={updateProfile} className="space-y-6">
                            {/* Full Name Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Họ và tên</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                                        className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Avatar Upload Field */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Ảnh đại diện</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-slate-500">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">Chọn ảnh (JPG, PNG, GIF ≤ 2MB)</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => document.querySelector('input[type="file"]').click()}
                                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                                    >
                                        Tải lên
                                    </button>
                                </div>
                            </div>

                            {/* Update Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-95 transition-opacity"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toast */}
            <Toast
                type={toast.type}
                message={toast.message}
                onClose={() => setToast({ type: 'success', message: '' })}
            />
        </div>
    );
}

function ProfileSettings({ user, activeTab }) {
    const [toast, setToast] = useState({ type: 'success', message: '' });
    const showToast = (type, message) => setToast({ type, message });

    const [name, setName] = useState(user?.name || '');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    useEffect(()=>{ setName(user?.name || ''); }, [user]);

    const submitProfile = async (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const form = new FormData();
        form.append('_token', token);
        form.append('full_name', name);
        if (file) form.append('avatar', file);
        const res = await fetch('/profile', { method: 'POST', body: form, headers: { 'Accept': 'application/json' } });
        if (res.ok) {
            const data = await res.json().catch(()=>({}));
            showToast('success', (data && data.message) || 'Cập nhật hồ sơ thành công!');
            setTimeout(()=> window.location.reload(), 800);
        } else {
            const err = await res.json().catch(()=>({ message: 'Cập nhật thất bại' }));
            showToast('error', err.message || 'Cập nhật thất bại');
        }
    };

    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const submitPassword = async (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const form = new FormData();
        form.append('_token', token);
        form.append('old_password', oldPwd);
        form.append('new_password', newPwd);
        form.append('new_password_confirmation', confirmPwd);
        const res = await fetch('/change-password', { method: 'POST', body: form, headers: { 'Accept': 'application/json' } });
        if (res.ok) {
            const data = await res.json().catch(()=>({}));
            showToast('success', (data && data.message) || 'Đổi mật khẩu thành công!');
            setTimeout(()=> { window.location.href = '/landingpage'; }, 900);
        } else {
            const err = await res.json().catch(()=>({ message: 'Đổi mật khẩu thất bại' }));
            showToast('error', err.message || 'Đổi mật khẩu thất bại');
        }
    };

    const avatar = user?.avatar || '/images/default.png';
    const email = user?.email || '';

    return (
        <div className="mx-auto w-full max-w-4xl">
            <Toast type={toast.type} message={toast.message} onClose={()=>setToast({ type:'success', message:'' })} />
            {activeTab==='profile' && (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
                        <h2 className="text-xl font-extrabold">Hồ sơ cá nhân</h2>
                        <p className="text-white/80">Cập nhật tên hiển thị và ảnh đại diện của bạn</p>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="md:col-span-1">
                                <div className="flex flex-col items-center rounded-2xl border border-slate-200 p-6">
                                    <img src={avatar} className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100" alt="avatar" />
                                    <div className="mt-3 text-center">
                                        <div className="text-base font-semibold text-slate-900">{name || user?.name || 'Chưa cập nhật'}</div>
                        <div className="text-sm text-slate-500">{email}</div>
                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <form onSubmit={submitProfile} className="space-y-5">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Họ và tên</label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z"/></svg>
                                            </span>
                                            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-2xl border border-slate-300 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
                                        </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Ảnh đại diện</label>
                                        <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-300 p-4 hover:border-blue-400">
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9l-7 7-5-5 1.41-1.41L12 13.17l5.59-5.59L19 9z"/></svg>
                                                <span>{fileName || 'Chọn ảnh (JPG, PNG, GIF ≤ 2MB)'}</span>
                                            </div>
                                            <input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]||null; setFile(f); setFileName(f ? f.name : ''); }} className="hidden" />
                                            <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm">{fileName ? 'Đã chọn' : 'Tải lên'}</span>
                                        </label>
                        </div>
                        <div className="flex justify-end">
                                        <button type="submit" className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-95">Cập nhật</button>
                        </div>
                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab==='password' && (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-4 text-white">
                        <h2 className="text-xl font-extrabold">Đổi mật khẩu</h2>
                        <p className="text-white/80">Bảo vệ tài khoản của bạn với mật khẩu mạnh</p>
                    </div>
                    <div className="p-6">
                        <form onSubmit={submitPassword} className="grid gap-6">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Mật khẩu hiện tại</label>
                                <input type="password" value={oldPwd} onChange={(e)=>setOldPwd(e.target.value)} className="w-full rounded-3xl border border-slate-300 px-5 py-4 text-base outline-none" required />
                        </div>
                            <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Mật khẩu mới</label>
                                    <input type="password" value={newPwd} onChange={(e)=>setNewPwd(e.target.value)} className="w-full rounded-3xl border border-slate-300 px-5 py-4 text-base outline-none" required />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Xác nhận mật khẩu</label>
                                    <input type="password" value={confirmPwd} onChange={(e)=>setConfirmPwd(e.target.value)} className="w-full rounded-3xl border border-slate-300 px-5 py-4 text-base outline-none" required />
                        </div>
                            </div>
                            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500 md:text-sm">
                                    <li>Ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.</li>
                                    <li>Không nên dùng mật khẩu đã sử dụng trước đó.</li>
                                </ul>
                                <button type="submit" className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow hover:opacity-95">Cập nhật</button>
                        </div>
                    </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [panel, setPanel] = useState('home'); // 'home' | 'profile' | 'password' | 'users' | 'cycles' | 'departments' | 'objectives'

    const logout = async () => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            await fetch('/auth/logout', { method: 'POST', headers: { 'X-CSRF-TOKEN': token } });
            window.location.href = '/landingpage';
        } catch (e) {
            console.error(e);
        }
    };

    const user = window.__USER__ || null;

    useEffect(() => {
        const setPanelAndUrl = (p) => {
            setPanel(p);
            const usp = new URLSearchParams(window.location.search);
            usp.set('panel', p);
            window.history.replaceState({}, '', `/dashboard?${usp.toString()}`);
        };
        const handler = () => setPanelAndUrl('users');
        const handlerObj = () => setPanelAndUrl('objectives');
        const handlerDept = () => setPanelAndUrl('departments');
        const handlerCycles = () => setPanelAndUrl('cycles');
        window.addEventListener('open-users-panel', handler);
        window.addEventListener('open-objectives-panel', handlerObj);
        window.addEventListener('open-departments-panel', handlerDept);
        window.addEventListener('open-cycles-panel', handlerCycles);
        return () => {
            window.removeEventListener('open-users-panel', handler);
            window.removeEventListener('open-objectives-panel', handlerObj);
            window.removeEventListener('open-departments-panel', handlerDept);
            window.removeEventListener('open-cycles-panel', handlerCycles);
        };
    }, []);

    useEffect(() => {
        if (window.location.pathname.startsWith('/users')) {
            setPanel('users');
        }
        if (window.location.pathname.startsWith('/cycles')) {
            setPanel('cycles');
        }
        if (window.location.pathname.startsWith('/departments')) {
            setPanel('departments');
        }
        if (window.location.pathname.startsWith('/dashboard')) {
            const usp = new URLSearchParams(window.location.search);
            const pnl = usp.get('panel');
            if (pnl === 'objectives' || pnl === 'users' || pnl === 'cycles' || pnl === 'departments' || pnl === 'profile' || pnl === 'password') {
                setPanel(pnl);
            }
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <DashboardSidebar open={sidebarOpen} />
            <div className="flex w-full flex-col">
                <DashboardTopbar user={user} onLogout={logout} onToggleSidebar={()=>setSidebarOpen((o)=>!o)} onOpenProfile={()=>{setPanel('profile');}} onOpenPassword={()=>{setPanel('password');}} />
                <div className="p-6">
                    {panel==='home' && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-900 shadow-sm">
                            <h1 className="text-2xl font-extrabold">Dashboard</h1>
                            <p className="mt-2 text-slate-600">Khu vực quản trị. Nội dung dashboard sẽ được bổ sung sau.</p>
                        </div>
                    )}
                {window.location.pathname.startsWith('/departments') ? (
                    <DepartmentsPage />
                ) : null}
                {panel==='objectives' && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-extrabold text-slate-900">Mục tiêu</h2>
                            <button onClick={()=>window.dispatchEvent(new CustomEvent('open-objective-create'))} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700">+ Tạo mục tiêu</button>
                        </div>
                        <ObjectivesPage embedded={true} />
                    </div>
                )}
                {panel==='departments' && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <DepartmentsPage embedded={true} />
                    </div>
                )}
                    {panel==='profile' && (
                        <ProfilePage embedded={true} />
                    )}
                    {panel==='password' && (
                        <ProfileSettings user={user} activeTab={panel} />
                    )}
                    {panel==='users' && (
                        <UsersPage />
                    )}
                    {panel==='cycles' && (
                        <CyclesPage />
                    )}
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer id="contact" className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                        </div>
                        <span className="text-lg font-extrabold text-slate-900">OKRun</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">Phần mềm OKR hiện đại cho mọi quy mô tổ chức.</p>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900">Sản phẩm</h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li><a className="hover:text-blue-600" href="#features">Tính năng</a></li>
                        <li><a className="hover:text-blue-600" href="#pricing">Giá</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900">Hỗ trợ</h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li><a className="hover:text-blue-600" href="/auth/forgot">Quên mật khẩu</a></li>
                        <li><a className="hover:text-blue-600" href="/auth/signup">Đăng ký</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900">Liên hệ</h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>Email: support@okrun.app</li>
                        <li>Hotline: 0123 456 789</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} OKRun. All rights reserved.</div>
        </footer>
    );
}

function Badge({ color='emerald', children }) {
    const map = {
        emerald: 'bg-emerald-100 text-emerald-700',
        slate: 'bg-slate-100 text-slate-700',
        red: 'bg-rose-100 text-rose-700',
        blue: 'bg-blue-100 text-blue-700',
        indigo: 'bg-indigo-100 text-indigo-700',
        amber: 'bg-amber-100 text-amber-700',
    };
    return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${map[color]}`}>{children}</span>;
}

function Select({ value, onChange, options, placeholder }) {
    return (
        <select value={value} onChange={e=>onChange(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">{placeholder}</option>
            {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    );
}


function CyclesPage({ embedded = false }) {
    const [cycles, setCycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedCycle, setSelectedCycle] = useState(null);
    const [toast, setToast] = useState({ type: 'success', message: '' });
    const [createForm, setCreateForm] = useState({
        cycle_name: '',
        start_date: '',
        end_date: '',
        status: 'active',
        description: ''
    });

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => {
                setToast({ type: 'success', message: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.message]);
    const [editForm, setEditForm] = useState({
        cycle_name: '',
        start_date: '',
        end_date: '',
        status: 'active',
        description: ''
    });

    const fetchCycles = async () => {
        try {
            const res = await fetch('/cycles', {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.success) {
                setCycles(result.data);
            }
        } catch (error) {
            console.error('Error fetching cycles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCycles();
    }, []);

    const openCreateModal = () => {
        setCreateForm({
            cycle_name: '',
            start_date: '',
            end_date: '',
            status: 'active',
            description: ''
        });
        setOpenCreate(true);
    };

    const openEditModal = (cycle) => {
        setSelectedCycle(cycle);
        setEditForm({
            cycle_name: cycle.cycle_name || '',
            start_date: cycle.start_date || '',
            end_date: cycle.end_date || '',
            status: cycle.status || 'active',
            description: cycle.description || ''
        });
        setOpenEdit(true);
    };

    const openViewModal = (cycle) => {
        setSelectedCycle(cycle);
        setOpenView(true);
    };

    const openDeleteModal = (cycle) => {
        setSelectedCycle(cycle);
        setOpenDelete(true);
    };

    const createCycle = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch('/cycles/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(createForm),
                credentials: 'same-origin'
            });
            const result = await res.json();
                if (result.success) {
                    setOpenCreate(false);
                    fetchCycles();
                    setToast({ type: 'success', message: 'Tạo chu kỳ thành công!' });
                } else {
                    setToast({ type: 'error', message: 'Tạo chu kỳ thất bại: ' + (result.message || 'Lỗi không xác định') });
                }
        } catch (error) {
            console.error('Create cycle error:', error);
            setToast({ type: 'error', message: 'Tạo chu kỳ thất bại: ' + error.message });
        }
    };

    const updateCycle = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch(`/cycles/${selectedCycle.cycle_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(editForm),
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.success) {
                setOpenEdit(false);
                fetchCycles();
                setToast({ type: 'success', message: 'Cập nhật chu kỳ thành công!' });
            } else {
                setToast({ type: 'error', message: 'Cập nhật chu kỳ thất bại: ' + (result.message || 'Lỗi không xác định') });
            }
        } catch (error) {
            console.error('Update cycle error:', error);
            setToast({ type: 'error', message: 'Cập nhật chu kỳ thất bại: ' + error.message });
        }
    };

    const deleteCycle = async () => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch(`/cycles/${selectedCycle.cycle_id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            });

            if (res.ok) {
                const result = await res.json();
                if (result.success) {
                    setOpenDelete(false);
                    fetchCycles();
                    setToast({ type: 'success', message: 'Xóa chu kỳ thành công!' });
                } else {
                    setToast({ type: 'error', message: 'Xóa chu kỳ thất bại: ' + (result.message || 'Lỗi không xác định') });
                }
            } else {
                const errorText = await res.text();
                console.error('Delete cycle error:', errorText);
                setToast({ type: 'error', message: 'Xóa chu kỳ thất bại: ' + res.status + ' - ' + errorText });
            }
        } catch (error) {
            console.error('Delete cycle error:', error);
            setToast({ type: 'error', message: 'Xóa chu kỳ thất bại: ' + error.message });
        }
    };

    return (
        <div className={embedded ? "p-0" : "px-4 py-6"}>
            <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
                    <h3 className="text-lg font-semibold text-slate-900">Quản lý chu kỳ</h3>
                    <button onClick={openCreateModal} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700">+ Tạo chu kỳ</button>
                </div>
                <div className="p-6">
                    {loading && (
                        <div className="text-center py-8 text-slate-500">Đang tải...</div>
                    )}
                    {!loading && cycles.length === 0 && (
                        <div className="text-center py-8 text-slate-500">Không có kết quả</div>
                    )}
                    {!loading && cycles.length > 0 && (
                        <div className="space-y-4">
                            {cycles.map((cycle) => (
                                <div key={cycle.cycle_id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = `/cycles/${cycle.cycle_id}/detail`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-slate-900">{cycle.cycle_name || 'N/A'}</h3>
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                    cycle.status === 'active'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {cycle.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div className="mt-2 text-sm text-slate-600">
                                                <div className="flex items-center gap-4">
                                                    <span>📅 Bắt đầu: {cycle.start_date || 'N/A'}</span>
                                                    <span>📅 Kết thúc: {cycle.end_date || 'N/A'}</span>
                                                </div>
                                                {cycle.description && (
                                                    <div className="mt-1 text-slate-500">{cycle.description}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => openViewModal(cycle)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Xem</button>
                                            <button onClick={() => openEditModal(cycle)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Sửa</button>
                                            <button onClick={() => openDeleteModal(cycle)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                                </svg>
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Tạo chu kỳ mới">
                <form onSubmit={createCycle} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tên chu kỳ</label>
                        <input type="text" value={createForm.cycle_name} onChange={(e) => setCreateForm(prev => ({ ...prev, cycle_name: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Ngày bắt đầu</label>
                        <input type="date" value={createForm.start_date} onChange={(e) => setCreateForm(prev => ({ ...prev, start_date: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Ngày kết thúc</label>
                        <input type="date" value={createForm.end_date} onChange={(e) => setCreateForm(prev => ({ ...prev, end_date: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                        <select value={createForm.status} onChange={(e) => setCreateForm(prev => ({ ...prev, status: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Mô tả</label>
                        <textarea value={createForm.description} onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setOpenCreate(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Tạo</button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Sửa chu kỳ">
                <form onSubmit={updateCycle} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tên chu kỳ</label>
                        <input type="text" value={editForm.cycle_name} onChange={(e) => setEditForm(prev => ({ ...prev, cycle_name: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Ngày bắt đầu</label>
                        <input type="date" value={editForm.start_date} onChange={(e) => setEditForm(prev => ({ ...prev, start_date: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Ngày kết thúc</label>
                        <input type="date" value={editForm.end_date} onChange={(e) => setEditForm(prev => ({ ...prev, end_date: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                        <select value={editForm.status} onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Mô tả</label>
                        <textarea value={editForm.description} onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setOpenEdit(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Cập nhật</button>
                    </div>
                </form>
            </Modal>

            {/* View Modal */}
            <Modal open={openView} onClose={() => setOpenView(false)} title="Chi tiết chu kỳ">
                {selectedCycle && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Tên chu kỳ:</label>
                            <p className="text-slate-900">{selectedCycle.cycle_name || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Ngày bắt đầu:</label>
                            <p className="text-slate-900">{selectedCycle.start_date || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Ngày kết thúc:</label>
                            <p className="text-slate-900">{selectedCycle.end_date || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Trạng thái:</label>
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                selectedCycle.status === 'active'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {selectedCycle.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                            </span>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Mô tả:</label>
                            <p className="text-slate-900">{selectedCycle.description || 'N/A'}</p>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={openDelete} onClose={() => setOpenDelete(false)} title="Xác nhận xóa chu kỳ">
                {selectedCycle && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">Xóa chu kỳ</h3>
                                <p className="text-sm text-slate-600">Hành động này không thể hoàn tác</p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4">
                            <p className="text-slate-700">
                                Bạn có chắc muốn xóa chu kỳ <strong className="text-slate-900">"{selectedCycle.cycle_name}"</strong>?
                            </p>
                            <p className="mt-2 text-sm text-slate-600">
                                Tất cả dữ liệu liên quan đến chu kỳ này sẽ bị xóa vĩnh viễn.
                            </p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setOpenDelete(false)}
                                className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={deleteCycle}
                                className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                                Xóa chu kỳ
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Toast Notification */}
            {toast.message && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
                    <div className={`rounded-lg border px-4 py-3 shadow-lg ${
                        toast.type === 'success'
                            ? 'border-green-200 bg-green-50 text-green-800'
                            : 'border-red-200 bg-red-50 text-red-800'
                    }`}>
                        <div className="flex items-center gap-2">
                            {toast.type === 'success' ? (
                                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                            <span className="text-sm font-medium">{toast.message}</span>
                            <button
                                onClick={() => setToast({ type: 'success', message: '' })}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function UsersPage({ embedded = false }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [createForm, setCreateForm] = useState({
        full_name: '',
        email: '',
        role_id: '',
        department_id: '',
        status: 'active'
    });
    const [editForm, setEditForm] = useState({
        full_name: '',
        email: '',
        role_id: '',
        department_id: '',
        status: 'active'
    });
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/users', {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.success) {
                setUsers(result.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await fetch('/departments', {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.data) {
                setDepartments(result.data);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchRoles = async () => {
        // Mock roles data - bạn có thể tạo API riêng cho roles
        setRoles([
            { role_id: 1, role_name: 'Admin' },
            { role_id: 2, role_name: 'Manager' },
            { role_id: 3, role_name: 'Member' }
        ]);
    };

    useEffect(() => {
        fetchUsers();
        fetchDepartments();
        fetchRoles();
    }, []);

    const openCreateModal = () => {
        setCreateForm({
            full_name: '',
            email: '',
            role_id: '',
            department_id: '',
            status: 'active'
        });
        setOpenCreate(true);
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditForm({
            full_name: user.full_name || '',
            email: user.email || '',
            role_id: user.role_id || '',
            department_id: user.department_id || '',
            status: user.status || 'active'
        });
        setOpenEdit(true);
    };

    const openViewModal = (user) => {
        setSelectedUser(user);
        setOpenView(true);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setOpenDelete(true);
    };

    const createUser = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(createForm),
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.success) {
                setOpenCreate(false);
                fetchUsers();
                alert('Tạo người dùng thành công!');
            } else {
                alert('Tạo người dùng thất bại: ' + (result.message || 'Lỗi không xác định'));
            }
        } catch (error) {
            console.error('Create user error:', error);
            alert('Tạo người dùng thất bại: ' + error.message);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch(`/users/${selectedUser.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(editForm),
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.success) {
                setOpenEdit(false);
                fetchUsers();
                alert('Cập nhật người dùng thành công!');
            } else {
                alert('Cập nhật người dùng thất bại: ' + (result.message || 'Lỗi không xác định'));
            }
        } catch (error) {
            console.error('Update user error:', error);
            alert('Cập nhật người dùng thất bại: ' + error.message);
        }
    };

    const deleteUser = async () => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch(`/users/${selectedUser.user_id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.success) {
                setOpenDelete(false);
                fetchUsers();
                alert('Xóa người dùng thành công!');
            } else {
                alert('Xóa người dùng thất bại: ' + (result.message || 'Lỗi không xác định'));
            }
        } catch (error) {
            console.error('Delete user error:', error);
            alert('Xóa người dùng thất bại: ' + error.message);
        }
    };

    return (
        <div className={embedded ? "p-0" : "px-4 py-6"}>
            <div className="mx-auto mb-3 flex w-full max-w-6xl items-center justify-between">
                {!embedded && <h2 className="text-2xl font-extrabold text-slate-900">Quản lý người dùng</h2>}
                <button onClick={openCreateModal} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700">+ Tạo người dùng</button>
            </div>
            <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-slate-100 bg-slate-50">
                            <tr>
                                <th className="px-4 py-3">Tên</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Vai trò</th>
                                <th className="px-4 py-3">Phòng ban</th>
                                <th className="px-4 py-3">Trạng thái</th>
                                <th className="px-4 py-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && (<tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">Đang tải...</td></tr>)}
                            {!loading && users.length === 0 && (<tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">Không có kết quả</td></tr>)}
                            {users.map((user) => (
                                <tr key={user.user_id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{user.full_name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-slate-600">{user.email || 'N/A'}</td>
                                    <td className="px-4 py-3 text-slate-600">{user.role?.role_name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-slate-600">{user.department?.d_name || 'N/A'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                            user.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-1">
                                            {/* Ẩn tất cả button nếu user hiện tại là admin */}
                                            {window.__USER__?.role_name !== 'Admin' && (
                                                <>
                                                    {/* Chỉ hiện Sửa và Xóa cho user khác, bỏ Xem */}
                                                    <button onClick={() => openEditModal(user)} className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">Sửa</button>
                                                    <button onClick={() => openDeleteModal(user)} className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50">Xóa</button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Tạo người dùng mới">
                <form onSubmit={createUser} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tên đầy đủ</label>
                        <input type="text" value={createForm.full_name} onChange={(e) => setCreateForm(prev => ({ ...prev, full_name: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" value={createForm.email} onChange={(e) => setCreateForm(prev => ({ ...prev, email: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Vai trò</label>
                        <select value={createForm.role_id} onChange={(e) => setCreateForm(prev => ({ ...prev, role_id: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Chọn vai trò</option>
                            {roles.map(role => (
                                <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Phòng ban</label>
                        <select value={createForm.department_id} onChange={(e) => setCreateForm(prev => ({ ...prev, department_id: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Chọn phòng ban</option>
                            {departments.map(dept => (
                                <option key={dept.department_id} value={dept.department_id}>{dept.d_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                        <select value={createForm.status} onChange={(e) => setCreateForm(prev => ({ ...prev, status: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setOpenCreate(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Tạo</button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Sửa người dùng">
                <form onSubmit={updateUser} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tên đầy đủ</label>
                        <input type="text" value={editForm.full_name} onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" value={editForm.email} onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Vai trò</label>
                        <select value={editForm.role_id} onChange={(e) => setEditForm(prev => ({ ...prev, role_id: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Chọn vai trò</option>
                            {roles.map(role => (
                                <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Phòng ban</label>
                        <select value={editForm.department_id} onChange={(e) => setEditForm(prev => ({ ...prev, department_id: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Chọn phòng ban</option>
                            {departments.map(dept => (
                                <option key={dept.department_id} value={dept.department_id}>{dept.d_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                        <select value={editForm.status} onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setOpenEdit(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Cập nhật</button>
                    </div>
                </form>
            </Modal>

            {/* View Modal */}
            <Modal open={openView} onClose={() => setOpenView(false)} title="Chi tiết người dùng">
                {selectedUser && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Tên đầy đủ:</label>
                            <p className="text-slate-900">{selectedUser.full_name || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Email:</label>
                            <p className="text-slate-900">{selectedUser.email || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Vai trò:</label>
                            <p className="text-slate-900">{selectedUser.role?.role_name || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Phòng ban:</label>
                            <p className="text-slate-900">{selectedUser.department?.d_name || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Trạng thái:</label>
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                selectedUser.status === 'active'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {selectedUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                            </span>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={openDelete} onClose={() => setOpenDelete(false)} title="Xác nhận xóa">
                {selectedUser && (
                    <div className="space-y-4">
                        <p className="text-slate-700">Bạn có chắc muốn xóa người dùng <strong>{selectedUser.full_name}</strong>? Hành động này không thể hoàn tác.</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setOpenDelete(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                            <button onClick={deleteUser} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">Xóa</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

function ObjectivesPage({ embedded = false }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [confirmId, setConfirmId] = useState(null);
    const [confirmKRId, setConfirmKRId] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAddKR, setOpenAddKR] = useState(false);
    const [openViewKR, setOpenViewKR] = useState(false);
    const [viewKRData, setViewKRData] = useState({ objective: null, keyResults: [] });
    const [editKRData, setEditKRData] = useState([]);
    const [editForm, setEditForm] = useState({ id: null, obj_title: '', description: '', level: 'Công ty', status: 'draft', progress_percent: '', cycle_id: null });
    const [krForm, setKrForm] = useState({ objective_id: null, kr_title: '', target_value: '', current_value: '', unit: 'Số lượng', status: 'active', weight: '', progress_percent: '' });
    const [createForm, setCreateForm] = useState({ obj_title: '', description: '', level: 'Công ty', status: 'draft', progress_percent: '', cycle_id: null });

    const load = async (p=1) => {
        setLoading(true);
        try {
            const res = await fetch(`/objectives?page=${p}`, { headers: { 'Accept': 'application/json' }, credentials: 'same-origin' });
            if (!res.ok) throw new Error();
            const json = await res.json();
            const pag = json.data || {};
            const data = pag.data || [];
            setItems(data);
            setPage(pag.current_page || p);
            setLastPage(pag.last_page || 1);
        } catch {
            setError('Không thể tải danh sách mục tiêu');
        } finally { setLoading(false); }
    };

    useEffect(() => { load(1); }, []);

    // Cho phép panel bên ngoài mở modal tạo nhanh
    useEffect(() => {
        const handler = () => setOpenCreate(true);
        window.addEventListener('open-objective-create', handler);
        return () => window.removeEventListener('open-objective-create', handler);
    }, []);

    const removeObjective = async (id) => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch(`/objectives/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ _method: 'DELETE' }),
                credentials: 'same-origin'
            });

            const result = await res.json();
            if (result.success) {
                setConfirmId(null);
                await load(page);
            } else {
                alert(result.message || 'Xóa mục tiêu không thành công');
            }
        } catch {
            alert('Xóa không thành công');
        }
    };

    const openEditModal = async (id) => {
        try {
            const res = await fetch(`/objectives/${id}`, {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.data) {
                const obj = result.data;
                setEditForm({
                    id: obj.objective_id,
                    obj_title: obj.obj_title || '',
                    description: obj.description || '',
                    level: obj.level || 'Công ty',
                    status: obj.status || 'draft',
                    progress_percent: obj.progress_percent || '',
                    cycle_id: obj.cycle_id
                });
                setEditKRData(obj.key_results || []);
                setOpenEdit(true);
            }
        } catch {
            alert('Không thể tải thông tin mục tiêu');
        }
    };

    const openAddKRModal = (objectiveId) => {
        // Reset form hoàn toàn
        const newForm = {
            objective_id: objectiveId,
            kr_title: '',
            target_value: '',
            current_value: '',
            unit: 'Số lượng',
            status: 'active',
            weight: '',
            progress_percent: ''
        };
        setKrForm(newForm);
        setOpenAddKR(true);
    };

    const openViewKRModal = async (objectiveId) => {
        try {
            const res = await fetch(`/objectives/${objectiveId}`, {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin'
            });
            const result = await res.json();
            if (result.data) {
                const objective = result.data;
                setViewKRData({
                    objective: objective,
                    keyResults: objective.key_results || []
                });
                setOpenViewKR(true);
            }
        } catch {
            alert('Không thể tải thông tin Key Results');
        }
    };

    const updateKR = (index, field, value) => {
        setEditKRData(prev => prev.map((kr, i) =>
            i === index ? { ...kr, [field]: value } : kr
        ));
    };

    const removeKR = (index) => {
        setEditKRData(prev => prev.filter((_, i) => i !== index));
    };

    const addNewKR = () => {
        setEditKRData(prev => [...prev, {
            kr_title: '',
            target_value: '',
            current_value: '',
            unit: 'Số lượng',
            status: 'active',
            weight: '',
            progress_percent: ''
        }]);
    };

    const removeKRFromServer = async (krId) => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch(`/objectives/${editForm.id}/key-results/${krId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            });

            if (res.ok) {
                // Reload objective data
                const objRes = await fetch(`/objectives/${editForm.id}`, {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'same-origin'
                });
                const objResult = await objRes.json();
                if (objResult.data) {
                    setEditKRData(objResult.data.key_results || []);
                }
                setConfirmKRId(null);
            } else {
                const errorText = await res.text();
                console.error('Delete KR error:', errorText);
                alert('Xóa Key Result không thành công: ' + res.status);
            }
        } catch (error) {
            console.error('Delete KR error:', error);
            alert('Xóa Key Result không thành công: ' + error.message);
        }
    };

    return (
        <div className={embedded ? "p-0" : "px-4 py-6"}>
            <div className="mx-auto mb-3 flex w-full max-w-6xl items-center justify-between">
                {!embedded && <h2 className="text-2xl font-extrabold text-slate-900">Mục tiêu</h2>}
                {!embedded && (
                    <div className="flex gap-2">
                        <button onClick={()=>setOpenCreate(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700">+ Tạo mục tiêu</button>
                    </div>
                )}
            </div>
            {error && <div className="mx-auto mb-3 w-full max-w-6xl rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-xs md:text-sm">
                    <thead className="bg-slate-50 text-left font-semibold text-slate-700">
                        <tr>
                            <th className="px-4 py-3">Mục tiêu</th>
                            <th className="px-4 py-3">Chu kỳ</th>
                            <th className="px-4 py-3">Tiến độ</th>
                            <th className="px-4 py-3">Trạng thái</th>
                            <th className="px-4 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading && (<tr><td colSpan={5} className="px-4 py-6 text-center text-slate-500">Đang tải...</td></tr>)}
                        {!loading && items.length === 0 && (<tr><td colSpan={5} className="px-4 py-6 text-center text-slate-500">Không có kết quả</td></tr>)}
                        {!loading && items.map(o => (
                            <tr key={o.objective_id} className="hover:bg-slate-50">
                                <td className="px-4 py-3">
                                    <div className="font-semibold text-slate-900">{o.objTitle || o.obj_title}</div>
                                    <div className="text-xs text-slate-500">Owner: {o.user?.full_name || '—'}</div>
                                </td>
                                <td className="px-4 py-3">{o.cycle?.name || '—'}</td>
                                <td className="px-4 py-3">
                                    <div className="mb-1 text-sm font-semibold text-slate-900">{Math.round(o.progress_percent || o.progress || 0)}%</div>
                                    <div className="h-2 w-32 rounded-full bg-slate-200">
                                        <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" style={{ width: `${Math.round(o.progress_percent || o.progress || 0)}%` }} />
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${o.status==='active'?'bg-blue-50 text-blue-700':o.status==='completed'?'bg-emerald-50 text-emerald-700':'bg-slate-100 text-slate-700'}`}>
                                        {o.status === 'active' ? 'Đang thực hiện' : o.status === 'completed' ? 'Hoàn thành' : 'Nháp'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2 justify-center">
                                        <button onClick={()=>openViewKRModal(o.objective_id)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold md:text-sm">Xem</button>
                                        <button onClick={()=>openEditModal(o.objective_id)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold md:text-sm">Sửa</button>
                                        <button onClick={()=>openAddKRModal(o.objective_id)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold md:text-sm">Thêm KR</button>
                                        <button onClick={()=>setConfirmId(o.objective_id)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 md:text-sm">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mx-auto mt-3 flex w-full max-w-6xl items-center justify-between text-sm text-slate-600">
                <button disabled={page<=1} onClick={()=>load(page-1)} className={`rounded-lg border px-3 py-1.5 ${page<=1? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-50'}`}>Trang trước</button>
                <div>Trang {page}/{lastPage}</div>
                <button disabled={page>=lastPage} onClick={()=>load(page+1)} className={`rounded-lg border px-3 py-1.5 ${page>=lastPage? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-50'}`}>Trang sau</button>
            </div>

            <Modal open={confirmId !== null} onClose={()=>setConfirmId(null)} title="Xác nhận xoá mục tiêu">
                <div className="space-y-4">
                    <p className="text-sm text-slate-700">Bạn có chắc muốn xoá mục tiêu này? Hành động này không thể hoàn tác.</p>
                    <div className="flex justify-end gap-2">
                        <button onClick={()=>setConfirmId(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button onClick={()=>removeObjective(confirmId)} className="rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Xóa</button>
                    </div>
                </div>
            </Modal>

            {/* Modal tạo mục tiêu nhanh */}
            <Modal open={openCreate} onClose={()=>setOpenCreate(false)} title="Tạo mục tiêu nhanh">
                <form onSubmit={async (e)=>{
                    e.preventDefault();
                    try {
                        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                        const res = await fetch('/objectives', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': token,
                                'Accept': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            body: JSON.stringify(createForm),
                            credentials: 'same-origin'
                        });

                        const result = await res.json();
                        if (result.success) {
                            setOpenCreate(false);
                            setCreateForm({ obj_title: '', description: '', level: 'Công ty', status: 'draft', progress_percent: '', cycle_id: null });
                            await load(page);
                        } else {
                            alert(result.message || 'Tạo mục tiêu không thành công');
                        }
                    } catch (error) {
                        alert('Tạo mục tiêu không thành công: ' + error.message);
                    }
                }} className="grid gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tiêu đề mục tiêu</label>
                        <input
                            value={createForm.obj_title}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setCreateForm(prev => ({ ...prev, obj_title: newValue }));
                            }}
                            required
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Tăng doanh thu 25%"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Mô tả</label>
                        <textarea
                            value={createForm.description}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setCreateForm(prev => ({ ...prev, description: newValue }));
                            }}
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                            rows="3"
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Cấp OKR</label>
                            <select
                                value={createForm.level}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setCreateForm(prev => ({ ...prev, level: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                            >
                                <option>Công ty</option>
                                <option>Phòng ban</option>
                                <option>Nhóm</option>
                                <option>Cá nhân</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                            <select
                                value={createForm.status}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setCreateForm(prev => ({ ...prev, status: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                            >
                                <option value="draft">Nháp</option>
                                <option value="active">Đang thực hiện</option>
                                <option value="completed">Hoàn thành</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tiến độ (%)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={createForm.progress_percent}
                            onChange={(e) => {
                                const newValue = e.target.value === '' ? '' : Number(e.target.value);
                                setCreateForm(prev => ({ ...prev, progress_percent: newValue }));
                            }}
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                        <button type="button" onClick={()=>setOpenCreate(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Tạo</button>
                    </div>
                </form>
            </Modal>

            {/* Modal sửa mục tiêu */}
            <Modal open={openEdit} onClose={()=>setOpenEdit(false)} title="Sửa mục tiêu">
                <div className="space-y-6">
                    {/* Form sửa thông tin mục tiêu */}
                    <form id="edit-form" onSubmit={async (e)=>{
                        e.preventDefault();
                        try {
                            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                            const res = await fetch(`/objectives/${editForm.id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRF-TOKEN': token,
                                    'Accept': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest'
                                },
                                body: JSON.stringify({
                                    _method: 'PUT',
                                    obj_title: editForm.obj_title,
                                    description: editForm.description,
                                    status: editForm.status,
                                    progress_percent: editForm.progress_percent,
                                    key_results: editKRData
                                }),
                                credentials: 'same-origin'
                            });

                            const result = await res.json();
                            if (result.success) {
                                setOpenEdit(false);
                                await load(page);
                            } else {
                                alert(result.message || 'Cập nhật mục tiêu không thành công');
                            }
                        } catch (error) {
                            alert('Cập nhật mục tiêu không thành công: ' + error.message);
                        }
                    }} className="grid gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Tiêu đề mục tiêu</label>
                            <input
                                value={editForm.obj_title}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setEditForm(prev => ({ ...prev, obj_title: newValue }));
                                }}
                                required
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ví dụ: Tăng doanh thu 25%"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Mô tả</label>
                            <textarea
                                value={editForm.description}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setEditForm(prev => ({ ...prev, description: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                                rows="3"
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                                <select
                                    value={editForm.status}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setEditForm(prev => ({ ...prev, status: newValue }));
                                    }}
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                                >
                                    <option value="draft">Nháp</option>
                                    <option value="active">Đang thực hiện</option>
                                    <option value="completed">Hoàn thành</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Tiến độ (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={editForm.progress_percent}
                                    onChange={(e) => {
                                        const newValue = e.target.value === '' ? '' : Number(e.target.value);
                                        setEditForm(prev => ({ ...prev, progress_percent: newValue }));
                                    }}
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Phần quản lý Key Results */}
                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-slate-900">Key Results ({editKRData.length})</h4>
                            <button
                                type="button"
                                onClick={addNewKR}
                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                            >
                                + Thêm KR
                            </button>
                        </div>

                        {editKRData.length > 0 ? (
                            <div className="space-y-4">
                                {editKRData.map((kr, index) => (
                                    <div key={index} className="rounded-lg border border-slate-200 p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <h5 className="font-medium text-slate-900">Key Result #{index + 1}</h5>
                                            <button
                                                type="button"
                                                onClick={() => kr.kr_id ? setConfirmKRId(kr.kr_id) : removeKR(index)}
                                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                                            >
                                                Xóa
                                            </button>
                                        </div>

                                        <div className="grid gap-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700">Tên Key Result</label>
                                                <input
                                                    value={kr.kr_title}
                                                    onChange={(e) => updateKR(index, 'kr_title', e.target.value)}
                                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Ví dụ: Tăng số lượng khách hàng"
                                                />
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-slate-700">Giá trị mục tiêu</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={kr.target_value}
                                                        onChange={(e) => updateKR(index, 'target_value', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="100"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-slate-700">Giá trị hiện tại</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={kr.current_value}
                                                        onChange={(e) => updateKR(index, 'current_value', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-3">
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-slate-700">Đơn vị</label>
                                                    <select
                                                        value={kr.unit}
                                                        onChange={(e) => updateKR(index, 'unit', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
                                                    >
                                                        <option value="Số lượng">Số lượng</option>
                                                        <option value="Phần trăm">Phần trăm</option>
                                                        <option value="Triệu VND">Triệu VND</option>
                                                        <option value="Người">Người</option>
                                                        <option value="Dự án">Dự án</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                                                    <select
                                                        value={kr.status}
                                                        onChange={(e) => updateKR(index, 'status', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none"
                                                    >
                                                        <option value="active">Đang thực hiện</option>
                                                        <option value="completed">Hoàn thành</option>
                                                        <option value="paused">Tạm dừng</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-slate-700">Trọng số (%)</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={kr.weight}
                                                        onChange={(e) => updateKR(index, 'weight', e.target.value)}
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="25"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p>Chưa có Key Results nào</p>
                                <button
                                    type="button"
                                    onClick={addNewKR}
                                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Thêm Key Result đầu tiên
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <button type="button" onClick={()=>setOpenEdit(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" form="edit-form" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Cập nhật</button>
                    </div>
                </div>
            </Modal>

            {/* Modal thêm Key Result */}
            <Modal open={openAddKR} onClose={()=>setOpenAddKR(false)} title="Thêm Key Result">
                <form onSubmit={async (e)=>{
                    e.preventDefault();
                    try {
                        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                        const res = await fetch(`/objectives/${krForm.objective_id}/key-results`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': token,
                                'Accept': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            body: JSON.stringify({
                                kr_title: krForm.kr_title,
                                target_value: Number(krForm.target_value),
                                current_value: Number(krForm.current_value) || 0,
                                unit: krForm.unit,
                                status: krForm.status,
                                weight: Number(krForm.weight) || 0,
                                progress_percent: Number(krForm.progress_percent) || 0
                            }),
                            credentials: 'same-origin'
                        });

                        const result = await res.json();
                        if (result.success) {
                            setOpenAddKR(false);
                            await load(page);
                        } else {
                            alert(result.message || 'Thêm Key Result không thành công');
                        }
                    } catch (error) {
                        alert('Thêm Key Result không thành công: ' + error.message);
                    }
                }} className="grid gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tên Key Result</label>
                        <input
                            value={krForm.kr_title || ''}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setKrForm(prev => ({ ...prev, kr_title: newValue }));
                            }}
                            required
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Tăng số lượng khách hàng"
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Giá trị mục tiêu</label>
                            <input
                                type="number"
                                min="0"
                                value={krForm.target_value || ''}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setKrForm(prev => ({ ...prev, target_value: newValue }));
                                }}
                                required
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="100"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Giá trị hiện tại</label>
                            <input
                                type="number"
                                min="0"
                                value={krForm.current_value}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setKrForm(prev => ({ ...prev, current_value: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Đơn vị</label>
                            <select
                                value={krForm.unit}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setKrForm(prev => ({ ...prev, unit: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                            >
                                <option value="Số lượng">Số lượng</option>
                                <option value="Phần trăm">Phần trăm</option>
                                <option value="Triệu VND">Triệu VND</option>
                                <option value="Người">Người</option>
                                <option value="Dự án">Dự án</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Trạng thái</label>
                            <select
                                value={krForm.status}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setKrForm(prev => ({ ...prev, status: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
                            >
                                <option value="active">Đang thực hiện</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="paused">Tạm dừng</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Trọng số (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={krForm.weight}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setKrForm(prev => ({ ...prev, weight: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="25"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Tiến độ (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={krForm.progress_percent}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setKrForm(prev => ({ ...prev, progress_percent: newValue }));
                                }}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                        <button type="button" onClick={()=>setOpenAddKR(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Thêm</button>
                    </div>
                </form>
            </Modal>

            {/* Modal xem Key Results */}
            <Modal open={openViewKR} onClose={()=>setOpenViewKR(false)} title="Chi tiết mục tiêu">
                <div className="space-y-4">
                    {viewKRData.objective && (
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{viewKRData.objective.obj_title}</h3>
                            <p className="text-sm text-slate-600 mb-2">{viewKRData.objective.description || 'Không có mô tả'}</p>
                            <div className="flex gap-4 text-sm">
                                <span className="text-slate-500">Cấp: <span className="font-medium text-slate-700">{viewKRData.objective.level}</span></span>
                                <span className="text-slate-500">Trạng thái: <span className="font-medium text-slate-700">{viewKRData.objective.status === 'active' ? 'Đang thực hiện' : viewKRData.objective.status === 'completed' ? 'Hoàn thành' : 'Nháp'}</span></span>
                                <span className="text-slate-500">Tiến độ: <span className="font-medium text-slate-700">{viewKRData.objective.progress_percent}%</span></span>
                            </div>
                        </div>
                    )}

                    <div>
                        <h4 className="text-md font-semibold text-slate-900 mb-3">Key Results ({viewKRData.keyResults.length})</h4>
                        {viewKRData.keyResults.length > 0 ? (
                            <div className="space-y-3">
                                {viewKRData.keyResults.map((kr, index) => (
                                    <div key={kr.kr_id || index} className="rounded-lg border border-slate-200 p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h5 className="font-medium text-slate-900">{kr.kr_title}</h5>
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                kr.status === 'active' ? 'bg-blue-50 text-blue-700' :
                                                kr.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                                {kr.status === 'active' ? 'Đang thực hiện' : kr.status === 'completed' ? 'Hoàn thành' : kr.status === 'paused' ? 'Tạm dừng' : 'Đang thực hiện'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-2">
                                            <div>Mục tiêu: <span className="font-medium">{kr.target_value} {kr.unit}</span></div>
                                            <div>Hiện tại: <span className="font-medium">{kr.current_value || 0} {kr.unit}</span></div>
                                            <div>Trọng số: <span className="font-medium">{kr.weight || 0}%</span></div>
                                            <div>Tiến độ: <span className="font-medium">{kr.progress_percent || 0}%</span></div>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${Math.min(kr.progress_percent || 0, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p>Chưa có Key Results nào</p>
                                <button
                                    onClick={() => {
                                        setOpenViewKR(false);
                                        openAddKRModal(viewKRData.objective?.objective_id);
                                    }}
                                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Thêm Key Result đầu tiên
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            {/* Modal xác nhận xóa Key Result */}
            <Modal open={confirmKRId !== null} onClose={()=>setConfirmKRId(null)} title="Xác nhận xóa Key Result">
                <div className="space-y-4">
                    <p className="text-sm text-slate-700">Bạn có chắc muốn xóa Key Result này? Hành động này không thể hoàn tác.</p>
                    <div className="flex justify-end gap-2">
                        <button onClick={()=>setConfirmKRId(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button onClick={()=>removeKRFromServer(confirmKRId)} className="rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Xóa</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ id: null, d_name: '', d_description: '' });
    const [viewOpen, setViewOpen] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [viewError, setViewError] = useState('');

    const load = async () => {
        try {
            const res = await fetch('/departments', { headers: { 'Accept': 'application/json' }, credentials: 'same-origin' });
            if (!res.ok) throw new Error();
            const json = await res.json();
            setDepartments(Array.isArray(json.data) ? json.data : []);
        } catch {
            setError('Không thể tải danh sách phòng ban');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const url = form.id ? `/departments/${form.id}` : '/departments';
            // Dùng POST + _method để tránh các cấu hình chặn PUT/PATCH
            const body = new FormData();
            body.append('_token', token);
            if (form.id) body.append('_method', 'PUT');
            body.append('d_name', form.d_name);
            body.append('d_description', form.d_description || '');
            const res = await fetch(url, { method: 'POST', headers: { 'Accept': 'application/json' }, body, credentials: 'same-origin' });
            if (!res.ok) throw new Error();
            await load();
            setOpen(false);
            setForm({ id: null, d_name: '', d_description: '' });
        } catch {
            alert('Lưu không thành công');
        }
    };

    const openView = async (id) => {
        try {
            setViewError('');
            setViewData(null);
            setViewOpen(true);
            const res = await fetch(`/departments/${id}`, { headers: { 'Accept': 'application/json' }, credentials: 'same-origin' });
            if (!res.ok) throw new Error('Không tải được dữ liệu');
            const text = await res.text();
            // Một số server trả về text; thử parse an toàn
            const json = JSON.parse(text);
            setViewData(json?.data || null);
        } catch (e) {
            setViewError('Không thể tải chi tiết phòng ban');
        }
    };

    const [confirmId, setConfirmId] = useState(null);
    const removeDepartment = async (id) => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const form = new FormData();
            form.append('_token', token);
            form.append('_method', 'DELETE');
            const res = await fetch(`/departments/${id}`, { method: 'POST', headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }, body: form, credentials: 'same-origin' });
            const text = await res.text();
            let data = { success: false };
            try { data = JSON.parse(text); } catch (_) {}
            if (!res.ok || data.success !== true) throw new Error(data.message || '');
            setConfirmId(null);
            await load();
        } catch (e) {
            alert('Xóa không thành công');
        }
    };

    return (
        <div className="px-4 py-6">
            <div className="mx-auto mb-3 flex w-full max-w-6xl items-center justify-between">
                <h2 className="text-2xl font-extrabold text-slate-900">Danh sách phòng ban</h2>
                <button onClick={()=>{ setForm({ id:null, d_name:'', d_description:''}); setOpen(true); }} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700">Tạo mới</button>
            </div>
            {error && <div className="mx-auto mb-3 w-full max-w-6xl rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-xs md:text-sm">
                    <thead className="bg-slate-50 text-left font-semibold text-slate-700">
                        <tr>
                            <th className="px-3 py-2">Tên phòng ban</th>
                            <th className="px-3 py-2">Mô tả</th>
                            <th className="px-3 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading && (<tr><td colSpan={3} className="px-3 py-5 text-center text-slate-500">Đang tải...</td></tr>)}
                        {!loading && departments.length === 0 && (
                            <tr><td colSpan={3} className="px-3 py-5 text-center text-slate-500">Không có kết quả</td></tr>
                        )}
                        {!loading && departments.map(d => (
                            <tr key={d.department_id} className="hover:bg-slate-50">
                                <td className="px-3 py-2 font-semibold text-slate-900">{d.d_name}</td>
                                <td className="px-3 py-2 text-slate-600">{d.d_description || '—'}</td>
                                <td className="px-3 py-2">
                                    <div className="flex gap-2">
                                        <button onClick={()=>{ setForm({ id:d.department_id, d_name:d.d_name||'', d_description:d.d_description||''}); setOpen(true); }} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold md:text-sm">Sửa</button>
                                        <button onClick={()=>setConfirmId(d.department_id)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 md:text-sm">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal open={open} onClose={()=>setOpen(false)} title={form.id ? 'Cập nhật phòng ban' : 'Tạo phòng ban'}>
                <form onSubmit={submit} className="grid gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Tên phòng ban</label>
                        <input value={form.d_name} onChange={(e)=>setForm(f=>({ ...f, d_name: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Mô tả</label>
                        <textarea value={form.d_description} onChange={(e)=>setForm(f=>({ ...f, d_description: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none" rows="4" />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={()=>setOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Lưu</button>
                    </div>
                </form>
            </Modal>

    <Modal open={viewOpen} onClose={()=>setViewOpen(false)} title="Chi tiết phòng ban">
        {viewError ? (
            <div className="text-rose-600">{viewError}</div>
        ) : viewData ? (
            <div className="space-y-2">
                <div>
                    <div className="text-sm font-semibold text-slate-500">Tên phòng ban</div>
                    <div className="text-slate-800">{viewData.d_name}</div>
                </div>
                <div>
                    <div className="text-sm font-semibold text-slate-500">Mô tả</div>
                    <div className="text-slate-700">{viewData.d_description || 'Không có mô tả'}</div>
                </div>
            </div>
        ) : (
            <div className="text-slate-500">Đang tải...</div>
        )}
    </Modal>

    <Modal open={confirmId !== null} onClose={()=>setConfirmId(null)} title="Xác nhận xoá">
        <div className="space-y-4">
            <p className="text-sm text-slate-700">Bạn có chắc muốn xoá phòng ban này? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end gap-2">
                <button onClick={()=>setConfirmId(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Hủy</button>
                <button onClick={()=>removeDepartment(confirmId)} className="rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95">Xóa</button>
            </div>
        </div>
    </Modal>
        </div>
    );
}


// Cycle Detail Component
function CycleDetailPage() {
    const [cycle, setCycle] = useState(null);
    const [objectives, setObjectives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCreateObjective, setOpenCreateObjective] = useState(false);
    const [expandedObjectives, setExpandedObjectives] = useState(new Set());

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const cycleId = pathParts[pathParts.length - 2]; // /cycles/{id}/detail

        const fetchCycleDetail = async () => {
            try {
                const res = await fetch(`/cycles/${cycleId}/detail`, {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'same-origin'
                });
                const result = await res.json();
                if (result.success) {
                    setCycle(result.data.cycle);
                    setObjectives(result.data.objectives);
                }
            } catch (error) {
                console.error('Error fetching cycle detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCycleDetail();
    }, []);

    const toggleObjective = (objectiveId) => {
        setExpandedObjectives(prev => {
            const newSet = new Set(prev);
            if (newSet.has(objectiveId)) {
                newSet.delete(objectiveId);
            } else {
                newSet.add(objectiveId);
            }
            return newSet;
        });
    };

    const handleKeyResultClick = (krId, objectiveId) => {
        // Navigate to Key Result detail page
        window.location.href = `/objectives/${objectiveId}/key-results/${krId}`;
    };

    if (loading) {
        return (
            <div className="px-4 py-6">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="text-center py-8 text-slate-500">Đang tải...</div>
                </div>
            </div>
        );
    }

    if (!cycle) {
        return (
            <div className="px-4 py-6">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="text-center py-8 text-slate-500">Không tìm thấy chu kỳ</div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6">
            <div className="mx-auto w-full max-w-4xl">
                {/* Cycle Header */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-slate-900">{cycle.cycle_name}</h1>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            cycle.status === 'active'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {cycle.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                        <div>Ngày bắt đầu: {cycle.start_date}</div>
                        <div>Ngày kết thúc: {cycle.end_date}</div>
                        <div>Mô tả: {cycle.description || 'Không có mô tả'}</div>
                    </div>
                </div>

                {/* Add Objective Button */}
                <div className="text-center mb-6">
                    <button
                        onClick={() => setOpenCreateObjective(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Thêm Objective
                    </button>
                </div>

                {/* Objectives List */}
                <div className="space-y-4">
                    {objectives.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">Chưa có objective nào</div>
                    ) : (
                        objectives.map((objective) => (
                            <div key={objective.objective_id} className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div
                                        className="flex items-center gap-3 cursor-pointer flex-1"
                                        onClick={() => toggleObjective(objective.objective_id)}
                                    >
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {objective.obj_title?.charAt(0) || 'O'}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{objective.obj_title}</h3>
                                            <p className="text-sm text-slate-500">{objective.description || 'Không có mô tả'}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <svg
                                                className={`w-5 h-5 text-slate-400 transition-transform ${
                                                    expandedObjectives.has(objective.objective_id) ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors ml-3">
                                        Thêm Key Result
                                    </button>
                                </div>

                                {/* Key Results - Show when expanded */}
                                {expandedObjectives.has(objective.objective_id) && objective.key_results && objective.key_results.length > 0 && (
                                    <div className="ml-11 space-y-2">
                                        {objective.key_results.map((kr) => (
                                            <div
                                                key={kr.kr_id}
                                                className="bg-white border border-slate-200 rounded-lg p-3 cursor-pointer hover:bg-slate-50 transition-colors"
                                                onClick={() => handleKeyResultClick(kr.kr_id, objective.objective_id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-slate-900">{kr.kr_title}</h4>
                                                        <p className="text-sm text-slate-500">{kr.status || 'In progress'}</p>
                                                    </div>
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Show message if no Key Results */}
                                {expandedObjectives.has(objective.objective_id) && (!objective.key_results || objective.key_results.length === 0) && (
                                    <div className="ml-11 text-sm text-slate-500 py-2">
                                        Chưa có Key Result nào
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// Hook UsersPage into SPA routing
function App() {
    const initialTab = useMemo(() => {
        const p = window.location.pathname;
        if (p.startsWith('/dashboard') || p.startsWith('/users') || p.startsWith('/cycles') || p.startsWith('/departments') || p.startsWith('/objectives')) return 'dashboard';
        if (window.location.hash === '#features') return 'features';
        if (window.location.hash === '#pricing') return 'pricing';
        return 'home';
    }, []);
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        if (activeTab === 'features' || activeTab === 'pricing') {
            const id = activeTab;
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
        } else if (activeTab === 'home') {
            window.history.pushState({}, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {activeTab !== 'dashboard' && <NavBar activeTab={activeTab} onChangeTab={setActiveTab} />}
            <main>
                {activeTab !== 'dashboard' && (
                    <>
                        <Hero onShowFeatures={() => setActiveTab('features')} />
                        {activeTab === 'features' && <Features />}
                        {activeTab === 'pricing' && <Pricing />}
                    </>
                )}
                {activeTab === 'dashboard' && !window.location.pathname.startsWith('/objectives') && !window.location.pathname.includes('/cycles/') && <Dashboard />}
                {window.location.pathname.startsWith('/objectives') ? (
                    <ObjectivesPage />
                ) : null}
                {window.location.pathname.includes('/cycles/') && window.location.pathname.includes('/detail') ? (
                    <CycleDetailPage />
                ) : null}
            </main>
            {activeTab !== 'dashboard' && <Footer />}
        </div>
    );
}

const mountEl = document.getElementById('app');
if (mountEl) {
    const root = createRoot(mountEl);
    root.render(<App />);
}


