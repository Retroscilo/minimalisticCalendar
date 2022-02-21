export const SWRFetcher = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    if (res.status !== 200) throw data
    return data
  } catch (e) {
    if(e.error) throw new Error(e.error)
    else throw new Error("Couldn't fetch API : " + url);
  }
};

export const APIFetcher = async (url, method, body) => {
  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "content-type": "Application/JSON"
      }
    })
    const data = await res.json()
    if (res.status !== 200) throw data
    return data
  } catch (e) {
    if(e.error) throw new Error(e.error)
    else throw new Error("Couldn't fetch API : " + url);
  }
}
