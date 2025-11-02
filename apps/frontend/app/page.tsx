'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'No response',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not reach backend' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWebsite = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const code = data.choices?.[0]?.message?.content || '';
      setGeneratedCode(code);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>DLXStudios.ai</h1>
        <p>AI Web Development Studio</p>
      </div>

      <div className={styles.workspace}>
        <div className={styles.chatPanel}>
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} className={styles.message}>
                <strong>{msg.role}:</strong> {msg.content}
              </div>
            ))}
            {loading && <div className={styles.loading}>Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the website you want to create..."
              className={styles.textarea}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className={styles.buttonGroup}>
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className={styles.button}
              >
                Send Message
              </button>
              <button
                onClick={handleGenerateWebsite}
                disabled={loading}
                className={styles.button}
              >
                Generate Website
              </button>
            </div>
          </div>
        </div>

        <div className={styles.previewPanel}>
          <div className={styles.codeViewer}>
            {generatedCode ? (
              <pre><code>{generatedCode}</code></pre>
            ) : (
              <p>Generated code will appear here...</p>
            )}
          </div>
          <div className={styles.preview}>
            {generatedCode && (
              <iframe
                srcDoc={generatedCode}
                title="Website Preview"
                className={styles.iframe}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
