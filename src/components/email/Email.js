import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { postData } from '../../utils/utils'
import { getPhone, getToken } from '../../utils/localRetrieve';
import { clearStorage, storeEmail } from '../../utils/localStore';

const Email = () => {

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
            } else {
                console.log(response.messageObj.message);
                e.target.reset();
            }
        } catch (err) {
            console.log(err);
            clearStorage();
            history.push('/');
        }

    }


    return (
        <form style={formStyles} onSubmit={handleSubmit(submitHandler)}>
            <label>Verify Email</label>
            <input type="text" autoFocus={true} placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} /><br />
            <p>{(errors.email?.type === 'required' || errors.email?.type === 'minLength') && 'Enter a valid Email address'}</p><br />
            <button>submit</button>
        </form>
    )
}

export default Email
