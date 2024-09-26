export function InputBox({ label, onchange, placeholder }) {
  return (
    <div>
      <div className="text-sm font-meduim text-left py-2">{label}</div>
      <input
        onChange={onchange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border roundeed border-slate-200"
      />
    </div>
  );
}
