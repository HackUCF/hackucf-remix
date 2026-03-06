import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function WriteupSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (q: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setLocal(v);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(v), 300);
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
      <Input
        type="search"
        placeholder="Search writeups..."
        aria-label="Search writeups"
        value={local}
        onChange={handleChange}
        className="pl-10 bg-stone-900 border-stone-700 focus:border-brandGold placeholder:text-stone-500"
      />
    </div>
  );
}
