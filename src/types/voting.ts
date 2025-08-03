export interface VoteOption {
  id: string;
  label: string;
  labelNepali?: string;
  votes: number;
  emoji?: string;
}

export interface VotingPost {
  id: string;
  title: string;
  titleNepali?: string;
  description: string;
  category: 'daily' | 'politician' | 'community' | 'sports' | 'entertainment';
  votingType: VotingCardType;
  options: VoteOption[];
  totalVotes: number;
  endTime?: Date;
  isActive: boolean;
  location?: string;
  imageUrl?: string;
}

export type VotingCardType = 
  | 'traditional'
  | 'faceoff' 
  | 'multichoice'
  | 'swipe'
  | 'quickpoll'
  | 'yesno'
  | 'ranking'
  | 'gift'
  | 'timer'
  | 'geo'
  | 'story'
  | 'prediction'
  | 'bracket';

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  votes: number;
  reaction: 'gajjab' | 'bekar' | 'yesto-ni-hunxa' | null;
}