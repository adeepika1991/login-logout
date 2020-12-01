import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils';
import { storeUserDetails, clearStorage } from '../../utils/localStore';
import { getPhone, getToken } from '../../utils/localRetrieve';
import { OtpForm, OtpPage, Resend } from './OtpElements'

const Otp = ({ toast }) => {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();


    //Verifies otp, if the user enters otp wrongle more than 3 times 
    //reverts back to phone component
    //If the user is already registered then proceeds to profile component
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
                    toast.success(response.message);
                } else {
                    const { _id, token, firstName, lastName } = response.results.user;
                    storeUserDetails(_id, token, firstName, lastName);
                    toast.success('Successfully Logged In');
                    history.push('/profile')
                }
            } else {
                if (response.messageObj.wrongOtpCount < 3) {
                    e.target.reset();
                    toast.error(`Wrong OTP, ${3 - response.messageObj.wrongOtpCount
                        } attempts remaining `)
                }
                else {
                    clearStorage();
                    toast.warn(response.message);
                    history.push('/');
                }
            }
        } catch (err) {
            clearStorage();
            toast.error('SERVER ERROR, PLEASE TRY ANOTHER NUMBER');
            history.push('/');

        }
    }
    //In case user didn't get otp, this can resend otp upto 3 times
    //otherwise reverts back to phone
    const resendHandler = async () => {
        try {
            const response = await postData('PUT', {
                phoneNumber: getPhone(),
                token: getToken()
            }, 'users/otp/resend');

            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
                clearStorage();
                history.push('/');
            }
        } catch (err) {
            toast.error('Internal Server, Please Try after some time');
        }
    }

    return (
        <OtpPage>
            <OtpForm onSubmit={handleSubmit(submitHandler)}>
                <label>Enter OTP</label><br />
                <input type='tel'
                    name='verificationCode'
                    autoFocus={true}
                    maxLength='4'
                    onKeyDown={(e) => validateNumber(e)}
                    ref={register({
                        required: 'OTP is required',
                        minLength: {
                            value: 4,
                            message: 'Please enter your valid OTP'
                        }
                    })} /><br />
                {errors.verificationCode && <p>{errors.verificationCode.message}</p>}<br /><br />
                <button>Verify OTP</button>
            </OtpForm>
            <Resend>
                <p>Didn't get OTP?</p>
                <button onClick={resendHandler}>Resend OTP</button>
            </Resend>
        </OtpPage>
    )
}

export default Otp
