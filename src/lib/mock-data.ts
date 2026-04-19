import { Question } from '@/types';

export const mockQuestions: Question[] = [
  // --- META QUESTIONS ---
  {
    id: 'm1', test_id: '8-10', type: 'meta',
    question_text: 'I have clarity about my career goals',
    options: [
      { id: 'm1_1', text: 'Strongly Agree', value: 5 },
      { id: 'm1_2', text: 'Agree', value: 4 },
      { id: 'm1_3', text: 'Neutral', value: 3 },
      { id: 'm1_4', text: 'Disagree', value: 2 },
      { id: 'm1_5', text: 'Strongly Disagree', value: 1 }
    ],
    mappings: [{ trait: 'profiling_score', weight: 1 }]
  },
  {
    id: 'm2', test_id: '8-10', type: 'meta',
    question_text: 'What career do you want to pursue?',
    options: [
      { id: 'c_eng', text: 'Engineering', value: 0, textValue: 'Engineering' },
      { id: 'c_med', text: 'Medical', value: 0, textValue: 'Medical' },
      { id: 'c_art', text: 'Arts/Design', value: 0, textValue: 'Arts/Design' },
      { id: 'c_biz', text: 'Business', value: 0, textValue: 'Business' }
    ],
    mappings: [{ trait: 'career_choice', weight: 1 }]
  },
  {
    id: 'm3', test_id: '8-10', type: 'meta',
    question_text: 'What career do your parents want you to pursue?',
    options: [
      { id: 'p_eng', text: 'Engineering', value: 0, textValue: 'Engineering' },
      { id: 'p_med', text: 'Medical', value: 0, textValue: 'Medical' },
      { id: 'p_art', text: 'Arts/Design', value: 0, textValue: 'Arts/Design' },
      { id: 'p_biz', text: 'Business', value: 0, textValue: 'Business' }
    ],
    mappings: [{ trait: 'parent_choice', weight: 1 }]
  },

  // --- PSYCHOMETRIC QUESTIONS ---
  {
    id: 'q1', test_id: '8-10', type: 'psychometric',
    question_text: 'I enjoy working alone',
    options: [
      { id: 'o1', text: 'Yes', value: 3 },
      { id: 'o2', text: 'Not Sure', value: 2 },
      { id: 'o3', text: 'No', value: 1 }
    ],
    mappings: [{ trait: 'introvert', weight: 1 }, { trait: 'independence', weight: 1 }]
  },
  {
    id: 'q2', test_id: '8-10', type: 'psychometric',
    question_text: 'When making decisions, you rely more on objective logic.',
    options: [
      { id: 'o1', text: 'Yes', value: 3 },
      { id: 'o2', text: 'Not Sure', value: 2 },
      { id: 'o3', text: 'No', value: 1 }
    ],
    mappings: [{ trait: 'thinking', weight: 1 }]
  },
  
  // --- APTITUDE QUESTIONS ---
  {
    id: 'q5', test_id: '8-10', type: 'aptitude',
    question_text: '5 + 7 = ?',
    options: [
      { id: 'opt_1', text: '10', value: 0 },
      { id: 'opt_2', text: '11', value: 0 },
      { id: 'opt_3', text: '12', value: 0 },
      { id: 'opt_4', text: '13', value: 0 }
    ],
    correct_answer: 'opt_3',
    mappings: [{ trait: 'numerical', weight: 10 }]
  },
  {
    id: 'q6', test_id: '8-10', type: 'aptitude',
    question_text: 'If all bloops are razzies and all razzies are lazzies, are all bloops lazzies?',
    options: [
      { id: 'opt_true', text: 'Yes', value: 0 },
      { id: 'opt_false', text: 'No', value: 0 },
      { id: 'opt_maybe', text: 'Cannot be determined', value: 0 }
    ],
    correct_answer: 'opt_true',
    mappings: [{ trait: 'logical', weight: 10 }]
  }
];
