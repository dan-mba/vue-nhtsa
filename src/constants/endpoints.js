const endpoint = 'https://api.nhtsa.gov/SafetyRatings';
const proxy = 'https://cors-proxy.htmldriven.com/?url=';

export default function getUrl (URLPart){
  return proxy + encodeURIComponent(`${endpoint}${URLPart}`);
}
