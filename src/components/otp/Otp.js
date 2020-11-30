import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils'

const Otp = () => {

    const history = useHistory();
    const { register, handleSubmit, errors, reset } = useForm();

    const formStyles = {
        margin: '0 auto',
        marginTop: '100px',
        width: '40%',
        padding: '2rem',
        height: '40%',
        border: '2px solid black'
    }

    const submitHandler = async (data, e) => {

        try {
            const response = await postData({
                phoneNumber: localStorage.getItem("phone_Number"),
                token: localStorage.getItem("login_Token"),
                ...data
            }, 'users/phone/verify');
            console.log(response);
            if (response.success) {

                if (!response.results.isLogin) {
                    history.push('/email')
                } else {
                    localStorage.setItem('user_Profile', JSON.stringify(response.results.user));
                    history.push('/profile')
                }

            } else {
                if (response.messageObj.wrongOtpCount < 3) {
                    console.log(`Wrong OTP, ${3 - response.messageObj.wrongOtpCount
                        } attempts remaining `)
                }
                else {
                    history.push('/');
                    console.log('')
                    e.target.reset()
                    localStorage.setItem('login_Token', '')
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form style={formStyles} onSubmit={handleSubmit(submitHandler)}>
            <label>Enter OTP</label>
            <input type='tel'
                name='verificationCode'
                maxLength='4'
                onKeyDown={(e) => validateNumber(e)}
                ref={register({
                    required: true,
                    minLength: 4
                })} /><br />
            <p>{(errors.verificationCode?.type === 'required' || errors.verificationCode?.type === 'minLength') && 'Enter a valid OTP Number'}</p><br />
            <button>submit</button>
        </form>
    )
}

export default Otp
