export const SPOT_TYPE = [
  { id: 'amusement_park', title: '遊園地' },
  { id: 'aquarium', title: '水族館' },
  { id: 'art_gallery', title: 'アートギャラリー' },
  { id: 'bakery', title: 'ベーカリー' },
  { id: 'bar', title: 'バー' },
  { id: 'book_store', title: '書店' },
  { id: 'bowling_alley', title: 'ボーリング場' },
  { id: 'cafe', title: 'カフェ' },
  { id: 'campground', title: 'キャンプ場' },
  { id: 'clothing_store', title: '衣料品店' },
  { id: 'department_store', title: 'デパート' },
  { id: 'furniture_store', title: '家具屋' },
  { id: 'home_goods_store', title: '家庭用品店' },
  { id: 'jewelry_store', title: '宝石店' },
  { id: 'library', title: '図書館' },
  { id: 'lodging', title: '宿泊' },
  { id: 'movie_theater', title: '映画館' },
  { id: 'museum', title: '博物館' },
  { id: 'night_club', title: 'ナイトクラブ' },
  { id: 'park', title: 'パーク' },
  { id: 'pet_store', title: 'ペットショップ' },
  { id: 'restaurant', title: '飲食店' },
  { id: 'shoe_store', title: '靴屋' },
  { id: 'shopping_mall', title: 'ショッピングモール' },
  { id: 'spa', title: 'スパ' },
  { id: 'supermarket', title: 'スーパーマーケット' },
  { id: 'tourist_attraction', title: '観光の名所' },
  { id: 'zoo', title: '動物園' },
];

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
