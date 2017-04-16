let houses = [];

const add = (name, extra = {}) => {
  let house = {
    name,
    ...extra
  };
  houses.push(house);
  return house;
};

export const pfoho = add('Pforzheimer', {nickname: 'Pfoho'});
export const quincy = add('Quincy');
export const leverett = add('Leverett');

export default houses;
