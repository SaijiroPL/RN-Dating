export interface SpotType {
  id: string;
  title: string;
  elapse: number;
  group: number;
}

export const SPOT_TYPE: SpotType[] = [
  { id: 'restaurant', title: '飲食店', elapse: 60, group: 0 },
  { id: 'cafe', title: 'カフェ', elapse: 60, group: 0 },
  { id: 'bar', title: 'バー', elapse: 60, group: 0 },
  { id: 'bakery', title: 'パン屋', elapse: 10, group: 0 },

  { id: 'clothing_store', title: '衣類品店', elapse: 30, group: 1 },
  { id: 'jewelry_store', title: '宝石店', elapse: 30, group: 1 },
  { id: 'shoe_store', title: '靴屋', elapse: 30, group: 1 },
  { id: 'furniture_store', title: '家具屋', elapse: 60, group: 1 },
  { id: 'home_goods_store', title: '家庭用品店', elapse: 60, group: 1 },
  { id: 'book_store', title: '書店', elapse: 30, group: 1 },
  { id: 'pet_store', title: 'ペットショップ', elapse: 20, group: 1 },
  { id: 'supermarket', title: 'スーパーマーケット', elapse: 30, group: 1 },

  { id: 'department_store', title: 'デパート', elapse: 120, group: 2 },
  { id: 'shopping_mall', title: 'ショッピングモール', elapse: 120, group: 2 },
  { id: 'lodging', title: '宿泊施設', elapse: 720, group: 2 },

  { id: 'bowling_alley', title: 'ボーリング場', elapse: 120, group: 3 },
  { id: 'amusement_park', title: '遊園地', elapse: 300, group: 3 },
  { id: 'campground', title: 'キャンプ場', elapse: 300, group: 3 },
  { id: 'park', title: '公園', elapse: 60, group: 3 },
  { id: 'tourist_attraction', title: '観光の名所', elapse: 60, group: 3 },
  { id: 'spa', title: '温泉', elapse: 60, group: 3 },
  { id: 'zoo', title: '動物園', elapse: 180, group: 3 },
  { id: 'aquarium', title: '水族館', elapse: 180, group: 3 },
  { id: 'art_gallery', title: '美術館', elapse: 180, group: 3 },
  { id: 'museum', title: '博物館', elapse: 180, group: 3 },
  { id: 'movie_theater', title: '映画館', elapse: 180, group: 3 },
  { id: 'library', title: '図書館', elapse: 60, group: 3 },
  { id: 'night_club', title: 'ナイトクラブ', elapse: 120, group: 3 },
];

export const SPOT_TYPE_GROUP = [
  '飲食系',
  'ショップ系',
  '大型施設系',
  'レジャー施設系',
];

export const getSpotTypesByGroup = (group: number) =>
  SPOT_TYPE.filter((item) => item.group === group);

export function getTypeIndex(id: string) {
  let res = -1;
  for (let i = 0; i < SPOT_TYPE.length; i += 1) {
    if (id === SPOT_TYPE[i].id) {
      res = i;
      break;
    }
  }

  return res;
}

export function getRightSpotType(types: string[]) {
  let typeIdx = -1;
  types.forEach((value) => {
    if (getTypeIndex(value) >= 0) typeIdx = getTypeIndex(value);
  });

  return typeIdx;
}
