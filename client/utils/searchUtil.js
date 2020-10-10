import Fuse from 'fuse.js';
import _ from 'lodash';

export const fetchSearchResult = (keyword, data) => {
  const options = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: false,
    includeScore: true,
    findAllMatches: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 5,
    keys: [
      'author',
    ],
  };

  const fuse = new Fuse(data, options); // "data" is the item array
  const searchResult = fuse.search(keyword.trim());
  const resultWithScore =  _.map(searchResult, (individual) => _.merge(individual.item, { score: individual.score }));
  return resultWithScore;
};

export const removeScore = (data) => {
  if(_.get(data, ['0', 'score'])) {
    const result = _.map(data, (item) => _.omit(item, ['score']));
    return result;
  }
  else
  return data;
};

export const searchResult = (searchValue, patentsList) => !_.isEmpty(_.trim(searchValue)) ?
  fetchSearchResult(searchValue, patentsList) :
  removeScore(patentsList);