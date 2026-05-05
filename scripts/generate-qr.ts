import QRCode from 'qrcode'

const inviteUrl = 'https://lucas5.giantomassi.com'
const outputPath = 'public/lucas5-qr.png'

async function generateQrCode() {
  // High error correction keeps the QR code reliable when printed or resized.
  await QRCode.toFile(outputPath, inviteUrl, {
    errorCorrectionLevel: 'H',
    margin: 2,
    type: 'png',
    width: 800,
  })

  console.log(`QR code generated at ${outputPath}`)
}

await generateQrCode()
