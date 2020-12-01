import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils';
import { getEmail, getToken } from '../../utils/localRetrieve';
import { clearStorage } from '../../utils/localStore';

const VerifyEmail = () => {
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
                email: getEmail(),
                token: getToken(),
                ...data
            }, 'users/email/verify');
            console.log(response);

            if (response.success) {
                history.push('/signup')
            } else {
                if (response.messageObj.wrongEmailTokenCount < 3) {
                    e.target.reset()
                    console.log(`Wrong Token, ${3 - response.messageObj.wrongEmailTokenCount
                        } attempts remaining `)
                }
                else {
                    console.log(response.message);
                    clearStorage();
                    history.push('/');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const resendHandler = async () => {
        try {
            const response = await postData('PUT', {
                email: getEmail(),
                token: getToken()
            }, 'users/token/resendtoken');
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
                <label>Enter Email Token</label>
                <input type='tel'
                    name='verificationToken'
                    autoFocus={true}
                    maxLength='6'
                    onKeyDown={(e) => validateNumber(e)}
                    ref={register({
                        required: true,
                        minLength: 6
                    })} /><br />
                <p>{(errors.verificationToken?.type === 'required' || errors.verificationToken?.type === 'minLength') && 'Enter a valid verification number'}</p><br />
                <button>submit</button>
            </form>
            <div>
                <h3>Didn't get email verification code?</h3>
                <button onClick={resendHandler}>Resend verification code</button>
            </div>
        </>
    )
}

export default VerifyEmail
