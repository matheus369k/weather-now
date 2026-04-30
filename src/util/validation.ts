export function isValidGeoCoordinate(props: { log: string; lat: string }) {
  const regexLatitude = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/
  const regexLongitude = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/

  return regexLatitude.test(props.lat) && regexLongitude.test(props.log)
}
