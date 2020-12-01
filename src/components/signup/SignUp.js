import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { getToken, getEmail, getPhone } from '../../utils/localRetrieve';
import { postData, urlData } from '../../utils/utils';
import { storeUserDetails } from '../../utils/localStore'
import { SignUpForm, SignUpPage } from './SignUpElements'

const SignUp = ({ toast }) => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [referralMessage, setReferralMessage] = useState('');


    //Signup form post handler, if response is success, proceeds to profile
    //else revert to phone component
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

    //handles the refferral code
    const onBlurHandle = async (e) => {
        const response = await urlData(`users/referral/${e.target.value}`);
        if (response.success) {
            setReferralMessage(response.results.message)
        } else {
            console.log(response);
        }
    }

    return (
        <SignUpPage>
            <SignUpForm onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up to Basis</h2><br />
                <h4>{referralMessage} </h4>
                <label>First Name</label>
                <input type="text"
                    name="firstName"
                    maxLength='20'
                    ref={register({
                        required: 'First Name is Required',
                        minLength: {
                            value: 2,
                            message: 'Minimum characters should be 2'
                        },
                        pattern: {
                            value: /^[a-z][a-z'-]{2,}$/i,
                            message: 'Enter only alphabets'
                        }
                    })} /><br />
                {errors.firstName && <p>{errors.firstName.message}</p>}<br />
                <label>Last Name</label>
                <input type="text"
                    name="lastName"
                    maxLength='20'
                    ref={register({
                        required: 'Last Name is Required',
                        minLength: {
                            value: 2,
                            message: 'Minimum characters should be 2'
                        },
                        pattern: {
                            value: /^[a-z][a-z'-]{2,}$/i,
                            message: 'Enter only alphabets'
                        }
                    })} /><br />
                {errors.lastName && <p>{errors.lastName.message}</p>}<br />
                <label htmlFor="referredCodeKey">Reference Code</label>
                <input name="referredCodeKey" type='text' onBlur={onBlurHandle} maxLength='6' ref={register} /><br />
                <label>Email</label>
                <input type="text" name="email" defaultValue={getEmail()} readOnly ref={register} /><br />
                <label>Phone Number</label>
                <input type="tel" defaultValue={getPhone()} name="phoneNumber" readOnly ref={register} /><br />
                <input type="checkbox" name="agreeToPrivacyPolicy" ref={register({ required: 'Agree to privacy policy' })} />&nbsp;<span>I agree to terms and policy</span><br />
                {errors.agreeToPrivacyPolicy && <p>{errors.agreeToPrivacyPolicy.message}</p>}<br />
                <button>Verify OTP</button>
            </SignUpForm>
        </SignUpPage>
    );
}

export default SignUp;