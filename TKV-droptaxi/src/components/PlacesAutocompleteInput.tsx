import React, { useState, useEffect, useRef } from 'react';
import { fetchPlaceAutocomplete, fetchPlaceDetails, getLocalCityPredictions, PlacePrediction, SelectedPlace } from '../services/googleMaps';

interface PlacesAutocompleteInputProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onSelectPlace: (place: SelectedPlace) => void;
  placeholder: string;
  dotColor: 'green' | 'red';
  headerRight?: React.ReactNode;
}

export const PlacesAutocompleteInput: React.FC<PlacesAutocompleteInputProps> = ({
  id,
  label,
  value,
  onChange,
  onSelectPlace,
  placeholder,
  dotColor,
  headerRight
}) => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLocalMode, setIsLocalMode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<any>(null);
  const justSelectedRef = useRef(false);
  const cacheRef = useRef<Map<string, PlacePrediction[]>>(new Map());

  // Debounced search on typing with in-memory caching and offline fallback
  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }

    const trimmed = (value || '').trim();
    if (!trimmed) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    // 1-character input: show instant local city matches without burning API quota
    if (trimmed.length === 1) {
      const localMatches = getLocalCityPredictions(trimmed);
      setPredictions(localMatches);
      setIsLocalMode(true);
      setIsOpen(localMatches.length > 0);
      setHighlightedIndex(-1);
      return;
    }

    // Check memory cache first
    const cacheKey = trimmed.toLowerCase();
    if (cacheRef.current.has(cacheKey)) {
      const cached = cacheRef.current.get(cacheKey) || [];
      setPredictions(cached);
      setIsLocalMode(cached.some(p => p.isLocalFallback));
      setIsOpen(cached.length > 0);
      setHighlightedIndex(-1);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      const res = await fetchPlaceAutocomplete(trimmed);
      setIsLoading(false);

      const results = res.predictions || [];
      cacheRef.current.set(cacheKey, results);
      setPredictions(results);
      setIsLocalMode(!!res.isFallback);
      setIsOpen(results.length > 0);
      setHighlightedIndex(-1);
    }, 320);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectPrediction = async (prediction: PlacePrediction) => {
    justSelectedRef.current = true;
    setIsOpen(false);
    setPredictions([]);

    const displayValue = prediction.mainText || prediction.text;
    onChange(displayValue);

    const initialPlace: SelectedPlace = {
      name: displayValue,
      placeId: prediction.placeId,
      formattedAddress: prediction.text
    };
    onSelectPlace(initialPlace);

    if (prediction.placeId) {
      const details = await fetchPlaceDetails(prediction.placeId);
      if (details) {
        onSelectPlace({
          ...initialPlace,
          ...details,
          name: displayValue
        });
      }
    }
  };

  const handleSelectCustomText = (text: string) => {
    justSelectedRef.current = true;
    setIsOpen(false);
    setPredictions([]);
    onChange(text);
    onSelectPlace({
      name: text,
      formattedAddress: text
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : predictions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < predictions.length) {
        e.preventDefault();
        handleSelectPrediction(predictions[highlightedIndex]);
      } else if (value.trim()) {
        e.preventDefault();
        handleSelectCustomText(value.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const hasDirectMatch = predictions.some(
    (p) => p.mainText.toLowerCase() === value.trim().toLowerCase()
  );

  return (
    <div className="relative" ref={containerRef}>
      {(label || headerRight) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <label htmlFor={id} className="clean-field-caps-label">
              {label}
            </label>
          )}
          {headerRight}
        </div>
      )}

      <div className="clean-input-wrap relative">
        <span className={`clean-input-dot ${dotColor === 'green' ? 'dot-green' : 'dot-red'}`}></span>
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (predictions.length > 0 || value.trim().length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="clean-input clean-input-with-dot"
          autoComplete="off"
        />

        {isLoading && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="animate-spin h-3.5 w-3.5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (predictions.length > 0 || (value.trim() && !hasDirectMatch)) && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-left animate-in fade-in duration-150">
          <ul className="max-h-56 overflow-y-auto divide-y divide-slate-100 m-0 p-0 list-none">
            {predictions.map((pred, index) => {
              const isHighlighted = index === highlightedIndex;
              return (
                <li
                  key={pred.placeId || index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectPrediction(pred);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex items-start gap-2.5 px-3 py-2 text-xs cursor-pointer transition-colors ${
                    isHighlighted ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 mt-0.5 shrink-0 ${isHighlighted ? 'text-blue-600' : 'text-slate-400'}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[12px] truncate text-slate-900">{pred.mainText}</div>
                    {pred.secondaryText && (
                      <div className="text-[10.5px] text-slate-500 truncate">{pred.secondaryText}</div>
                    )}
                  </div>
                </li>
              );
            })}

            {/* Direct match option if user typed custom text */}
            {value.trim() && !hasDirectMatch && (
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectCustomText(value.trim());
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer bg-slate-50 hover:bg-blue-50 text-slate-700 transition-colors border-t border-slate-100"
              >
                <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="truncate">Use <strong>"{value.trim()}"</strong> as location</span>
              </li>
            )}
          </ul>

          {/* Attribution Footer */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>{isLocalMode ? 'Popular Locations' : 'Google Maps Platform'}</span>
            <span className="font-medium text-slate-500">
              {isLocalMode ? 'Tamil Nadu & South India' : 'powered by Google'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
