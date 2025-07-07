function Header() {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <img src="/logo.png" alt="PlayBank Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold">PlayBank</span>
      </div>
      <div className="flex justify-between items-center px-4 py-2">
        {/* Navigation */}
      </div>
    </div>
  );
}
export default Header;
