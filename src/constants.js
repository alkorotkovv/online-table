//Функция округления
export const ceil = (val, round = 0, nullAble = true) => {
  if(val == null && nullAble) {
    return null;
  } else if (val == null && !nullAble) {
    return 0;
  }
  else {
    let multi = Math.pow(10, round)
    return (Math.floor(+val.toFixed(round) * multi) / multi)
  }
};

//Функция проверки на NULL
export const checkNull = (value, replace) => {
  return value === null ? replace : value
}

//Функция фильтрации массива объектов
export const filterBy = (array, field, filter) => {
  return array.filter(item =>  item[field].toUpperCase().includes(filter.toUpperCase()));
}

export const sortArrayByField = (array, field, order) => {
  return (order === "asc")
    ? [...array].sort((a, b) => a[field] < b[field] || a[field] === null ? 1: -1)
    : [...array].sort((a, b) => a[field] > b[field] || b[field] === null ? 1: -1)
}

export const createData = (id, nomer_osr, naimenovanie_obekta, naimenovanie_dokumenta, kks_kod_komplekta_rd, nomer_smety_po_mds,data_razrabotki_komplekta_plan,otvetstvennaya_organizaciya
  ,identifikator_raboty,nazvanie_raboty,status_raboty) => {
  return {
    id:id+1000,
    nomer_osr,
    naimenovanie_obekta,
    naimenovanie_dokumenta,
    kks_kod_komplekta_rd,
    nomer_smety_po_mds,
    data_razrabotki_komplekta_plan,
    otvetstvennaya_organizaciya,
    identifikator_raboty,
    nazvanie_raboty,
    status_raboty
  };
}

export const maxContainerHeight = 300;

export const headCells = [
  {
    id: 'num',
    numeric: true,
    disablePadding: true,
    label: '№',
    width: 66,
    fixed: true
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'id',
    width: 100,
    fixed: true
  },
  {
    id: 'nomer_osr',
    numeric: false,
    disablePadding: true,
    // label: 'Номер ОСР',
    label: 'A',
    width: 120,
    fixed: true
  },
  {
    id: 'naimenovanie_obekta',
    numeric: true,
    disablePadding: false,
    // label: 'Наименование объекта',
    label: 'B',
    width: 200,
    fixed: true
  },
  {
    id: 'naimenovanie_dokumenta',
    numeric: true,
    disablePadding: false,
    // label: 'Наименование документа',
    label: 'C',
    width: 250,
    fixed: false
  },
  {
    id: 'kks_kod_komplekta_rd',
    numeric: true,
    disablePadding: false,
    label: 'D',
    width: 200,
    fixed: false
  },
  {
    id: 'nomer_smety_po_mds',
    numeric: true,
    disablePadding: false,
    label: 'E',
    width: 180,
    fixed: false
  },
  {
    id: 'data_razrabotki_komplekta_plan',
    numeric: false,
    disablePadding: true,
    // label: 'Дата разработки комплекта (план)',
    label: 'F',
    width: 200,
    fixed: false
  },
  {
    id: 'otvetstvennaya_organizaciya',
    numeric: true,
    disablePadding: false,
    label: 'G',
    width: 180,
    fixed: false
  },
  {
    id: 'identifikator_raboty',
    numeric: true,
    disablePadding: false,
    label: 'H',
    width: 120,
    fixed: false
  },
  {
    id: 'nazvanie_raboty',
    numeric: true,
    disablePadding: false,
    label: 'I',
    width: 300,
    fixed: false
  },
  {
    id: 'status_raboty',
    numeric: true,
    disablePadding: false,
    label: 'J',
    width: 140,
    fixed: false
  },
];

