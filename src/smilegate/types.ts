export interface CharacterProfile {
  // 서버명
  ServerName: string;
  // 캐릭터명
  CharacterName: string;
  // 전투레벨
  CharacterLevel: number;
  // 직업
  CharacterClassName: string;
  // 아이템 레벨
  ItemAvgLevel: string;
  // 아이템 최대 레벨
  ItemMaxLevel: string;
}

export interface Embed {
  color?: number;
  title?: string;
  url?: string;
  author: {
    name: string;
    icon_url: string;
    url: string;
  };
  description?: string;
  thumbnail?: {
    url: string;
  };
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
  timestamp?: string;
  footer?: {
    text: string;
    icon_url: string;
  };
}
