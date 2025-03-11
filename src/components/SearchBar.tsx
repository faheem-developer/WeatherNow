
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8 animate-fade-up">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center"
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full h-14 px-5 pr-14 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 glass"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-2 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          disabled={isLoading}
        >
          <Search size={20} className={isLoading ? "animate-pulse" : ""} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
