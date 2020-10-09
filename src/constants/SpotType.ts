export const SPOT_TYPE = [
  { id: 'amusement_park', title: '遊園地', elapse: 300 },
  { id: 'aquarium', title: '水族館', elapse: 180 },
  { id: 'art_gallery', title: 'アートギャラリー', elapse: 180 },
  { id: 'bakery', title: 'ベーカリー', elapse: 10 },
  { id: 'bar', title: 'バー', elapse: 60 },
  { id: 'book_store', title: '書店', elapse: 30 },
  { id: 'bowling_alley', title: 'ボーリング場', elapse: 120 },
  { id: 'cafe', title: 'カフェ', elapse: 60 },
  { id: 'campground', title: 'キャンプ場', elapse: 300 },
  { id: 'clothing_store', title: '衣料品店', elapse: 30 },
  { id: 'department_store', title: 'デパート', elapse: 120 },
  { id: 'furniture_store', title: '家具屋', elapse: 60 },
  { id: 'home_goods_store', title: '家庭用品店', elapse: 60 },
  { id: 'jewelry_store', title: '宝石店', elapse: 30 },
  { id: 'library', title: '図書館', elapse: 60 },
  { id: 'lodging', title: '宿泊', elapse: 720 },
  { id: 'movie_theater', title: '映画館', elapse: 180 },
  { id: 'museum', title: '博物館', elapse: 180 },
  { id: 'night_club', title: 'ナイトクラブ', elapse: 120 },
  { id: 'park', title: 'パーク', elapse: 60 },
  { id: 'pet_store', title: 'ペットショップ', elapse: 20 },
  { id: 'restaurant', title: '飲食店', elapse: 60 },
  { id: 'shoe_store', title: '靴屋', elapse: 30 },
  { id: 'shopping_mall', title: 'ショッピングモール', elapse: 120 },
  { id: 'spa', title: 'スパ', elapse: 60 },
  { id: 'supermarket', title: 'スーパーマーケット', elapse: 30 },
  { id: 'tourist_attraction', title: '観光の名所', elapse: 60 },
  { id: 'zoo', title: '動物園', elapse: 180 },
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
