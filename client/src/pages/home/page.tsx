import { useState, useEffect } from 'react';
import MicIcon from '../../assets/microphone.svg?react';
import { ChatApi } from '../../api/ai-chat';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en-US' | 'ru-RU'>('en-US');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    console.log('Listening:', listening);


    if (!listening && transcript.trim()) {
      console.log('Speech done. Transcript:', transcript);
      handleSend(transcript);
      resetTranscript();
    }
  }, [listening]);

const handleVoiceInput = () => {
  try {
    if (!browserSupportsSpeechRecognition) {
      throw new Error("Browser doesn't support speech recognition.");
    }

    if (listening) {
      SpeechRecognition.stopListening()
        .then(() => console.log('Stopped listening'))
        .catch(err => console.error('Stop error:', err));
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: false,
        interimResults: false,
        language: lang,
      })
        .then(() => console.log('Started listening'))
        .catch(err => console.error('Start error:', err));
    }
  } catch (err) {
    console.error('Voice input error:', err);
  }
};

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride ?? input;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await ChatApi.sendMessage(textToSend);
      const aiMessage: ChatMessage = {
        role: 'ai',
        content: res.answer,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex lg:flex-row flex-col-reverse p-3 lg:p-30 justify-center items-center text-white">
      {/* Left Side */}
      <div className="w-full flex flex-col items-center lg:w-1/2 min-w-[300px]">
        <div className='hidden lg:block'>
          <div className="bg-blue-900 p-3 rounded-xl w-fit h-fit mb-10">
            {/* <ChatIcon width={30} height={32} fill="currentColor" color="#FFFFFF" /> */}
          </div>
          <p className="font-medium text-3xl">Hi there!</p>
          <br />
          <h1 className="font-medium">What would you like to know?</h1>
          <br />
          <p className="font-medium text-3xl mb-50">
            Use one of the most common prompts below <br /> or ask your own
          </p>
        </div>

        <div className='w-full max-w-xl pt-3'>
          <div className="border-4 rounded-3xl border-blue-800 flex items-center pl-4  ">
            <MicIcon
              width={24}
              height={24}
              fill="currentColor"
              color={listening ? "#00FF00" : "#1638aa"}
              onClick={handleVoiceInput}
            />

            <input
              type="text"
              placeholder="Ask whatever you want"
              name="request"
              className="ml-5 flex-1 bg-transparent text-white placeholder-white outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />

            <button
              className="bg-blue-800 rounded-[26px] flex items-center justify-center w-15 h-15 hover:bg-blue-700 transition p-3"
              onClick={() => handleSend()}
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
              ) : (
                '>'
              )}
            </button>
          </div>

          <select
            className="mt-4 w-fit text-white focus:outline-none "
            onChange={(e) => setLang(e.target.value as 'en-US' | 'ru-RU')}
          >
            <option className="text-black" value="en-US">English</option>
            <option className="text-black" value="ru-RU">Русский</option>
          </select>
          </div>


      </div>

      {/* Right Side: Chat history */}
      <div className="lg:w-1/2 min-w-[200px] h-[80vh] overflow-y-auto space-y-4 pl-8 hide-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl max-w-11/12 w-fit ${
              msg.role === 'user' ? 'bg-blue-600 text-left ml-auto ' : 'bg-blue-800 text-left mr-auto'
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="bg-blue-700 p-3 rounded-xl max-w-xl animate-pulse">
            Typing...
          </div>
        )}
      </div>
    </div>
  );
}
