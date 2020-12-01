import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils';
import { getEmail, getToken } from '../../utils/localRetrieve';
import { clearStorage } from '../../utils/localStore';
import { VerifyEmailForm, VerifyEmailPage, ResendEmail } from './VerifyEmailElements'

const VerifyEmail = ({ toast }) => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    const submitHandler = async (data, e) => {
        try {
            const response = await postData('POST', {
                email: getEmail(),
                token: getToken(),
                ...data
            }, 'users/email/verify');
            // console.log(response);

            if (response.success) {
                history.push('/signup');
                toast.success(response.message);
            } else {
                if (response.messageObj.wrongEmailTokenCount < 3) {
                    e.target.reset()
                    toast.error(`Wrong Token, ${3 - response.messageObj.wrongEmailTokenCount
                        } attempts remaining `)
                }
                else {
                    toast.error(response.message);
                    clearStorage();
                    history.push('/');
                }
            }
        } catch (err) {
            toast.error('INTERNAL SERVER ERROR');
        }
    }

    const resendHandler = async () => {
        try {
            const response = await postData('PUT', {
                email: getEmail(),
                token: getToken()
            }, 'users/token/resendtoken');
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
                clearStorage();
                history.push('/');
            }
        } catch (err) {
            toast.error('INTERNAL SERVER ERROR');
        }
    }

    return (
        <VerifyEmailPage>
            <VerifyEmailForm onSubmit={handleSubmit(submitHandler)}>
                <label>Enter Email Token</label>
                <input type='tel'
                    name='verificationToken'
                    autoFocus={true}
                    maxLength='6'
                    onKeyDown={(e) => validateNumber(e)}
                    ref={register({
                        required: 'Email Token is required',
                        minLength: {
                            value: 6,
                            message: 'Please Enter your valid email token'
                        }
                    })} /><br />
                {errors.verificationToken && <p>{errors.verificationToken.message}</p>}<br /><br />
                <button>submit</button>
            </VerifyEmailForm>
            <ResendEmail>
                <p>Didn't get email token?</p>
                <button onClick={resendHandler}>Resend code</button>
            </ResendEmail>
        </VerifyEmailPage>
    )
}

export default VerifyEmail
