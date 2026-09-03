import React, { useState, useEffect, useRef } from 'react';
import { fetchPlaceAutocomplete, fetchPlaceDetails, PlacePrediction, SelectedPlace } from '../services/googleMaps';

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
  const [apiError, setApiError] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<any>(null);
  const justSelectedRef = useRef(false);

  // Debounced search on typing
  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }

    const trimmed = (value || '').trim();
    if (!trimmed) {
      setPredictions([]);
      setIsOpen(false);
      setApiError(null);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      setApiError(null);
      const res = await fetchPlaceAutocomplete(trimmed);
      setIsLoading(false);

      if (res.error) {
        setApiError(res.error);
        setPredictions([]);
        setIsOpen(true);
      } else {
        setPredictions(res.predictions);
        setIsOpen(res.predictions.length > 0);
        setHighlightedIndex(-1);
      }
    }, 220);

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
    setApiError(null);

    // Prefer the place's main name or full text
    const displayValue = prediction.mainText || prediction.text;
    onChange(displayValue);

    // Notify immediately with placeId and text
    const initialPlace: SelectedPlace = {
      name: displayValue,
      placeId: prediction.placeId,
      formattedAddress: prediction.text
    };
    onSelectPlace(initialPlace);

    // Fetch place details to retrieve coordinates (latitude, longitude)
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || predictions.length === 0) return;

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
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

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
            if (predictions.length > 0 || apiError) {
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

      {/* Google Places Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-left animate-in fade-in duration-150">
          {apiError ? (
            <div className="p-3 text-xs bg-amber-50 border-b border-amber-100 text-amber-900">
              <div className="font-semibold flex items-center gap-1.5 text-amber-800">
                <span>⚠️ Google Places API</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-amber-700">{apiError}</p>
            </div>
          ) : predictions.length > 0 ? (
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
            </ul>
          ) : null}

          {/* Google Attribution Footer */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Google Maps Platform</span>
            <span className="font-medium text-slate-500">powered by Google</span>
          </div>
        </div>
      )}
    </div>
  );
};
