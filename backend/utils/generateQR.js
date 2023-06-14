const qr = require('qrcode');

const generateQR = async (data) => {
    let qrUrl = ''
    try {
        qrUrl = await qr.toDataURL(JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
    return qrUrl;
}

module.exports = generateQR;