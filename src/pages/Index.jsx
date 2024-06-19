import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const exampleImages = [
  "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1564866657315-3aa2aef54e5d?w=800&dpr=2&q=80",
  "https://images.unsplash.com/photo-1573497019410-9d3fdb4ef0d7?w=800&dpr=2&q=80"
];

const Index = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://freider-kive-demo--sglang-inference-web-api.modal.run", {
        image_url: selectedImage,
        question: question
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error fetching the answer:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with an Image</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Example Images</h2>
          <div className="grid grid-cols-2 gap-2">
            {exampleImages.map((url, index) => (
              <AspectRatio key={index} ratio={16 / 9} className="cursor-pointer" onClick={() => handleImageClick(url)}>
                <img src={url} alt={`Example ${index + 1}`} className="rounded-md object-cover" />
              </AspectRatio>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Selected Image</h2>
          {selectedImage && (
            <AspectRatio ratio={16 / 9}>
              <img src={selectedImage} alt="Selected" className="rounded-md object-cover" />
            </AspectRatio>
          )}
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full mb-2"
        />
        <Button onClick={handleSubmit} className="w-full">Ask AI</Button>
      </div>
      {answer && (
        <Card>
          <CardHeader>
            <CardTitle>AI Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;