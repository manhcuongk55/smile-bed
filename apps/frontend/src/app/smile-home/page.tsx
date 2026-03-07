'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import './smile-home.css';

/* ── DATA ── */
const MEMBERS = [
    { name: 'Minh', emoji: '🧑', status: 'online', bg: '#fff3e0', role: 'Walker', pts: 240 },
    { name: 'Lan', emoji: '👩', status: 'online', bg: '#f0fff4', role: 'Hub', pts: 185 },
    { name: 'Nam', emoji: '🧔', status: 'away', bg: '#eff6ff', role: 'Commuter', pts: 310 },
    { name: 'Hà', emoji: '👧', status: 'offline', bg: '#f5f3ff', role: 'Offline từ 1h trước', pts: 95 },
    { name: 'Tú', emoji: '👦', status: 'online', bg: '#fff0f6', role: 'Walker', pts: 128 },
];

const INITIAL_CHORES = [
    { id: 'c1', name: '🧹 Quét phòng khách', assignee: 'Minh', emoji: '🧑', bg: '#fff3e0', time: 'Trước 10h sáng', pts: 20, done: false },
    { id: 'c2', name: '🚽 Dọn nhà vệ sinh', assignee: 'Lan', emoji: '👩', bg: '#f0fff4', time: 'Hoàn thành 7h30', pts: 25, done: true },
    { id: 'c3', name: '🗑️ Đổ rác ca chiều', assignee: 'Hà (vắng)', emoji: '👧', bg: '#f5f3ff', time: '17h', pts: 35, done: false, urgent: true },
    { id: 'c4', name: '🍳 Rửa chén sau bữa sáng', assignee: 'Nam', emoji: '🧔', bg: '#eff6ff', time: 'Hoàn thành 8h15', pts: 15, done: true },
    { id: 'c5', name: '💡 Kiểm tra điện tháng 6', assignee: 'Tú', emoji: '👦', bg: '#fff0f6', time: 'Cuối tuần', pts: 30, done: false },
];

const INITIAL_ORDERS = [
    { id: 'o1', icon: '🥖', name: 'Bánh mì Phượng', badge: 'Còn 2 slot', badgeType: 'open', meta: '👥 3 người · Ship 6k · 8 phút nữa', joined: false },
    { id: 'o2', icon: '🍜', name: 'Phở bò Cầu Giấy', badge: 'Đã vào', badgeType: 'joined', meta: '👥 4 người · Ship 6k · Giao 7h30', joined: true },
    { id: 'o3', icon: '☕', name: 'Cà phê G7 + trà đá', badge: 'Mới tạo', badgeType: 'open', meta: '👥 1 người · Cần 3+ · Ship 5k', joined: false },
    { id: 'o4', icon: '🍱', name: 'Cơm gà xối mỡ', badge: 'Hot 🔥', badgeType: 'open', meta: '👥 6 người · Trưa 11h30 · Ship 6k', joined: false },
];

const HOME_ANNOUNCES = [
    { type: 'good', icon: '✅', title: 'Đặt chung bánh mì sáng: 4/5 người', time: '8 phút', body: 'Đơn sắp chốt! Còn 1 slot. Ship 6k, chia đều. Minh là walker hôm nay.', reactions: [{ emoji: '😋', count: 4, reacted: true }, { emoji: '🔥', count: 2, reacted: false }] },
    { type: 'info', icon: '🏆', title: 'Nam vừa đạt 300 điểm Smile!', time: '32 phút', body: 'Chúc mừng Nam lên Hạng Vàng 🥇 Nhận thưởng 20k Smile Cash!', reactions: [{ emoji: '🎉', count: 5, reacted: true }, { emoji: '👏', count: 3, reacted: false }, { emoji: '❤️', count: 2, reacted: false }] },
    { type: 'urgent', icon: '⚡', title: 'Hôm nay ai đổ rác ca chiều?', time: '1 giờ', body: 'Theo lịch là Hà nhưng bạn đang vắng. Ai làm thế được cộng 15 điểm thưởng!', reactions: [{ emoji: '😅', count: 3, reacted: false }] },
];

