
import { Clock } from "lucide-react";
import { RecentSearch } from "@/types/weather";

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (city: string) => void;
}

const RecentSearches = ({ searches, onSelect }: RecentSearchesProps) => {
  if (searches.length === 0) return null;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mb-8 animate-fade-up">
      <div className="flex items-center gap-2 mb-2">
        <Clock size={16} className="text-gray-500" />
        <h3 className="text-sm font-medium text-gray-600">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={`${search.city}-${search.timestamp}`}
            onClick={() => onSelect(search.city)}
            className="px-3 py-1.5 text-sm rounded-full bg-white/50 hover:bg-white/80 border border-gray-200 transition-all duration-300 flex items-center gap-1.5"
          >
            <span>{search.city}</span>
            <span className="text-xs text-gray-500">{formatTime(search.timestamp)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
