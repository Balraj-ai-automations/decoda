import type { Document, Summary, ChatMessage } from '../types';

export const mockDocuments: Document[] = [
  {
    id: '1',
    filename: 'Government_Scheme_Farmers_2024.pdf',
    uploadDate: '2024-01-15',
    pageCount: 12,
    summary: {
      id: 's1',
      documentId: '1',
      content: 'This document outlines a government agricultural support scheme for farmers. Key highlights include: 1) Financial assistance of up to Rs. 50,000 per hectare for crop cultivation, 2) Subsidized seeds and fertilizers available through registered outlets, 3) Low-interest loans (4% per annum) from participating banks, 4) Crop insurance covering natural disasters, 5) Training programs on modern farming techniques. Farmers must register with their local agricultural office and provide proof of land ownership. The scheme is valid from April 2024 to March 2025.',
      language: 'English',
      createdAt: '2024-01-15T10:30:00Z',
    },
  },
  {
    id: '2',
    filename: 'Medical_Report_Lab_Results.pdf',
    uploadDate: '2024-01-10',
    pageCount: 5,
  },
  {
    id: '3',
    filename: 'Scholarship_Application_Form.pdf',
    uploadDate: '2024-01-08',
    pageCount: 8,
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'm1',
    documentId: '1',
    role: 'user',
    content: 'What is the maximum financial assistance available?',
    createdAt: '2024-01-15T10:35:00Z',
  },
  {
    id: 'm2',
    documentId: '1',
    role: 'assistant',
    content: 'According to the document, farmers can receive financial assistance of up to Rs. 50,000 per hectare for crop cultivation. This amount can vary based on the type of crop and the region, with priority given to drought-prone areas.',
    language: 'English',
    citations: [
      { pageNumber: 2, excerpt: 'Financial assistance of up to Rs. 50,000 per hectare...' },
      { pageNumber: 5, excerpt: 'Priority areas for additional support...' },
    ],
    createdAt: '2024-01-15T10:35:30Z',
  },
  {
    id: 'm3',
    documentId: '1',
    role: 'user',
    content: 'How do I apply for this scheme?',
    createdAt: '2024-01-15T10:40:00Z',
  },
  {
    id: 'm4',
    documentId: '1',
    role: 'assistant',
    content: 'To apply for this scheme, follow these steps: 1) Visit your local agricultural office with proof of land ownership (land deed or patta), 2) Bring identity proof (Aadhaar card, voter ID, or passport), 3) Fill out the registration form (Form A-1 available at the office), 4) Submit passport-size photographs, 5) After verification, you will receive a registration number within 7 working days. The scheme is open for registration from April 1, 2024.',
    language: 'English',
    citations: [
      { pageNumber: 3, excerpt: 'Registration process and documents required...' },
      { pageNumber: 7, excerpt: 'Timeline and important dates...' },
    ],
    createdAt: '2024-01-15T10:40:45Z',
  },
];

export const mockSummary: Summary = {
  id: 's1',
  documentId: '1',
  content: 'This document outlines a government agricultural support scheme for farmers. Key highlights include: 1) Financial assistance of up to Rs. 50,000 per hectare for crop cultivation, 2) Subsidized seeds and fertilizers available through registered outlets, 3) Low-interest loans (4% per annum) from participating banks, 4) Crop insurance covering natural disasters, 5) Training programs on modern farming techniques. Farmers must register with their local agricultural office and provide proof of land ownership. The scheme is valid from April 2024 to March 2025.',
  language: 'English',
  createdAt: '2024-01-15T10:30:00Z',
};

export const mockHindiSummary: Summary = {
  id: 's1-hi',
  documentId: '1',
  content: 'यह दस्तावेज किसानों के लिए एक सरकारी कृषि सहायता योजना की पूरी जानकारी देता है। मुख्य विशेषताएं: १) फसल उपज के लिए प्रति हेक्टेयर ५०,००० रुपये तक की वित्तीय सहायता, २) पंजीकृत आउटलेट्स से सब्सिडी वाले बीज और उर्वरक उपलब्ध, ३) भाग लेने वाले बैंकों से कम ब्याज वाले ऋण (४% प्रति वर्ष), ४) प्राकृतिक आपदाओं को कवर करने वाला फसल बीमा, ५) आधुनिक खेती तकनीकों पर प्रशिक्षण कार्यक्रम। किसानों को अपने स्थानीय कृषि कार्यालय में पंजीकरण कराना होगा और भूमि स्वामित्व का प्रमाण देना होगा। यह योजना अप्रैल २०२४ से मार्च २०२५ तक मान्य है।',
  language: 'Hindi',
  createdAt: '2024-01-15T10:30:00Z',
};

export const mockTamilSummary: Summary = {
  id: 's1-ta',
  documentId: '1',
  content: 'இந்த ஆவணம் விவசாயிகளுக்கான அரசு வேளாண் ஆதரவுத் திட்டத்தை விவரிக்கிறது. முக்கிய சிறப்பம்சங்கள்: ১) பயிர் சாகுபடிக்கு ஒரு ஹெக்டேருக்கு ரூ. 50,000 வரை நிதி உதவி, २) பதிவுசெய்யப்பட்ட நிலையங்களில் மானிய விதைகள் மற்றும் உரங்கள், ३) பங்கேற்கும் வங்கிகளிலிருந்து குறைந்த வட்டி கடன்கள் (ஆண்டுக்கு 4%), ४) இயற்கை பேரிடர்களை உள்ளடக்கிய பயிர் காப்பீடு, ५) நவீன விவசாய நுட்பங்களில் பயிற்சி திட்டங்கள். விவசாயிகள் தங்கள் உள்ளூர் வேளாண் அலுவலகத்தில் பதிவு செய்து நில உரிமைச் சான்று வழங்க வேண்டும். இந்தத் திட்டம் ஏப்ரல் 2024 முதல் மார்ச் 2025 வரை செல்லுபடியாகும்.',
  language: 'Tamil',
  createdAt: '2024-01-15T10:30:00Z',
};
