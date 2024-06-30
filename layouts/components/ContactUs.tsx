import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = ({ questions }: any) => {
  const [question, setQuestion] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const data = {
      question: question,
      topic: name,
      publishedAt: null,
    };
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data }),
      });
  
      if (response.ok) {
        const result = await response.json();
        setResponseMessage('Your question has been submitted successfully.');
        setQuestion('');
        setName('');
        toast.success('Your question has been submitted successfully.');
      } else {
        setResponseMessage('Failed to submit your question. Please try again.');
        toast.error('Failed to submit your question. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };
  

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="flex items-center justify-center mb-8">
        <img src="/images/question.png" alt="Logo" style={{ height: '4rem', width: 'auto' }} />
      </div>
      <h3 className="font-light text-center">Ask Our Imam Anything</h3>
      <p className="text-center mt-4">Get all your islamic doubts cleared, this form is completely anonymous!</p>

      <div className="mt-4 row pb-0">
        <div className="col-12 md:col-6 lg:col-7">
          <form className="contact-form" method="POST" onSubmit={handleSubmit}>
            <textarea
              className="border-none w-full resize-none mb-3 p-4 rounded-2xl shadow-sm "
              rows={6}
              maxLength={500}
              name="question"
              value={question}
              onChange={(e) => setQuestion(e?.target?.value)}
              placeholder="Type your question here..."
              required
            />
            <div className="flex items-center justify-center">
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
          {responseMessage && <p className="mt-4 text-green-500">{responseMessage}</p>}
        </div>
      </div>

      <div className="mt-8">
        <p className="font-medium mb-4">Others frequently ask...</p>
        <div className="space-y-4">
          {questions?.data.map((item: any) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow cursor-pointer" onClick={() => toggleQuestion(item.id)}>
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">{item.attributes.question || "Untitled Question"}</p>
                <span className="font-light text-gray-800">{openQuestionId === item.id ?      <img src="/images/up-arrow.png" alt="Logo" style={{ height: '1rem', width: 'auto' }} /> :      <img src="/images/down-arrow.png" alt="Logo" style={{ height: '1rem', width: 'auto' }} />}</span>
              </div>
              {openQuestionId === item.id && (
                <div className="mt-2 text-gray-600">
                  {item.attributes.answer && <p className="mt-2">{item.attributes.answer}</p>}
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default ContactUs;
