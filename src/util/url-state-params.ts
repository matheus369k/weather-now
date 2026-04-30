export function updateURLStateParams(props: { name: string; value: string }) {
  const url = new URL(window.location.toString())
  url.searchParams.set(props.name, props.value)
  window.history.pushState({}, '', url)
}

export function getURLStateParam(props: { name: string }) {
  const url = new URL(window.location.toString())
  const param = url.searchParams.get(props.name)
  return param
}
