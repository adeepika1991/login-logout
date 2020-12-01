import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils';
import { storeUserDetails, clearStorage } from '../../utils/localStore';
import { getPhone, getToken } from '../../utils/localRetrieve';

const Otp = () => {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

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
            const response = await postData('POST', {
                phoneNumber: getPhone(),
                token: getToken(),
                ...data
            }, 'users/phone/verify');
            console.log(response);
            if (response.success) {

                if (!response.results.isLogin) {
                    history.push('/email')
                } else {
                    const { _id, token, firstName, lastName } = response.results.user;
                    storeUserDetails(_id, token, firstName, lastName);
                    history.push('/profile')
                }
            } else {
                if (response.messageObj.wrongOtpCount < 3) {
                    e.target.reset();
                    console.log(`Wrong OTP, ${3 - response.messageObj.wrongOtpCount
                        } attempts remaining `)
                }
                else {
                    clearStorage();
                    history.push('/');
                }
            }
        } catch (err) {
            clearStorage();
            console.log('SERVER ERROR, PLEASE TRY ANOTHER NUMBER');
            history.push('/');

        }
    }

    const resendHandler = async () => {
        try {
            const response = await postData('PUT', {
                phoneNumber: getPhone(),
                token: getToken()
            }, 'users/otp/resend');

            if (response.success) {
                console.log(response.message);
            } else {
                console.log(response.message);
                clearStorage();
                history.push('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form style={formStyles} onSubmit={handleSubmit(submitHandler)}>
                <label>Enter OTP</label>
                <input type='tel'
                    name='verificationCode'
                    autoFocus={true}
                    maxLength='4'
                    onKeyDown={(e) => validateNumber(e)}
                    ref={register({
                        required: true,
                        minLength: 4
                    })} /><br />
                <p>{(errors.verificationCode?.type === 'required' || errors.verificationCode?.type === 'minLength') && 'Enter a valid OTP Number'}</p><br />
                <button>submit</button>
            </form>
            <div>
                <h3>Didn't get OTP?</h3>
                <button onClick={resendHandler}>Resend OTP</button>
            </div>
        </>
    )
}

export default Otp
