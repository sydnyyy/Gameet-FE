export default function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-2 -right-4 text-xs bg-red-500 text-white rounded-full px-2">
      {count}
    </span>
  );
}
