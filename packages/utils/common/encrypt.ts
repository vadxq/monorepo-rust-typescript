import { AES, enc, HmacSHA256, mode, pad } from 'crypto-js'

export const aesDecrypt = (data: string, secret: string) => {
  const secretData = enc.Utf8.parse(secret)
  const cipherData = enc.Base64.parse(data)
  const cipherDataString = enc.Base64.stringify(cipherData)
  const decryptedData = AES.decrypt(cipherDataString, secretData, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  })
  const decryptedString = decryptedData.toString(enc.Utf8)
  return JSON.parse(decryptedString)
}

export const signHmacSHA256 = (data: string, secret: string) => {
  const signature = HmacSHA256(data, secret)
  const base64Signature = enc.Base64.stringify(signature)
  return base64Signature
}

export const aesIvDecrypt = (data: string, secret: string, iv: string) => {
  const bytes = AES.decrypt(data, enc.Utf8.parse(secret), {
    iv: enc.Utf8.parse(iv),
    mode: mode.CBC,
    padding: pad.Pkcs7,
  })

  return bytes.toString(enc.Utf8)
}
