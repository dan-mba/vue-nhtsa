const endpoint = 'https://api.nhtsa.gov/SafetyRatings';
const proxy = 'https://cors-anywhere.com/';

export default function getUrl (URLPart){
  return proxy + encodeURIComponent(`${endpoint}${URLPart}`);
}
