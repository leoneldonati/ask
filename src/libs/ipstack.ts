export async function getLocationBy({ ip }: { ip: string }) {
  try {
    const res = await fetch(`https://ip.guide/${ip}`)

    if (!res.ok) return {
      city: '',
      country_name: ''
    }

    return await res.json()
  }
  catch(e) {
    return {
      city: '',
      country_name: ''
    }
  }
}
