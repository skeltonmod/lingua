export interface Language {
  id: string;
  name: string;
  nativeName: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  studentsCount: number;
  tutorsCount: number;
}

export const languages: Language[] = [
  {
    id: "english",
    name: "English",
    nativeName: "English",
    image: "https://images.pexels.com/photos/13464100/pexels-photo-13464100.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Beginner",
    studentsCount: 24856,
    tutorsCount: 1245
  },
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    image: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Beginner",
    studentsCount: 18743,
    tutorsCount: 987
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    image: "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Intermediate",
    studentsCount: 15621,
    tutorsCount: 845
  },
  {
    id: "german",
    name: "German",
    nativeName: "Deutsch",
    image: "https://images.pexels.com/photos/1486577/pexels-photo-1486577.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Intermediate",
    studentsCount: 12453,
    tutorsCount: 678
  },
  {
    id: "italian",
    name: "Italian",
    nativeName: "Italiano",
    image: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Intermediate",
    studentsCount: 9876,
    tutorsCount: 542
  },
  {
    id: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    image: "https://images.pexels.com/photos/2830460/pexels-photo-2830460.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Intermediate",
    studentsCount: 7654,
    tutorsCount: 423
  },
  {
    id: "russian",
    name: "Russian",
    nativeName: "Русский",
    image: "https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Advanced",
    studentsCount: 6543,
    tutorsCount: 321
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    image: "https://images.pexels.com/photos/2187662/pexels-photo-2187662.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Advanced",
    studentsCount: 8765,
    tutorsCount: 432
  },
  {
    id: "chinese",
    name: "Chinese",
    nativeName: "中文",
    image: "https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg?auto=compress&cs=tinysrgb&w=300",
    difficulty: "Advanced",
    studentsCount: 9871,
    tutorsCount: 465
  },
  {
    id: "korean",
    name: "Korean",
    nativeName: "한국어",
    image: "https://images.pexels.com/photos/2320949/pexels-photo-2320949.jpeg?auto=compress&cs=tinysrgb&w=300", 
    difficulty: "Advanced",
    studentsCount: 5432,
    tutorsCount: 245
  }
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find(language => language.id === id);
}