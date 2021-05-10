const data1 = {
  pinCode: '111111',
  unitCode: '0120',
  mccCode: '0040040668',
  mccMobile: '9849955829',
  plateCode: '1503',
  regionName: 'HYDERABAD-1',
  unitName: 'CHEVELLA',
  mccName: 'M.KAMAL REDDY',
  plateName: 'Shankarpally',
  stateName: 'TELANGANA',
  districtName: 'RANGAREDDY',
  mendalName: 'GANDEED',
  panchayatName: 'VENKATREDDY PALLY',
  villageName: 'VENKATREDDY PALLY',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = (queryInterface) => queryInterface.bulkInsert('RegionUnitMccnames', [data1]);
const down = (queryInterface) => queryInterface.bulkDelete('RegionUnitMccnames', null, {});
export { up, down };
