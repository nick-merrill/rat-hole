let houses = [];

const add = (name) => {
  let house = {
    name,
  };
  houses.push(house);
  return house;
};

export const pfoho = add('Pforzheimer');
export const quincy = add('Quincy');
export const leverett = add('Leverett');

export default houses;
