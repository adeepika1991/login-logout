import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils';
import { storePhoneAndToken } from '../../utils/localStore';
import { PhonePage, Form, Title } from './PhoneElements';



const Phone = ({ toast }) => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    //Post phone number and proceeds to next page to verify otp
    const submitHandler = async (data) => {
        try {
            const response = await postData('POST', data, 'users/phone');
            if (response.success) {
                const { token } = response.results;
                const { phoneNumber } = data;
                storePhoneAndToken(phoneNumber, token)
                history.push('/otp')
                toast.success(response.message);
            }
        } catch (err) {
            toast.error('INTERNAL SERVER ERROR. TRY AGAIN LATER')
        }
    }


    return (
        <PhonePage>
            <Title>
                <h1>Welcome to Basis!</h1>
                <h3>Your Money, Your Way</h3>
                <p>Enter your mobile number to get started</p>
            </Title>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <label>Phone Number</label><br />
                <input type='tel'
                    name='phoneNumber'
                    autoFocus={true}
                    maxLength='10'
                    onKeyDown={(e) => validateNumber(e)}
                    ref={register({
                        required: 'Phone number is required',
                        minLength: {
                            value: 10,
                            message: 'Please enter a valid phone number'
                        }
                    })} /><br />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}<br />
                <button>Send OTP</button>
            </Form>
        </PhonePage>

    )
}

export default Phone
