const endpoint = 'https://api.nhtsa.gov/SafetyRatings';
const proxy = 'https://test.cors.workers.dev/?';

export default function getUrl (URLPart){
  return proxy + encodeURIComponent(`${endpoint}${URLPart}`);
}
