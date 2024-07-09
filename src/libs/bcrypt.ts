import bcrypt from 'bcrypt'

async function encrypt (password: string) {
  try {
    return {
      ok: true,
      hash: await bcrypt.hash(password, 10)
    }
  }
  catch (e) {
    return {
      ok: false,
      error: 'Error on encrypt data.'
    }
  }
}

async function compare(hash: string, password: string) {
  try {
    return {
      ok: await bcrypt.compare(password, hash),
    }
  }
  catch(e) {
    return {
      ok: false,
      error: 'Error on compare data.'
    }
  }
}
export { encrypt, compare }