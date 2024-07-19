// const accountSid = 'your_account_sid';
// const authToken = 'your_auth_token';
// const client = new twilio(accountSid, authToken);
// const fromPhoneNumber = 'your_twilio_phoneconst sendOtp = async (req, res) => {


let otps = {}; // Store OTPs temporarily


const sendOtp = async (req, res) => {

    const { phoneNumber } = req.body;

    const otp = 8899;

    // const otp = Math.floor(100000 + Math.rclient.messages


    // Store OTP with a 5-minute expiration  
    otps[phoneNumber] = { otp, expiresAt: Date.now() + 300000 };

    // Send OTP via SMS
    // client.messages
    //     .create({
    //         body: `Your OTP code is ${otp}`,
    //         from: fromPhoneNumber,
    //         to: phoneNumber
    //     })
    //     .then(message => {
    //         res.send('OTP sent');
    //     })
    //     .catch(error => {
    //         res.status(500).send('Error sending SMS');
    //     });

    res.json({
        message: "successfully send otp",
        status: 200,
        data: otps
    })

}


const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const storedOtp = otps[phoneNumber];

    console.log(storedOtp, "from verify otp sir");
    try {

        if (!storedOtp) {
            return res.status(400).send('OTP not found');
        }

        if (storedOtp.expiresAt < Date.now()) {
            return res.status(400).send('OTP expired');
        }

        if (storedOtp.otp != otp) {
            return res.status(400).send('Invalid OTP');
        }

        // OTP is valid, generate a hard-coded auth token
        const authToken = 'sflsmfpsaddcmpsKks';

        // Optionally, delete OTP after verification
        delete otps[phoneNumber];

        res.json({
            authToken,
            message: "otp verified successfully",
            status: 200
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = { sendOtp, verifyOtp }