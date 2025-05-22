"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { humanizeText, getCreditsRemaining, HumanizeOptions } from '@/lib/undetectableAI';
// Import the diff library for text comparison
import * as Diff from 'diff';

type HumanizationHistoryItem = {
  id: string;
  timestamp: Date;
  inputText: string;
  outputText: string;
  options: HumanizeOptions;
  characterCount: number;
};

export default function Humanizer() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0); // Progress indicator (0-100)
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [humanizationHistory, setHumanizationHistory] = useState<HumanizationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [options, setOptions] = useState<HumanizeOptions>({
    mode: 'paraphrase',
    readability: 'standard',
    strength: 'medium',
    conservativeness: 'medium',
    tone: 'default'
  });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // Check API connection and fetch available credits on component mount
  useEffect(() => {
    const checkApiAndFetchCredits = async () => {
      setIsLoadingCredits(true);
      setApiStatus('checking');
      
      try {
        const remainingCredits = await getCreditsRemaining();
        setCredits(remainingCredits);
        setApiStatus('connected');
      } catch (err) {
        console.error('Failed to fetch credits:', err);
        setApiStatus('disconnected');
      } finally {
        setIsLoadingCredits(false);
      }
    };
    
    checkApiAndFetchCredits();
  }, []);
  
  // Function to manually test API connection
  const testApiConnection = async () => {
    setIsLoadingCredits(true);
    setApiStatus('checking');
    
    try {
      const remainingCredits = await getCreditsRemaining();
      setCredits(remainingCredits);
      setApiStatus('connected');
      return true;
    } catch (err) {
      console.error('API connection test failed:', err);
      setApiStatus('disconnected');
      return false;
    } finally {
      setIsLoadingCredits(false);
    }
  };
  
  // Generate a unique ID for history items
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Simulate progress updates
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 300);
    return interval;
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    
    // Start progress simulation
    const progressInterval = simulateProgress();
    
    try {
      // Update API status to checking
      setApiStatus('checking');
      
      // Call the Undetectable AI API with the selected options
      try {
        const humanized = await humanizeText(inputText, options);
        setOutputText(humanized);
        
        // Set progress to 100% when complete
        setProgress(100);
        
        // Update API status to connected since we got a response
        setApiStatus('connected');
        
        // Add to history
        const historyItem: HumanizationHistoryItem = {
          id: generateId(),
          timestamp: new Date(),
          inputText,
          outputText: humanized,
          options: {...options},
          characterCount: inputText.length
        };
        
        setHumanizationHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 items
      } catch (humanizeError: unknown) {
        console.error('Error during humanization:', humanizeError);
        const errorMessage = humanizeError instanceof Error ? humanizeError.message : 'Unknown error';
        setError(`Humanization failed: ${errorMessage}`);
        setApiStatus('disconnected');
        
        // Set progress to 100% to stop the progress animation
        setProgress(100);
      }
      
      // History is now added inside the try block
      
      // Refresh credits after successful humanization
      try {
        const remainingCredits = await getCreditsRemaining();
        setCredits(remainingCredits);
      } catch (creditErr) {
        console.error('Failed to refresh credits:', creditErr);
      }
    } catch (err) {
      console.error('Error humanizing text:', err);
      setError(`Failed to humanize text: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Update API status to disconnected since we got an error
      setApiStatus('disconnected');
      
      // Our API integration now handles fallback internally, so we don't need this code anymore
      // The humanizeText function will return a fallback humanized text if the API fails
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };
  
  // Helper function to handle option changes
  const handleOptionChange = (key: keyof HumanizeOptions, value: string) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          {showHistory ? 'Hide History' : 'Show History'} 
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
            {humanizationHistory.length}
          </span>
        </button>
      </div>

      {showHistory && humanizationHistory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 overflow-auto max-h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Humanization History</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const dataStr = JSON.stringify(humanizationHistory, null, 2);
                  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
                  const exportFileDefaultName = `ai-humanizer-history-${new Date().toISOString().slice(0, 10)}.json`;
                  
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                }}
              >
                Export History
              </Button>
              
              <label className="cursor-pointer">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => document.getElementById('import-history-input')?.click()}
                >
                  Import History
                </Button>
                <input
                  id="import-history-input"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const importedHistory = JSON.parse(event.target?.result as string);
                        if (Array.isArray(importedHistory)) {
                          // Convert string dates back to Date objects
                          const processedHistory = importedHistory.map(item => ({
                            ...item,
                            timestamp: new Date(item.timestamp)
                          }));
                          
                          setHumanizationHistory(prev => {
                            // Merge histories, avoid duplicates by ID, and keep most recent 50 items
                            const combined = [...processedHistory, ...prev];
                            const uniqueIds = new Set();
                            const uniqueHistory = combined.filter(item => {
                              if (uniqueIds.has(item.id)) return false;
                              uniqueIds.add(item.id);
                              return true;
                            });
                            return uniqueHistory.slice(0, 50);
                          });
                          alert(`Successfully imported ${processedHistory.length} history items`);
                        } else {
                          throw new Error('Invalid history format');
                        }
                      } catch (err) {
                        console.error('Error importing history:', err);
                        alert('Failed to import history. Please make sure the file is a valid JSON export.');
                      }
                      
                      // Clear the input to allow importing the same file again
                      e.target.value = '';
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="space-y-4">
            {humanizationHistory.map((item) => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {item.timestamp.toLocaleString()}
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                    {item.characterCount} characters
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div className="text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded max-h-[100px] overflow-auto">
                    <div className="font-medium mb-1 text-gray-500 dark:text-gray-400">Input:</div>
                    {item.inputText.substring(0, 150)}{item.inputText.length > 150 ? '...' : ''}
                  </div>
                  <div className="text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded max-h-[100px] overflow-auto">
                    <div className="font-medium mb-1 text-gray-500 dark:text-gray-400">Output:</div>
                    {item.outputText.substring(0, 150)}{item.outputText.length > 150 ? '...' : ''}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                    Mode: {item.options.mode}
                  </span>
                  <span className="text-xs bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                    Tone: {item.options.tone}
                  </span>
                  <span className="text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">
                    Strength: {item.options.strength}
                  </span>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => {
                      setInputText(item.inputText);
                      setOptions(item.options);
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Reuse Settings
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">AI Humanizer</h2>
              <div className="flex items-center">
                <span 
                  className={`inline-block w-2 h-2 rounded-full mr-1 ${apiStatus === 'connected' 
                    ? 'bg-green-500' 
                    : apiStatus === 'checking' 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'}`}
                ></span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {apiStatus === 'connected' 
                    ? 'API Connected' 
                    : apiStatus === 'checking' 
                      ? 'Checking API...' 
                      : 'API Disconnected'}
                </span>
                {apiStatus === 'disconnected' && (
                  <button 
                    onClick={testApiConnection}
                    className="ml-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    disabled={isLoadingCredits}
                  >
                    Test Connection
                  </button>
                )}
              </div>
            </div>
            {credits !== null && (
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                {isLoadingCredits ? 'Loading credits...' : `${credits} credits remaining`}
              </span>
            )}
          </div>
          
          <div className="mb-2 text-gray-700 dark:text-gray-300 text-sm">
            Enter your text below to humanize it and make it undetectable by AI detection tools.
          </div>
          
          {apiStatus === 'disconnected' && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">API Connection Issue</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    Unable to connect to the Undetectable AI API. The application is running in fallback mode with limited functionality. 
                    Your text will still be humanized, but the quality may be lower than when using the API.
                  </p>
                  <button 
                    onClick={testApiConnection}
                    className="mt-2 text-xs bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-colors"
                    disabled={isLoadingCredits}
                  >
                    {isLoadingCredits ? 'Testing...' : 'Test API Connection'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {inputText.length} characters
              </span>
            </div>
          </div>
          
          <Textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your AI-generated text here..."
            className="min-h-[300px] mb-4"
          />
          
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => {
                setInputText("Artificial intelligence has revolutionized many industries by automating tasks, providing insights from data, and enabling new capabilities. Machine learning models can analyze vast amounts of information to identify patterns that humans might miss. These systems continue to improve as they process more data, making them increasingly valuable tools for businesses and researchers alike.");
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Load Sample Text
            </button>
          </div>
          
          <div className="mb-4">
            <button 
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center"
            >
              {showAdvancedOptions ? '- Hide Advanced Options' : '+ Show Advanced Options'}
            </button>
            
            {showAdvancedOptions && (
              <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mode
                    </label>
                    <select 
                      value={options.mode}
                      onChange={(e) => handleOptionChange('mode', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    >
                      <option value="paraphrase">Paraphrase</option>
                      <option value="rewrite">Rewrite</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Paraphrase maintains structure, Rewrite is more creative
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tone
                    </label>
                    <select 
                      value={options.tone}
                      onChange={(e) => handleOptionChange('tone', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    >
                      <option value="default">Default</option>
                      <option value="academic">Academic</option>
                      <option value="casual">Casual</option>
                      <option value="creative">Creative</option>
                      <option value="formal">Formal</option>
                      <option value="friendly">Friendly</option>
                      <option value="professional">Professional</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Adjusts the writing style and voice of the output
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Readability
                    </label>
                    <select 
                      value={options.readability}
                      onChange={(e) => handleOptionChange('readability', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    >
                      <option value="simple">Simple</option>
                      <option value="standard">Standard</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Controls the complexity of the output text
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Strength
                    </label>
                    <select 
                      value={options.strength}
                      onChange={(e) => handleOptionChange('strength', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Higher strength = more changes but may alter meaning
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Conservativeness
                    </label>
                    <select 
                      value={options.conservativeness}
                      onChange={(e) => handleOptionChange('conservativeness', e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Higher conservativeness preserves more of the original text
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {isProcessing && (
            <div className="mb-4">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
                {progress < 100 ? 'Humanizing your text...' : 'Processing complete!'}
              </p>
            </div>
          )}
          
          <Button 
            onClick={handleHumanize} 
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
          >
            {isProcessing ? `Humanizing (${progress}%)` : 'Humanize Text'}
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Humanized Output</h2>
            <div className="flex items-center gap-3">
              {outputText && (
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {showComparison ? 'Hide Comparison' : 'Compare Changes'}
                </button>
              )}
              {outputText && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {outputText.length} characters
                </span>
              )}
            </div>
          </div>
          
          {showComparison && inputText && outputText ? (
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-4 overflow-auto max-h-[400px]">
              <h3 className="text-sm font-medium mb-2">Text Comparison</h3>
              <div className="text-sm">
                {Diff.diffWords(inputText, outputText).map((part: Diff.Change, index: number) => (
                  <span
                    key={index}
                    className={`${part.added ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 
                      part.removed ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 line-through' : 
                      ''}`}
                  >
                    {part.value}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <Textarea 
              value={outputText}
              readOnly
              placeholder="Your humanized text will appear here..."
              className="min-h-[300px] mb-4"
            />
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                if (outputText) {
                  navigator.clipboard.writeText(outputText);
                  alert('Copied to clipboard!');
                }
              }}
              disabled={!outputText}
              className="flex-1"
            >
              Copy to Clipboard
            </Button>
            
            {outputText && (
              <Button 
                variant="secondary" 
                onClick={() => {
                  // Create a download link for the text
                  const element = document.createElement('a');
                  const file = new Blob([outputText], {type: 'text/plain'});
                  element.href = URL.createObjectURL(file);
                  element.download = 'humanized-text.txt';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="flex-1"
              >
                Download as Text File
              </Button>
            )}
          </div>
          
          {outputText && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">Humanization Complete</p>
              <p>Your text has been humanized using the following settings:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Mode: <span className="font-medium capitalize">{options.mode}</span></li>
                <li>Tone: <span className="font-medium capitalize">{options.tone === 'default' ? 'Default' : options.tone}</span></li>
                <li>Readability: <span className="font-medium capitalize">{options.readability}</span></li>
                <li>Strength: <span className="font-medium capitalize">{options.strength}</span></li>
                <li>Conservativeness: <span className="font-medium capitalize">{options.conservativeness}</span></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
    </div>
  );
}
