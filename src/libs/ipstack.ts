import ipstack from "ipstack";
export async function getLocationBy({ ip }: { ip: string }) {
  return new Promise((res, rej) => {
    ipstack(ip, import.meta.env.IP_STACK, (err, result) => {
      if (!err) return res(result)

      return rej(err)
    })
  })
}