const BOARD_ANNOUNCES = [
    { type: 'good', icon: '🎉', title: 'Smile Home tặng quỹ 50k!', time: 'Hôm nay', body: 'Vì nhà trọ bạn hoàn thành 100% việc nhà tuần trước. Tiền đã vào quỹ chung!', reactions: [{ emoji: '🎉', count: 5, reacted: true }, { emoji: '❤️', count: 4, reacted: false }, { emoji: '😍', count: 2, reacted: false }] },
    { type: 'urgent', icon: '🔧', title: 'Vòi nước bếp bị rỉ nhẹ', time: '2 giờ', body: 'Minh báo vòi bếp rỉ nước chỗ gioăng. Ai biết sửa không? Hoặc đặt thợ qua Smile sửa giá 80k.', reactions: [{ emoji: '🔧', count: 1, reacted: false }] },
    { type: 'info', icon: '📦', title: 'Nhận 3 gói hàng tại hub', time: 'Hôm qua', body: 'Lan nhận hộ 3 đơn Shopee, để ở tủ lạnh nhỏ. Tú, Nam, Minh check nhé!', reactions: [{ emoji: '👍', count: 3, reacted: true }, { emoji: '🙏', count: 2, reacted: false }] },
    { type: '', icon: '🌙', title: 'Reminder: Khóa cổng sau 22h', time: 'Hôm qua', body: 'Hàng xóm phản ánh tiếng ồn. Mọi người về sau 22h nhớ nhẹ nhàng nhé 🙏', reactions: [{ emoji: '👍', count: 4, reacted: true }, { emoji: '😌', count: 2, reacted: false }] },
];

const REWARDS = [
    { icon: '🚀', title: 'Giảm 10k ship', desc: 'Dùng cho đơn tiếp theo', cost: 100 },
    { icon: '💰', title: '+20k quỹ chung', desc: 'Đóng góp từ điểm', cost: 150 },
    { icon: '🎟️', title: 'Free 1 lần ship', desc: 'Relay miễn phí', cost: 200 },
    { icon: '⚡', title: 'Ưu tiên đặt chung', desc: 'Slot đầu tiên', cost: 80 },
];

