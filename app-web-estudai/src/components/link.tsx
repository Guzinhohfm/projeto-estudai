export function Link({ to, setActiveTab, children }: any) {
  return (
    <button
      onClick={() => setActiveTab(to)}
      className="text-blue-600 hover:underline cursor-pointer"
    >
      {children}
    </button>
  );
}