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
                <SidebarItem collapsed={collapsed} href="/cycles" label="Chu kỳ" icon={(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6V2l6 6-6 6V10C7.03 10 3 14.03 3 19c0 1.05.17 2.06.49 3.01C2.02 20.54 1 17.89 1 15c0-5.52 4.48-10 10-10z"/></svg>)} />
                {/* Mục tiêu */}
                <SidebarItem collapsed={collapsed} href="/objectives" label="Mục tiêu" icon={(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a5 5 0 015 5h2a7 7 0 10-7 7v-2a5 5 0 115-5h-2a3 3 0 11-3-3V7z"/></svg>)} />
                {/* Phòng ban */}
                <SidebarItem collapsed={collapsed} href="/departments" label="Phòng ban" icon={(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v2H3V4zm2 4h14v12H5V8zm4 2v8h6v-8H9z"/></svg>)} />
                {/* Quản lý người dùng */}
                <a href="#" onClick={(e)=>{ e.preventDefault(); window.history.pushState({}, '', '/dashboard'); const ev = new Event('open-users-panel'); window.dispatchEvent(ev); }} className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 ${collapsed ? 'justify-center' : ''}`}>
                    <span className="inline-flex h-6 w-6 items-center justify-center text-slate-500 group-hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13z"/></svg></span>
                    {!collapsed && <span className="truncate">Quản lý người dùng</span>}
                </a>
            </nav>
        </aside>
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
    const [panel, setPanel] = useState('home'); // 'home' | 'profile' | 'password' | 'users' | 'cycles'

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
        const handler = () => setPanel('users');
        window.addEventListener('open-users-panel', handler);
        return () => window.removeEventListener('open-users-panel', handler);
    }, []);

    useEffect(() => {
        if (window.location.pathname.startsWith('/users')) {
            setPanel('users');
        }
        if (window.location.pathname.startsWith('/cycles')) {
            setPanel('cycles');
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
                    {panel==='profile' && (
                        <ProfileSettings user={user} activeTab={panel} />
                    )}
                    {panel==='password' && (
                        <ProfileSettings user={user} activeTab={panel} />
                    )}
                    {panel==='users' && (
                        <UsersPage />
                    )}
                    {panel==='cycles' && (
                        <CyclesPanel />
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

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [toast, setToast] = useState({ type: 'success', message: '' });
    const showToast = (type, message) => setToast({ type, message });
    const [editingRole, setEditingRole] = useState({}); // { [userId]: true }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/users', { headers: { 'Accept': 'application/json' } });
                const data = await res.json();
                setUsers(data.data || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filtered = users.filter(u => {
        const needle = q.toLowerCase();
        const matchesQ = !needle || (u.full_name?.toLowerCase().includes(needle) || u.email?.toLowerCase().includes(needle));
        const matchesRole = !role || (u.role?.role_name?.toLowerCase() === role);
        const matchesStatus = !status || (u.status?.toLowerCase() === status);
        return matchesQ && matchesRole && matchesStatus;
    });

    return (
        <div className="">
            <Toast type={toast.type} message={toast.message} onClose={()=>setToast({ type:'success', message:'' })} />
            <div className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="text-2xl font-extrabold text-slate-900">Quản lý người dùng</h1>
                <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm kiếm theo tên hoặc email..." className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 md:w-2/3" />
                    <div className="flex gap-2">
                        <Select value={role} onChange={setRole} placeholder="Tất cả vai trò" options={[{value:'admin',label:'Admin'},{value:'manager',label:'Manager'},{value:'member',label:'Member'}]} />
                        <Select value={status} onChange={setStatus} placeholder="Tất cả trạng thái" options={[{value:'active',label:'Kích hoạt'},{value:'inactive',label:'Vô hiệu'}]} />
                    </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 text-xs md:text-sm">
                        <thead className="bg-slate-50 text-left font-semibold text-slate-700">
                            <tr>
                                <th className="px-3 py-2">Người dùng</th>
                                <th className="px-3 py-2">Email</th>
                                <th className="px-3 py-2">Vai trò</th>
                                <th className="px-3 py-2">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && (
                                <tr><td colSpan={4} className="px-3 py-5 text-center text-slate-500">Đang tải...</td></tr>
                            )}
                            {!loading && filtered.length === 0 && (
                                <tr><td colSpan={4} className="px-3 py-5 text-center text-slate-500">Không có người dùng</td></tr>
                            )}
                            {!loading && filtered.map(u => {
                                const rname = (u.role?.role_name || '').toLowerCase();
                                const isAdmin = rname === 'admin' || u.email === 'okr.admin@company.com';
                                const onChangeRole = async (val) => {
                                    try {
                                        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                                        // Map role name to role_id: assume API accepts role (name). Provide fallback by name.
                                        const body = { role: val };
                                        const res = await fetch(`/users/${u.user_id}`, { method:'PUT', headers:{ 'Content-Type':'application/json','X-CSRF-TOKEN':token,'Accept':'application/json' }, body: JSON.stringify(body) });
                                        if (!res.ok) throw new Error();
                                        setUsers(prev=>prev.map(x=>x.user_id===u.user_id?{...x, role:{...(x.role||{}), role_name: val}}:x));
                                        showToast('success','Cập nhật vai trò thành công');
                                    } catch(e){ showToast('error','Cập nhật vai trò thất bại'); }
                                };
                                const toggleStatus = async () => {
                                    try {
                                        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                                        const ns = u.status === 'active' ? 'inactive' : 'active';
                                        const res = await fetch(`/users/${u.user_id}/status`, { method:'PUT', headers:{ 'Content-Type':'application/json','X-CSRF-TOKEN':token,'Accept':'application/json' }, body: JSON.stringify({ status: ns }) });
                                        if (!res.ok) throw new Error();
                                        setUsers(prev=>prev.map(x=>x.user_id===u.user_id?{...x,status:ns}:x));
                                        showToast('success','Cập nhật trạng thái thành công');
                                    } catch(e){ showToast('error','Cập nhật trạng thái thất bại'); }
                                };
    return (
                                <tr key={u.user_id} className="hover:bg-slate-50">
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-3">
                                            <img src={u.avatar_url || '/images/default.png'} className="h-8 w-8 rounded-full object-cover" />
                                            <div>
                                                <div className="font-semibold text-slate-900">{u.full_name || 'Chưa cập nhật'}</div>
                                                <div className="text-xs text-slate-500">ID: {u.user_id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-slate-700">{u.email}</td>
                                    <td className="px-3 py-2">
                                        {isAdmin ? (
                                            <Badge color="indigo">ADMIN</Badge>
                                        ) : (
                                            editingRole[u.user_id] ? (
                                                <Select value={rname} onChange={async (val)=>{ await onChangeRole(val); setEditingRole(prev=>({ ...prev, [u.user_id]: false })); }} placeholder="Chọn vai trò" options={[{value:'manager',label:'Manager'},{value:'member',label:'Member'}]} />
                                            ) : (
                                                <button onClick={()=>setEditingRole(prev=>({ ...prev, [u.user_id]: true }))} className="focus:outline-none">
                                                    {rname === 'member' ? <Badge color="amber">MEMBER</Badge> : <Badge color="blue">MANAGER</Badge>}
                                                </button>
                                            )
                                        )}
                                    </td>
                                    <td className="px-3 py-2">
                                        {isAdmin ? (
                                            <Badge color="emerald">KÍCH HOẠT</Badge>
                                        ) : (
                                            <button onClick={toggleStatus} className={`rounded-full px-3 py-1 text-xs font-semibold ${u.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {u.status === 'active' ? 'KÍCH HOẠT' : 'VÔ HIỆU'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function NewCycleModal({ open, onClose, onCreated }) {
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [status, setStatus] = useState('active');
    const [desc, setDesc] = useState('');
    const [toast, setToast] = useState({ type: 'success', message: '' });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch('/cycles', { method:'POST', headers:{ 'Content-Type':'application/json','X-CSRF-TOKEN':token,'Accept':'application/json' }, body: JSON.stringify({ cycle_name: name, start_date: start, end_date: end, status, description: desc }) });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || 'Tạo chu kỳ thất bại');
            setToast({ type:'success', message:data.message || 'Tạo chu kỳ thành công!' });
            onCreated && onCreated(data.data);
            onClose();
        } catch (e) {
            setToast({ type:'error', message: e.message || 'Tạo chu kỳ thất bại' });
        }
    };

    if (!open) return null;
    return (
        <Modal open={open} onClose={onClose} title="Tạo chu kỳ mới">
            <Toast type={toast.type} message={toast.message} onClose={()=>setToast({type:'success',message:''})} />
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">Tên chu kỳ</label>
                    <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Ngày bắt đầu</label>
                        <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Ngày kết thúc</label>
                        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Trạng thái</label>
                        <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Mô tả</label>
                        <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="h-20 w-full rounded-2xl border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={onClose} className="rounded-2xl border border-slate-300 px-5 py-2 text-sm">Hủy</button>
                    <button type="submit" className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow">Lưu</button>
                </div>
            </form>
        </Modal>
    );
}

function CyclesPanel() {
    const [cycles, setCycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const load = async () => {
        try {
            const res = await fetch('/cycles', { headers: { 'Accept': 'application/json' } });
            const data = await res.json();
            setCycles(data.data || []);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    return (
        <div className="px-4 py-6">
            <div className="mx-auto mb-3 flex w-full max-w-4xl items-center justify-between">
                <h2 className="text-2xl font-extrabold text-slate-900">Danh sách chu kỳ</h2>
                <button onClick={()=>setOpen(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700">Tạo mới</button>
            </div>
            <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-xs md:text-sm">
                    <thead className="bg-slate-50 text-left font-semibold text-slate-700">
                        <tr>
                            <th className="px-3 py-2">Tên chu kỳ</th>
                            <th className="px-3 py-2">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading && (<tr><td colSpan={2} className="px-3 py-5 text-center text-slate-500">Đang tải...</td></tr>)}
                        {!loading && cycles.map(c => (
                            <tr key={c.id} className="hover:bg-slate-50">
                                <td className="px-3 py-2 font-semibold text-slate-900">
                                    <a href={`/cycles/${c.id}/detail`} className="text-blue-600 hover:underline">{c.cycle_name}</a>
                                </td>
                                <td className="px-3 py-2">{c.status === 'active' ? <Badge color="emerald">Active</Badge> : <Badge color="red">Inactive</Badge>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <NewCycleModal open={open} onClose={()=>setOpen(false)} onCreated={(cy)=>{ setCycles([cy, ...cycles]); }} />
        </div>
    );
}

// Hook UsersPage into SPA routing
function App() {
    const initialTab = useMemo(() => {
        const p = window.location.pathname;
        if (p.startsWith('/dashboard') || p.startsWith('/users') || p.startsWith('/cycles')) return 'dashboard';
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
                {activeTab === 'dashboard' && <Dashboard />}
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


