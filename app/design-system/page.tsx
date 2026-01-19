// design-system/page.tsx
import React from 'react';

export default function DesignSystemPage() {
  const colorGroups = [
    {
      title: "Core Colors",
      colors: [
        { name: "Primary", class: "bg-primary", text: "text-primary-foreground", hex: "#DFF347" },
        { name: "Secondary", class: "bg-secondary", text: "text-secondary-foreground", hex: "#E2E8F0" },
        { name: "Accent", class: "bg-accent", text: "text-accent-foreground", hex: "#F4F9C3" },
      ],
    },
    {
      title: "Status & Feedback",
      colors: [
        { name: "Success", class: "bg-success", text: "text-white", hex: "#6CC398" },
        { name: "Destructive", class: "bg-destructive", text: "text-white", hex: "#EF4444" },
        { name: "Muted", class: "bg-muted text-muted-foreground", text: "text-muted-foreground", hex: "#F1F5F9" },
      ],
    },
    {
      title: "UI Components",
      colors: [
        { name: "Background", class: "bg-background", text: "text-foreground", hex: "#F4F8FB" },
        { name: "Sidebar", class: "bg-sidebar", text: "text-sidebar-foreground", hex: "#121212" },
        { name: "Card", class: "bg-card shadow-sm border", text: "text-card-foreground", hex: "#FFFFFF" },
      ],
    },
  ];

  return (
    <div className="p-10 space-y-16 bg-background min-h-screen max-w-7xl mx-auto">
      {/* ヘッダー */}
      <div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Design System</h1>
        <p className="text-muted-foreground">カラーパレットとコンポーネントのプレビュー</p>
      </div>

      {/* --- 1. カラーカテゴリー (以前のスタイルを維持) --- */}
      <div className="space-y-12">
        {colorGroups.map((group) => (
          <section key={group.title} className="space-y-4">
            <h2 className="text-xl font-bold border-l-4 border-primary pl-3">{group.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {group.colors.map((color) => (
                <div key={color.name} className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className={`h-20 ${color.class} flex items-center justify-center font-bold`}>
                    <span className={color.text}>ABC 123</span>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-sm">{color.name}</p>
                    <p className="text-[10px] font-mono text-gray-400 uppercase">{color.hex}</p>
                    <code className="text-[9px] bg-gray-50 p-1 rounded mt-2 block border border-dashed text-gray-500">
                      class="{color.class}"
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <hr className="opacity-10" />

      {/* --- 2. 統計カード (画像中央の黒いカードの小型版) --- */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-l-4 border-primary pl-3">Stat Cards Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Sales", val: "$1k", trend: "+20%" },
            { label: "Total Order", val: "350", trend: "+10%" },
            { label: "New Buyers", val: "345", trend: "+40%" },
          ].map((card) => (
            <div key={card.label} className="bg-sidebar p-6 rounded-[1.5rem] text-sidebar-foreground shadow-lg">
              <p className="text-2xl font-black mb-1">{card.val}</p>
              <p className="text-[10px] opacity-50 uppercase tracking-widest mb-3">{card.label}</p>
              <span className="text-[9px] font-black bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase">
                {card.trend}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. レイアウトシミュレーション (以前よりコンパクトに) --- */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-l-4 border-primary pl-3">Layout Simulation</h2>
        <div className="flex h-80 border rounded-[2rem] overflow-hidden shadow-xl bg-white">
          <aside className="w-48 bg-sidebar p-6 text-sidebar-foreground flex flex-col">
            <p className="font-black text-lg mb-8 tracking-tighter italic">GoodBoard</p>
            <div className="space-y-2 flex-grow">
              <div className="bg-primary text-primary-foreground p-3 rounded-xl text-[10px] font-black uppercase tracking-tight shadow-lg shadow-primary/20">
                Dashboard
              </div>
              <div className="p-3 opacity-30 text-[10px] font-bold uppercase">Orders</div>
              <div className="p-3 opacity-30 text-[10px] font-bold uppercase">Settings</div>
            </div>
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
              <p className="text-[8px] font-bold leading-tight mb-2 opacity-80">Get all features</p>
              <button className="w-full bg-black text-white py-1.5 rounded-lg text-[7px] font-black uppercase">Go Pro ↑</button>
            </div>
          </aside>
          <main className="flex-1 bg-background p-8 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
               <div className="h-8 w-40 bg-white rounded-lg shadow-sm" />
               <div className="h-8 w-8 bg-primary rounded-full shadow-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="h-32 bg-white rounded-2xl shadow-sm border border-border p-4">
                  <p className="text-[10px] font-bold text-muted-foreground mb-4 tracking-tight">Satisfaction</p>
                  <div className="flex items-end gap-1.5 h-12">
                     {[40, 70, 45, 90, 60].map((h, i) => (
                       <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative">
                         <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-primary rounded-t-sm" />
                       </div>
                     ))}
                  </div>
               </div>
               <div className="h-32 bg-white rounded-2xl shadow-sm border border-border p-4">
                  <p className="text-[10px] font-bold text-muted-foreground mb-4 tracking-tight">Products</p>
                  <div className="space-y-3">
                     {[70, 40].map((w, i) => (
                       <div key={i} className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div style={{ width: `${w}%` }} className="h-full bg-primary" />
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </main>
        </div>
      </section>

      {/* --- 4. インタラクティブ要素 --- */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-l-4 border-primary pl-3">Component Preview</h2>
        <div className="flex flex-wrap gap-4 p-8 bg-white rounded-3xl border shadow-sm">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold shadow-md hover:opacity-90">
            Primary Button
          </button>
          <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-200">
            Secondary
          </button>
          <button className="bg-destructive text-white px-6 py-2 rounded-lg font-bold shadow-md hover:opacity-90">
            Destructive
          </button>
          <div className="flex items-center gap-2 text-success font-bold px-4 border border-success rounded-lg">
            ✓ Success State
          </div>
        </div>
      </section>
    </div>
  );
}