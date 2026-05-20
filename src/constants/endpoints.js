const endpoint = 'https://api.nhtsa.gov/SafetyRatings';
const proxy = 'https://corsproxy.io/?url=';

export default function getUrl (URLPart){
  return proxy + encodeURIComponent(`${endpoint}${URLPart}`);
}
