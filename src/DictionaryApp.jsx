"use client";

import { useState, useEffect } from "react";
import { words } from "./data";
import {
  Book,
  Bookmark,
  Info,
  MessageSquare,
  RefreshCcw,
  Volume2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DictionaryApp = () => {
  const [bookmarkedWords, setBookmarkedWords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWords, setFilteredWords] = useState(words);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedWords")) || [];
    setBookmarkedWords(storedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedWords", JSON.stringify(bookmarkedWords));
  }, [bookmarkedWords]);

  useEffect(() => {
    setFilteredWords(
      words.filter((word) =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleBookmark = (word) => {
    if (bookmarkedWords.includes(word)) {
      setBookmarkedWords(bookmarkedWords.filter((w) => w !== word));
    } else {
      setBookmarkedWords([...bookmarkedWords, word]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to ">
      <div className="max-w-3xl w-full relative">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-white tracking-tight drop-shadow-lg">
          Elegant Dictionary
        </h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for a word..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-600 bg-gray-800 text-white"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="relative flex items-center justify-center">
          {filteredWords.length > 0 ? (
            <>
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full ${
                  currentSlide === 0 ? "bg-gray-600" : "bg-indigo-500"
                } text-white transition-colors duration-300`}
              >
                <ChevronLeft size={24} />
              </button>

              {filteredWords[currentSlide] && (
                <DictionaryCard
                  word={filteredWords[currentSlide]}
                  isBookmarked={bookmarkedWords.includes(
                    filteredWords[currentSlide].word
                  )}
                  onBookmark={() =>
                    handleBookmark(filteredWords[currentSlide].word)
                  }
                />
              )}

              <button
                onClick={() =>
                  setCurrentSlide(
                    Math.min(filteredWords.length - 1, currentSlide + 1)
                  )
                }
                disabled={currentSlide === filteredWords.length - 1}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full ${
                  currentSlide === filteredWords.length - 1
                    ? "bg-gray-600"
                    : "bg-indigo-500"
                } text-white transition-colors duration-300`}
              >
                <ChevronRight size={24} />
              </button>
            </>
          ) : (
            <p className="text-center text-white text-lg font-semibold">
              No words found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const DictionaryCard = ({ word, isBookmarked, onBookmark }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const pronounceWord = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`bg-gray-800 shadow-xl rounded-lg overflow-hidden border ${
        isBookmarked ? "border-yellow-500" : "border-gray-600"
      } p-4 sm:p-6 w-[90vw] max-h-[100vh]`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-left">
          {word.word}
        </h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            className={`p-2 sm:p-3 rounded-full ${
              isPlaying
                ? "bg-indigo-600 text-white"
                : "bg-indigo-500 text-white"
            } transition-colors duration-300`}
            onClick={pronounceWord}
            disabled={isPlaying}
          >
            <Volume2 size={24} />
          </button>
          <button
            className={`p-2 sm:p-3 rounded-full ${
              isBookmarked
                ? "bg-yellow-500 text-white"
                : "bg-indigo-500 text-white"
            } transition-colors duration-300`}
            onClick={onBookmark}
          >
            <Bookmark size={24} />
          </button>
        </div>
      </div>

      <p className="text-base sm:text-lg text-indigo-300 mb-4 font-medium text-left">
        {word.part_of_speech}
      </p>

      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-indigo-200 text-left">
          <Book className="mr-2" size={20} />
          Meanings
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300 text-left">
          {word.meaning.map((meaning, index) => (
            <li key={index} className="text-sm sm:text-base">
              {meaning}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-200">
            Synonyms
          </h3>
          <div className="flex flex-wrap gap-2">
            {word.synonyms.map((synonym, index) => (
              <span
                key={index}
                className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                {synonym}
              </span>
            ))}
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-200">
            Antonyms
          </h3>
          <div className="flex flex-wrap gap-2">
            {word.antonyms.map((antonym, index) => (
              <span
                key={index}
                className="bg-red-600 text-red-100 px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                {antonym}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 text-left">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-indigo-200">
          <MessageSquare className="mr-2" size={20} />
          Usage Example
        </h3>
        <p className="text-sm sm:text-base text-gray-300 italic bg-indigo-900 p-4 rounded">
          "{word.usage_example}"
        </p>
      </div>

      <div className="mb-6 text-left max-sm:hidden">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-indigo-200">
          <RefreshCcw className="mr-2" size={20} />
          Related Terms
        </h3>
        <div className="flex flex-wrap gap-2">
          {word.related_terms.map((term, index) => (
            <span
              key={index}
              className="bg-green-600 text-green-100 px-3 py-1 rounded-full text-xs sm:text-sm"
            >
              {term}
            </span>
          ))}
        </div>
      </div>

      <div className="text-left max-sm:hidden">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-indigo-200">
          <Info className="mr-2" size={20} />
          Additional Information
        </h3>
        <div className="bg-gray-700 p-4 rounded text-sm sm:text-base space-y-2 text-gray-300">
          <p>
            <span className="font-semibold text-indigo-300">Etymology:</span>{" "}
            {word.etymology}
          </p>
          <p>
            <span className="font-semibold text-indigo-300">Frequency:</span>{" "}
            {word.frequency}
          </p>
          <p>
            <span className="font-semibold text-indigo-300">
              Image Association:
            </span>{" "}
            {word.image_association}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DictionaryApp;
