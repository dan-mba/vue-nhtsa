const endpoint = 'https://api.nhtsa.gov/SafetyRatings';
const proxy = 'https://api.cors.lol/?url=';

export default function getUrl (URLPart){
  return proxy + encodeURIComponent(`${endpoint}${URLPart}`);
}