export const secondaryHeadCells = [
  {
    id: 'num',
    numeric: true,
    disablePadding: true,
    label: '№',
    width: 66,
    fixed: true
  },
  {
    id: 'Идентификатор',
    numeric: true,
    disablePadding: true,
    // label: 'Идентификатор',
    label: '1',
    width: 170,
    fixed: true
  },
  {
    id: 'Маркировка (код KKS)\r\nарматуры',
    numeric: false,
    disablePadding: true,
    // label: 'Маркировка (код KKS) арматуры',
    label: '2',
    width: 180,
    fixed: true
  },
  {
    id: 'Наименование',
    numeric: true,
    disablePadding: false,
    // label: 'Наименование',
    label: '3',
    width: 200,
    fixed: true
  },
  {
    id: 'Тип, марка, модель, шифр *',
    numeric: true,
    disablePadding: false,
    // label: 'Тип, марка, модель, шифр *',
    label: '4',
    width: 250,
    fixed: true
  },
  {
    id: 'Классификационное обозначение арматуры по НП-068-05',
    numeric: true,
    disablePadding: false,
    // label: 'Классификационное обозначение арматуры по НП-068-05',
    label: '5',
    width: 180,
    fixed: true
  },
  {
    id: 'Категория обеспечения качества',
    numeric: true,
    disablePadding: false,
    // label: 'Категория обеспечения качества',
    label: '6',
    width: 180,
    fixed: false
  },
  {
    id: 'data_razrabotki_komplekta_plan',
    numeric: false,
    disablePadding: true,
    // label: 'Дата разработки комплекта (план)',
    label: '7',
    width: 200,
    fixed: false
  },
  {
    id: 'otvetstvennaya_organizaciya',
    numeric: true,
    disablePadding: false,
    // label: 'Ответственная организация',
    label: '8',
    width: 180,
    fixed: false
  },
  {
    id: 'identifikator_raboty',
    numeric: true,
    disablePadding: false,
    // label: 'ИД работы',
    label: '9',
    width: 120,
    fixed: false
  },
  {
    id: 'nazvanie_raboty',
    numeric: true,
    disablePadding: false,
    // label: 'Название работы',
    label: '10',
    width: 300,
    fixed: false
  },
  {
    id: 'status_raboty',
    numeric: true,
    disablePadding: false,
    // label: 'Статус работы',
    label: '11',
    width: 140,
    fixed: false
  },
];

export const rowsPerPageOptions = [5, 10, 25, 30, 50, 100, 200, 500, 1000, 10000];

export const options = [
  {
    id: -1,
    name: '',
    info: ''
  },
  {
    id: 1,
    name: 'Опция 1',
    info: 'Доп информация 1'
  },
  {
    id: 2,
    name: 'Опция 2',
    info: 'Доп информация 2'
  },
  {
    id: 3,
    name: 'Опция 3',
    info: 'Доп информация 3'
  },
  {
    id: 4,
    name: 'Опция 4',
    info: 'Доп информация 4'
  },
];

export const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3, 1, 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9, 1, 305, 3.7, 67, 4.3),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0, 2, 305, 3.7, 67, 4.3),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0, 4, 305, 3.7, 67, 4.3),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9, 3, 305, 3.7, 67, 4.3),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5, 1, 305, 3.7, 67, 4.3),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3, 2, 305, 3.7, 67, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0, 2, 305, 3.7, 67, 4.3),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0, 3, 305, 3.7, 67, 4.3),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0, 4, 305, 3.7, 67, 4.3),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0, 2, 305, 3.7, 67, 4.3),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0, 1, 305, 3.7, 67, 4.3),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0, 4, 305, 3.7, 67, 4.3),
  createData(14, 'Cupcake', 305, 3.7, 67, 4.3, 1, 305, 3.7, 67, 4.3),
  createData(15, 'Donut', 452, 25.0, 51, 4.9, 2, 305, 3.7, 67, 4.3),
  createData(16, 'Eclair', 262, 16.0, 24, 6.0, 4, 305, 3.7, 67, 4.3),
  createData(17, 'Frozen yoghurt', 159, 6.0, 24, 4.0, 3, 305, 3.7, 67, 4.3),
  createData(18, 'Gingerbread', 356, 16.0, 49, 3.9, 2, 305, 3.7, 67, 4.3),
  createData(19, 'Honeycomb', 408, 3.2, 87, 6.5, 1, 305, 3.7, 67, 4.3),
  createData(20, 'Ice cream sandwich', 237, 9.0, 37, 4.3, 1, 305, 3.7, 67, 4.3),
  createData(21, 'Jelly Bean', 375, 0.0, 94, 0.0, 2, 305, 3.7, 67, 4.3),
  createData(22, 'KitKat', 518, 26.0, 65, 7.0, 2, 305, 3.7, 67, 4.3),
  createData(23, 'Lollipop', 392, 0.2, 98, 0.0, 3, 305, 3.7, 67, 4.3),
  createData(24, 'Marshmallow', 318, 0, 81, 2.0, 2, 305, 3.7, 67, 4.3),
  createData(25, 'Nougat', 360, 19.0, 9, 37.0, 1, 305, 3.7, 67, 4.3)
];