/* ── COMPONENT ── */
export default function SmileHomePage() {
    const [activeTab, setActiveTab] = useState('home');
    const [fundAmount, setFundAmount] = useState(485);
    const [showModal, setShowModal] = useState(false);
    const [selectedContrib, setSelectedContrib] = useState(100000);
    const [customAmount, setCustomAmount] = useState('');
    const [toast, setToast] = useState({ show: false, text: '' });
    const [chores, setChores] = useState(INITIAL_CHORES);
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [myPoints, setMyPoints] = useState(185);
    const [homeReactions, setHomeReactions] = useState(HOME_ANNOUNCES.map(a => a.reactions.map(r => ({ ...r }))));
    const [boardReactions, setBoardReactions] = useState(BOARD_ANNOUNCES.map(a => a.reactions.map(r => ({ ...r }))));
    const [claimedTrash, setClaimedTrash] = useState(false);
    const [joinedBanhMi, setJoinedBanhMi] = useState(false);
    const [earnTasksDone, setEarnTasksDone] = useState<Set<string>>(new Set());
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confRef = useRef<{ particles: any[]; frame: number | null }>({ particles: [], frame: null });

    /* Toast */
    const showToast = useCallback((msg: string) => {
        setToast({ show: true, text: msg });
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast({ show: false, text: msg }), 3000);
    }, []);

    /* Confetti */
    const triggerConfetti = useCallback((mini = false) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const count = mini ? 40 : 80;
        const colors = ['#ff6b35', '#ffd60a', '#06d6a0', '#4361ee', '#f72585', '#fff'];
        const particles: any[] = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width, y: -10,
                w: 6 + Math.random() * 8, h: 4 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4,
                rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 8, life: 1,
            });
        }
        confRef.current.particles = particles;
        if (confRef.current.frame) cancelAnimationFrame(confRef.current.frame);
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confRef.current.particles = confRef.current.particles.filter(p => p.life > 0);
            confRef.current.particles.forEach(p => {
                p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.life -= 0.015;
                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (confRef.current.particles.length > 0)
                confRef.current.frame = requestAnimationFrame(animate);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        animate();
    }, []);

    /* Coin fly */
    const spawnCoinFly = useCallback(() => {
        const coins = ['💰', '🪙', '⭐', '✨'];
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.className = 'sh-coin-fly';
                el.textContent = coins[Math.floor(Math.random() * coins.length)];
                el.style.left = (30 + Math.random() * 60) + '%';
                el.style.top = (40 + Math.random() * 20) + '%';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 800);
            }, i * 120);
        }
    }, []);

    /* Tab switching */
    const tabs = [
        { key: 'home', icon: '🏠', label: 'Tổng quan', navLabel: 'Nhà' },
        { key: 'order', icon: '🍜', label: 'Đặt chung', navLabel: 'Đặt chung' },
        { key: 'chores', icon: '🧹', label: 'Việc nhà', navLabel: 'Việc nhà' },
        { key: 'board', icon: '📋', label: 'Thông báo', navLabel: 'Bảng tin' },
        { key: 'earn', icon: '⭐', label: 'Kiếm điểm', navLabel: 'Điểm' },
    ];

    /* Contribute */
    const handleContribute = () => {
        const amt = customAmount ? parseInt(customAmount) : selectedContrib;
        if (!amt || amt < 1000) { showToast('⚠️ Nhập số tiền hợp lệ!'); return; }
        setShowModal(false);
        setCustomAmount('');
        const k = Math.round(amt / 1000);
        setFundAmount(prev => Math.min(prev + k, 1000));
        spawnCoinFly();
        showToast(`🎉 Đã góp ${k}k! +10 điểm Smile cho bạn`);
        triggerConfetti();
    };

    /* Toggle chore */
    const toggleChore = (id: string) => {
        setChores(prev => prev.map(c => {
            if (c.id !== id) return c;
            const newDone = !c.done;
            if (newDone) {
                showToast(`✅ Hoàn thành! +${c.pts} điểm 🌟`);
                triggerConfetti(true);
            } else {
                showToast('↩️ Đã bỏ đánh dấu');
            }
            return { ...c, done: newDone };
        }));
    };

    /* Join/Leave order chip */
    const toggleOrder = (id: string) => {
        setOrders(prev => prev.map(o => {
            if (o.id !== id) return o;
            const newJoined = !o.joined;
            if (newJoined) {
                showToast('✅ Đã vào đơn chung! Walker sẽ giao cùng nhé 🎒');
            } else {
                showToast('↩️ Đã rời đơn chung');
            }
            return {
                ...o, joined: newJoined,
                badge: newJoined ? 'Đã vào' : (o.id === 'o3' ? 'Mới tạo' : o.id === 'o4' ? 'Hot 🔥' : 'Còn slot'),
                badgeType: newJoined ? 'joined' : 'open',
            };
        }));
    };

    /* React */
    const toggleReaction = (list: any[][], setList: Function, aIdx: number, rIdx: number) => {
        const updated = list.map((reactions, i) =>
            i !== aIdx ? reactions : reactions.map((r: any, j: number) =>
                j !== rIdx ? r : { ...r, reacted: !r.reacted, count: r.reacted ? r.count - 1 : r.count + 1 }
            )
        );
        setList(updated);
    };

    /* Share */
    const handleShare = () => {
        const shareText = '🏠 Nhà trọ mình dùng Smile Home quản lý quỹ, việc nhà, đặt đồ ăn chung – ship chỉ 6k!\nJoin nhà trọ bạn tại smile.vn/home 🙂';
        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ title: 'Smile Home', text: shareText, url: 'https://smile.vn/home' });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => showToast('📋 Đã copy link mời! Dán vào Zalo/Facebook nhé 🔥'));
        } else {
            showToast('🔗 Link: smile.vn/home/xuan-thuy-7a');
        }
        triggerConfetti(true);
    };

    /* Earn task */
    const doEarnTask = (taskName: string, pts: number) => {
        if (earnTasksDone.has(taskName)) return;
        setEarnTasksDone(prev => new Set(prev).add(taskName));
        setMyPoints(prev => {
            const newPts = prev + pts;
            spawnCoinFly();
            showToast(`⭐ +${pts} điểm từ "${taskName}"! Tổng: ${newPts}đ`);
            if (newPts >= 200 && prev < 200) {
                setTimeout(() => { triggerConfetti(); showToast('🥇 CHÚC MỪNG! Bạn lên Hạng VÀNG! +20k Smile Cash!'); }, 600);
            }
            return newPts;
        });
    };

    /* Redeem */
    const redeemReward = (name: string, cost: number) => {
        if (myPoints < cost) { showToast(`⚠️ Cần ${cost} điểm. Bạn đang có ${myPoints} điểm.`); return; }
        setMyPoints(prev => prev - cost);
        showToast(`🎁 Đã đổi: "${name}"! Còn ${myPoints - cost} điểm`);
    };

    /* Announce renderer */
    const renderAnnounces = (list: typeof HOME_ANNOUNCES, reactions: any[][], setReactions: Function, extra?: { claimable?: boolean; joinable?: boolean }) => (
        <div>
            {list.map((item, aIdx) => (
                <div key={aIdx} className={`sh-announce-item ${item.type} sh-fade-up`} style={{ animationDelay: `${aIdx * 0.08}s` }}>
                    <div className="sh-announce-header">
                        <span className="sh-announce-icon">{item.icon}</span>
                        <span className="sh-announce-title">{item.title}</span>
                        <span className="sh-announce-time">{item.time}</span>
                    </div>
                    <div className="sh-announce-body">{item.body}</div>
                    <div className="sh-reactions">
                        {reactions[aIdx]?.map((r: any, rIdx: number) => (
                            <div
                                key={rIdx}
                                className={`sh-reaction-btn ${r.reacted ? 'reacted' : ''}`}
                                onClick={() => toggleReaction(reactions, setReactions, aIdx, rIdx)}
                            >
                                {r.emoji} {r.count}
                            </div>
                        ))}
                        {extra?.claimable && aIdx === 2 && !claimedTrash && (
                            <div className="sh-reaction-btn" onClick={() => { setClaimedTrash(true); showToast('🙌 Bạn nhận việc đổ rác ca chiều! +35 điểm khi hoàn thành 🔥'); }}>
                                ✋ Tôi làm!
                            </div>
                        )}
                        {extra?.claimable && aIdx === 2 && claimedTrash && (
                            <div className="sh-reaction-btn reacted">✓ Bạn đã nhận!</div>
                        )}
                        {extra?.joinable && aIdx === 0 && !joinedBanhMi && (
                            <div className="sh-reaction-btn" onClick={() => { setJoinedBanhMi(true); showToast('✅ Đã vào đơn bánh mì sáng! Minh sẽ giao lúc 7h30'); }}>
                                + Tham gia
                            </div>
                        )}
                        {extra?.joinable && aIdx === 0 && joinedBanhMi && (
                            <div className="sh-reaction-btn reacted">✓ Đã tham gia!</div>
                        )}
                        {item.type === 'urgent' && aIdx === 1 && list === BOARD_ANNOUNCES && (
                            <div className="sh-reaction-btn" onClick={() => showToast('🛠️ Đặt thợ qua Smile – Giá 80k, đến trong 2h!')}>
                                Đặt thợ ngay
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    const fundPct = (fundAmount / 1000) * 100;

    return (
        <div className="sh-page">
            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }} />

            {/* ── HEADER ── */}
            <div className="sh-header">
                <div className="sh-header-top">
                    <div className="sh-house-name">
                        <div className="sh-house-icon">🏠</div>
                        <div>
                            <div className="sh-house-title">Nhà trọ Xuân Thủy</div>
                            <div className="sh-house-sub">5 thành viên · Cầu Giấy, HN</div>
                        </div>
                    </div>
                    <div className="sh-header-notif" onClick={() => showToast('🔔 3 thông báo mới!')}>
                        🔔
                        <div className="sh-notif-badge">3</div>
                    </div>
                </div>

                <div className="sh-fund-card">
                    <div className="sh-fund-row">
                        <div className="sh-fund-label">💰 Quỹ chung tháng 6</div>
                        <div className="sh-fund-amount">{fundAmount}<span>k</span></div>
                    </div>
                    <div className="sh-fund-progress-bar">
                        <div className="sh-fund-progress-fill" style={{ width: `${fundPct}%` }} />
                    </div>
                    <div className="sh-fund-meta">
                        <span>Đã góp: {fundAmount}k / 1tr</span>
                        <span>Còn 16 ngày</span>
                    </div>
                    <div className="sh-fund-actions">
                        <button className="sh-fund-btn contribute" onClick={() => setShowModal(true)}>💸 Góp quỹ</button>
                        <button className="sh-fund-btn history" onClick={() => showToast('📋 Lịch sử: Minh +100k, Lan +50k, Nam +200k')}>📋 Lịch sử</button>
                    </div>
                </div>
            </div>

            {/* ── AVATARS ── */}
            <div className="sh-members-row">
                {MEMBERS.map(m => (
                    <div key={m.name} className="sh-member-avatar" onClick={() => showToast(`👤 ${m.name} – ${m.role} · ${m.pts} điểm`)}>
                        <div className="sh-avatar-wrap">
                            <div className={`sh-avatar-circle ${m.status}`} style={{ background: m.bg }}>{m.emoji}</div>
                            <div className={`sh-avatar-status ${m.status}`} />
                        </div>
                        <div className="sh-avatar-name">{m.name}</div>
                    </div>
                ))}
                <div className="sh-add-member" onClick={() => showToast('📲 Link mời: smile.vn/home/xuan-thuy-7a – Đã copy!')}>+</div>
            </div>

            {/* ── TABS ── */}
            <div className="sh-tabs">
                {tabs.map(t => (
                    <button key={t.key} className={`sh-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* ── CONTENT ── */}
            <div className="sh-content">

                {/* HOME TAB */}
                {activeTab === 'home' && (
                    <div>
                        <div className="sh-share-banner" onClick={handleShare}>
                            <div className="sh-share-icon">🎁</div>
                            <div className="sh-share-text">
                                <h4>Mời thêm 1 người → cả nhà +50k quỹ!</h4>
                                <p>Đã có 12 nhà trọ join Smile Home tuần này</p>
                            </div>
                            <button className="sh-share-btn" onClick={(e) => { e.stopPropagation(); handleShare(); }}>Chia sẻ</button>
                        </div>

                        <div className="sh-section-title">
                            Hôm nay ở nhà trọ 🌤️
                            <span className="sh-section-link" onClick={() => setActiveTab('board')}>xem hết</span>
                        </div>

                        {renderAnnounces(HOME_ANNOUNCES, homeReactions, setHomeReactions, { claimable: true, joinable: true })}

                        <div className="sh-section-title" style={{ marginTop: 18 }}>
                            🏆 BXH tháng này
                            <span className="sh-section-link" onClick={() => setActiveTab('earn')}>top 10</span>
                        </div>

                        <div className="sh-leaderboard">
                            {[
                                { rank: '🥇', emoji: '🧔', name: 'Nam', pts: 310, pct: 100 },
                                { rank: '🥈', emoji: '🧑', name: 'Minh', pts: 240, pct: 77 },
                                { rank: '🥉', emoji: '👩', name: 'Lan', pts: 185, pct: 60 },
                                { rank: '4', emoji: '👦', name: 'Tú', pts: 128, pct: 41, muted: true },
                            ].map((row, i) => (
                                <div key={i} className="sh-lb-row" onClick={() => showToast(`${row.rank} ${row.name} · ${row.pts} điểm`)}>
                                    <div className="sh-lb-rank">{row.rank}</div>
                                    <div className="sh-lb-avatar">{row.emoji}</div>
                                    <div className="sh-lb-name">{row.name}</div>
                                    <div className="sh-lb-score">
                                        <div className="sh-lb-score-val" style={row.muted ? { color: 'var(--sh-muted)' } : undefined}>{row.pts}</div>
                                        <div className="sh-lb-score-label">điểm</div>
                                        <div className="sh-lb-bar-wrap">
                                            <div className="sh-lb-bar" style={{ width: `${row.pct}%`, ...(row.muted ? { background: 'var(--sh-muted)' } : {}) }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ORDER TAB */}
                {activeTab === 'order' && (
                    <div>
                        <div className="sh-order-banner" onClick={() => showToast('🍜 Mở form tạo đơn chung mới!')}>
                            <div className="sh-order-icon">🍜</div>
                            <div className="sh-order-text">
                                <h3>Tạo đơn chung mới</h3>
                                <p>Chọn món → kéo bạn cùng phòng vào → walker giao chung</p>
                            </div>
                        </div>

                        <div className="sh-section-title">
                            Đơn đang mở 🔓
                            <span className="sh-section-link" onClick={() => showToast('Xem tất cả đơn trong khu vực')}>xem thêm</span>
                        </div>

                        <div className="sh-active-orders">
                            {orders.map(o => (
                                <div key={o.id} className={`sh-order-chip ${o.joined ? 'joined' : ''}`}>
                                    <div className="sh-chip-header">
                                        <span className="sh-chip-icon">{o.icon}</span>
                                        <span className="sh-chip-name">{o.name}</span>
                                        <span className={`sh-chip-badge ${o.badgeType}`}>{o.badge}</span>
                                    </div>
                                    <div className="sh-chip-meta">{o.meta}</div>
                                    <button
                                        className={`sh-chip-join ${o.joined ? 'leave-btn' : 'join-btn'}`}
                                        onClick={() => toggleOrder(o.id)}
                                    >
                                        {o.joined ? '✓ Đã đặt – Rời' : '+ Tham gia ngay'}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="sh-section-title" style={{ marginTop: 4 }}>🚶 Walker gần nhà</div>
                        <div className="sh-walker-card">
                            <div className="sh-walker-row" onClick={() => showToast('📍 Minh đang ở Xuân Thủy, cách 200m · Nhận đến 3 đơn')}>
                                <div style={{ fontSize: 22 }}>🧑</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700 }}>Minh · 200m</div>
                                    <div style={{ fontSize: 10, color: 'var(--sh-muted)', fontWeight: 600 }}>Đang đi hướng Cầu Giấy · Nhận đến 3 đơn</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sh-green)' }}>Sẵn sàng</div>
                                    <div style={{ fontSize: 10, color: 'var(--sh-muted)' }}>1.200đ/hop</div>
                                </div>
                            </div>
                            <div className="sh-walker-row" onClick={() => showToast('📍 Tú đang ở Dịch Vọng, cách 350m')}>
                                <div style={{ fontSize: 22 }}>👦</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700 }}>Tú · 350m</div>
                                    <div style={{ fontSize: 10, color: 'var(--sh-muted)', fontWeight: 600 }}>Hướng ĐH Quốc Gia · Bus 26</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sh-yellow)' }}>Bận 1 đơn</div>
                                    <div style={{ fontSize: 10, color: 'var(--sh-muted)' }}>1.200đ/hop</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CHORES TAB */}
                {activeTab === 'chores' && (
                    <div>
                        <div style={{ background: 'var(--sh-green-light)', border: '2px solid rgba(6,214,160,0.25)', borderRadius: 14, padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ fontSize: 24 }}>🌟</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 800 }}>Tuần này cả nhà sạch bóng!</div>
                                <div style={{ fontSize: 11, color: 'var(--sh-muted)', fontWeight: 600, marginTop: 2 }}>Hoàn thành {chores.filter(c => c.done).length}/{chores.length} việc · Bonus quỹ 30k đang chờ</div>
                            </div>
                        </div>

                        <div className="sh-section-title">
                            Hôm nay – Thứ Tư
                            <span className="sh-section-link" onClick={() => showToast('📝 Mở form thêm việc nhà mới')}>+ Thêm việc</span>
                        </div>

                        {chores.map(c => (
                            <div key={c.id} className={`sh-chore-item ${c.done ? 'done' : ''}`} onClick={() => toggleChore(c.id)}>
                                <div className="sh-chore-check">{c.done ? '✓' : ''}</div>
                                <div className="sh-chore-info">
                                    <div className="sh-chore-name">{c.name}</div>
                                    <div className="sh-chore-meta">
                                        <div className="sh-chore-assignee">
                                            <div className="sh-chore-av" style={{ background: c.bg }}>{c.emoji}</div>
                                            <span>{c.assignee}</span>
                                        </div>
                                        · {c.done ? c.time : c.time}
                                        {c.urgent && !c.done && <span style={{ color: 'var(--sh-pink)', marginLeft: 4 }}>· Cần người thay!</span>}
                                    </div>
                                </div>
                                <div className="sh-chore-pts" style={c.urgent && !c.done ? { background: 'var(--sh-pink-light)', color: 'var(--sh-pink)' } : undefined}>
                                    {c.done ? '✓ ' : ''}+{c.pts}đ{c.urgent && !c.done ? '🔥' : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* BOARD TAB */}
                {activeTab === 'board' && (
                    <div>
                        <div className="sh-section-title">
                            📋 Bảng tin nhà trọ
                            <button
                                style={{ background: 'var(--sh-primary)', color: 'white', border: 'none', borderRadius: 8, padding: '5px 10px', fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                                onClick={() => showToast('✏️ Mở form đăng thông báo mới!')}
                            >
                                + Đăng
                            </button>
                        </div>
                        {renderAnnounces(BOARD_ANNOUNCES, boardReactions, setBoardReactions)}
                    </div>
                )}

                {/* EARN TAB */}
                {activeTab === 'earn' && (
                    <div>
                        <div className="sh-earn-card" onClick={() => showToast(`🌟 Tổng điểm của bạn: ${myPoints} · ${myPoints >= 200 ? 'Hạng Vàng' : 'Hạng Bạc'}`)}>
                            <h3>⭐ {myPoints} điểm · {myPoints >= 200 ? 'Hạng Vàng 🥇' : 'Hạng Bạc'}</h3>
                            <p>{myPoints >= 200 ? 'Chúc mừng bạn đã lên Hạng Vàng! Tiếp tục kiếm điểm nhé 🔥' : `Kiếm thêm ${200 - myPoints} điểm để lên Hạng Vàng 🥇 và nhận 20k Smile Cash!`}</p>
                            <div className="sh-earn-tasks">
                                {[
                                    { name: 'Nhận 1 đơn relay', pts: 12, icon: '🎒' },
                                    { name: 'Làm việc nhà', pts: 20, icon: '🧹' },
                                    { name: 'Góp quỹ chung', pts: 10, icon: '💰' },
                                    { name: 'Mời bạn mới', pts: 50, icon: '🤝' },
                                ].map(task => (
                                    <div
                                        key={task.name}
                                        className="sh-earn-task"
                                        style={earnTasksDone.has(task.name) ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
                                        onClick={(e) => { e.stopPropagation(); doEarnTask(task.name, task.pts); }}
                                    >
                                        <span>{task.icon}</span>
                                        <span>{task.name} +{task.pts}đ</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sh-section-title">🏆 BXH toàn khu Cầu Giấy</div>
                        <div className="sh-leaderboard">
                            {[
                                { rank: '🥇', emoji: '🏠', name: 'Dịch Vọng A4', pts: '1,240', label: 'điểm nhà', pct: 100 },
                                { rank: '🥈', emoji: '🏡', name: 'Xuân Thủy 7A', pts: '980', label: 'điểm nhà', pct: 79, isYou: true },
                                { rank: '🥉', emoji: '🏘️', name: 'Cầu Giấy B7', pts: '756', label: 'điểm nhà', pct: 61, muted: true },
                            ].map((row, i) => (
                                <div key={i} className="sh-lb-row" onClick={() => showToast(`${row.rank} ${row.name} · ${row.pts} điểm`)}>
                                    <div className="sh-lb-rank">{row.rank}</div>
                                    <div className="sh-lb-avatar">{row.emoji}</div>
                                    <div className="sh-lb-name">
                                        {row.name}
                                        {row.isYou && <span style={{ fontSize: 9, color: 'var(--sh-primary)', marginLeft: 4 }}>(nhà bạn)</span>}
                                    </div>
                                    <div className="sh-lb-score">
                                        <div className="sh-lb-score-val" style={row.isYou ? { color: 'var(--sh-primary)' } : row.muted ? { color: 'var(--sh-muted)' } : undefined}>{row.pts}</div>
                                        <div className="sh-lb-score-label">{row.label}</div>
                                        <div className="sh-lb-bar-wrap">
                                            <div className="sh-lb-bar" style={{ width: `${row.pct}%`, ...(row.muted ? { background: 'var(--sh-muted)' } : {}) }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="sh-section-title" style={{ marginTop: 16 }}>🎁 Đổi điểm</div>
                        <div className="sh-reward-grid">
                            {REWARDS.map((r, i) => (
                                <div key={i} className="sh-reward-card" onClick={() => redeemReward(r.title, r.cost)}>
                                    <div style={{ fontSize: 28, marginBottom: 6 }}>{r.icon}</div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sh-text)' }}>{r.title}</div>
                                    <div style={{ fontSize: 11, color: 'var(--sh-muted)', margin: '4px 0' }}>{r.desc}</div>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--sh-primary)' }}>{r.cost} điểm</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sh-bottom-nav">
                {tabs.map(t => (
                    <div key={t.key} className={`sh-nav-item ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
                        <div className="sh-nav-icon">{t.icon}</div>
                        <div className="sh-nav-label">{t.navLabel}</div>
                        <div className="sh-nav-dot" />
                    </div>
                ))}
            </div>

            {/* ── CONTRIBUTE MODAL ── */}
            <div className={`sh-modal-overlay ${showModal ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
                <div className="sh-modal-sheet">
                    <div className="sh-modal-handle" />
                    <div className="sh-modal-title">💰 Góp quỹ chung</div>
                    <div className="sh-contrib-options">
                        {[
                            { amount: 50000, label: '50k', desc: 'Nhỏ' },
                            { amount: 100000, label: '100k', desc: 'Tiêu chuẩn' },
                            { amount: 200000, label: '200k', desc: 'Nhiệt tình 🔥' },
                        ].map(opt => (
                            <div
                                key={opt.amount}
                                className={`sh-contrib-opt ${!customAmount && selectedContrib === opt.amount ? 'selected' : ''}`}
                                onClick={() => { setSelectedContrib(opt.amount); setCustomAmount(''); }}
                            >
                                <div className="amount">{opt.label}</div>
                                <div className="label">{opt.desc}</div>
                            </div>
                        ))}
                    </div>
                    <input
                        type="number"
                        className="sh-modal-input"
                        placeholder="Hoặc nhập số tiền khác (đồng)..."
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                    />
                    <div style={{ fontSize: 11, color: 'var(--sh-muted)', fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
                        Góp quỹ → cộng 10 điểm Smile cho bạn 🎉
                    </div>
                    <button className="sh-modal-submit" onClick={handleContribute}>🚀 Xác nhận góp quỹ</button>
                </div>
            </div>

            {/* ── TOAST ── */}
            <div className={`sh-toast ${toast.show ? 'show' : ''}`}>
                <span>{toast.text}</span>
            </div>
        </div>
    );
}
