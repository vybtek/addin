// SearchBar.jsx
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="flex-1 relative">
    <input
      type="text"
      placeholder="Find requirement by title"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      aria-label="Search jobs by title"
    />
    <button
      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-sky-400 text-white p-2 rounded-lg hover:bg-sky-500 transition-colors"
      aria-label="Search"
    >
      <Search className="w-4 h-4" />
    </button>
  </div>
);

export default SearchBar;
