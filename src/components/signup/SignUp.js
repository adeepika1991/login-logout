import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { getToken, getEmail, getPhone } from '../../utils/localRetrieve';
import { postData, urlData } from '../../utils/utils';
import { storeUserDetails } from '../../utils/localStore'
import { toast } from 'react-toastify';

const SignUp = () => {
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [referralMessage, setReferralMessage] = useState('');

    const formStyles = {
        margin: '0 auto',
        marginTop: '100px',
        width: '60%',
        padding: '2rem',
        height: '70%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }

    const onSubmit = async (data) => {
        try {
            const response = await postData('POST', {
                token: getToken(),
                source: "WEB_APP",
                ...data
            }, 'users');
            console.log(response);
            if (response.success) {
                const { _id, token, firstName, lastName } = response.results.user;
                storeUserDetails(_id, token, firstName, lastName);
                toast.success(response.message)
                history.push('/profile');
            } else {
                history.push('/');
                toast.error(response.message);
            }
        } catch (err) {
            toast.error('INTERNAL SERVER ERROR');
        }
    }

    const onBlurHandle = async (e) => {
        const response = await urlData(`users/referral/${e.target.value}`);
        if (response.success) {
            setReferralMessage(response.results.message)
        } else {
            console.log(response);
        }
    }

    return (
        <form style={formStyles} onSubmit={handleSubmit(onSubmit)}>
            <p>{referralMessage} </p>
            <input type="text" placeholder="First name" name="firstName" maxLength='20' ref={register({ required: true, minLength: 2, pattern: /^[a-z][a-z'-]{2,}$/i })} /><br />
            <input type="text" placeholder="Last name" name="lastName" maxLength='20' ref={register({ required: true, minLength: 2, pattern: /^[a-z][a-z'-]{2,}$/i })} /><br />
            <label htmlFor="lastName">Reference Code</label>
            <input name="referredCodeKey" type='text' onBlur={onBlurHandle} maxLength='6' ref={register} /><br />
            <input type="text" placeholder="Email" name="email" defaultValue={getEmail()} readOnly ref={register} /><br />
            <input type="tel" placeholder="Mobile number" defaultValue={getPhone()} name="phoneNumber" readOnly ref={register} /><br />
            <input type="checkbox" name="agreeToPrivacyPolicy" ref={register({ required: true })} /><span>I agree to terms and policy</span><br />

            <input type="submit" />
        </form>
    );
}

export default SignUp;