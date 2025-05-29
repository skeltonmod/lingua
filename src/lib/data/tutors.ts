export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  languages: { name: string; level: string }[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  specialties: string[];
  description: string;
  availability: { day: string; slots: string[] }[];
}

export const tutors: Tutor[] = [
  {
    id: "t1",
    name: "Emma Johnson",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300",
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" }
    ],
    rating: 4.8,
    reviews: 235,
    hourlyRate: 25,
    specialties: ["Conversation", "Business", "IELTS"],
    description: "Certified English teacher with 7 years of experience. I specialize in business English and exam preparation.",
    availability: [
      { day: "Monday", slots: ["9:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Wednesday", slots: ["9:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["9:00", "10:00", "11:00", "15:00", "16:00"] }
    ]
  },
  {
    id: "t2",
    name: "Miguel Sanchez",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Fluent" }
    ],
    rating: 4.9,
    reviews: 187,
    hourlyRate: 22,
    specialties: ["Conversation", "Grammar", "Pronunciation"],
    description: "Spanish teacher from Madrid with a passion for helping students speak confidently.",
    availability: [
      { day: "Tuesday", slots: ["8:00", "9:00", "10:00", "18:00", "19:00"] },
      { day: "Thursday", slots: ["8:00", "9:00", "10:00", "18:00", "19:00"] },
      { day: "Saturday", slots: ["10:00", "11:00", "12:00"] }
    ]
  },
  {
    id: "t3",
    name: "Sophie Dubois",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
    languages: [
      { name: "French", level: "Native" },
      { name: "English", level: "Fluent" },
      { name: "German", level: "Intermediate" }
    ],
    rating: 4.7,
    reviews: 156,
    hourlyRate: 24,
    specialties: ["Conversation", "Culture", "DELF Exam"],
    description: "Parisian French teacher with a focus on conversational French and cultural immersion.",
    availability: [
      { day: "Monday", slots: ["12:00", "13:00", "14:00", "19:00", "20:00"] },
      { day: "Wednesday", slots: ["12:00", "13:00", "14:00", "19:00", "20:00"] },
      { day: "Friday", slots: ["12:00", "13:00", "14:00"] }
    ]
  },
  {
    id: "t4",
    name: "Hans Mueller",
    avatar: "https://images.pexels.com/photos/2659177/pexels-photo-2659177.jpeg?auto=compress&cs=tinysrgb&w=300",
    languages: [
      { name: "German", level: "Native" },
      { name: "English", level: "Fluent" }
    ],
    rating: 4.6,
    reviews: 112,
    hourlyRate: 23,
    specialties: ["Grammar", "Business", "Goethe-Zertifikat"],
    description: "German teacher from Berlin with 5 years of experience teaching German for business professionals.",
    availability: [
      { day: "Tuesday", slots: ["10:00", "11:00", "16:00", "17:00", "18:00"] },
      { day: "Thursday", slots: ["10:00", "11:00", "16:00", "17:00", "18:00"] },
      { day: "Saturday", slots: ["13:00", "14:00", "15:00"] }
    ]
  },
  {
    id: "t5",
    name: "Yuki Tanaka",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
    languages: [
      { name: "Japanese", level: "Native" },
      { name: "English", level: "Fluent" }
    ],
    rating: 4.9,
    reviews: 98,
    hourlyRate: 26,
    specialties: ["Conversation", "JLPT Prep", "Business"],
    description: "Tokyo-based Japanese teacher specializing in JLPT preparation and business Japanese.",
    availability: [
      { day: "Monday", slots: ["6:00", "7:00", "8:00", "21:00", "22:00"] },
      { day: "Wednesday", slots: ["6:00", "7:00", "8:00", "21:00", "22:00"] },
      { day: "Friday", slots: ["6:00", "7:00", "8:00"] }
    ]
  }
];

export function getTutorsByLanguage(language: string): Tutor[] {
  if (!language) return tutors;
  
  return tutors.filter(tutor => 
    tutor.languages.some(lang => 
      lang.name.toLowerCase() === language.toLowerCase()
    )
  );
}

export function getTutorById(id: string): Tutor | undefined {
  return tutors.find(tutor => tutor.id === id);
}