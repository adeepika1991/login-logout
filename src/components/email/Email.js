import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { postData } from '../../utils/utils'
import { getPhone, getToken } from '../../utils/localRetrieve';
import { clearStorage, storeEmail } from '../../utils/localStore';
import { EmailPage, EmailContainer } from './EmailElements'

const Email = ({ toast }) => {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    const submitHandler = async (data, e) => {
        const { email } = data;
        try {
            const response = await postData('POST', {
                ...data,
                phoneNumber: getPhone(),
                token: getToken()

            }, 'users/email');
            console.log(response);
            if (response.success) {
                storeEmail(email);
                history.push('/verifyemail');
                toast.success(response.message)
            } else {
                toast.error(response.message);
                e.target.reset();
                history.push('/');
            }
        } catch (err) {
            toast.error(err);
            clearStorage();
            history.push('/');
        }

    }


    return (
        <EmailContainer>
            <EmailPage onSubmit={handleSubmit(submitHandler)}>
                <label>Verify Email</label><br />
                <input type="text" autoFocus={true} placeholder="Email" name="email" ref={register({
                    required: 'Email is required', pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                    }
                })} /><br />
                {errors.email && <p>{errors.email.message}</p>}<br />
                <button>Verify Email</button>
            </EmailPage>
        </EmailContainer>
    )
}

export default Email
