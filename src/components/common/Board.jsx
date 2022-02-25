export default function Board({ children }) {
  return (
    <div className="mx-auto bg-gray-400 w-3/4 h-3/4 rounded-lg my-14 select-none">
      {children}
    </div>
  );
}
