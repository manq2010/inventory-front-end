export const breedsApiResponse = {
  totalItems: 0,
  page: 0,
  itemsPerPage: 0,
  results: [],
};

export const breed = {
  id: '',
  name: '',
  temperament: '',
  life_span: '',
  alt_names: '',
  wikipedia_url: '',
  origin: '',
  country_code: '',
  image: {
    height: 0,
    id: '',
    url: '',
    width: 0,
  },
  bred_for: '',
  breed_group: '',
};

export const breedImage = {
  height: 0,
  id: '',
  url: '',
  width: 0,
};

export const updateTableRequest = {
  table: 'breedsTable',
  prop: '',
  value: null,
};

export const tableState = {
  itemsPerPage: 0,
  page: 0,
  totalItems: 0,
  ordering: null,
  filters: null,
  searchQuery: null,
  apiQuery: '',
  isLoading: false,
  error: null,
};

export const dogsPathsEnum = {
  breeds: '/v1/breeds',
};
