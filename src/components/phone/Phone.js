import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils';
import { storePhoneAndToken } from '../../utils/localStore'


const Phone = () => {
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

    const submitHandler = async (data) => {

        const response = await postData('POST', data, 'users/phone');
        //console.log(response);
        if (response.success) {
            const { token } = response.results;
            const { phoneNumber } = data;
            storePhoneAndToken(phoneNumber, token)
            history.push('/otp')
        }
    }


    return (
        <form style={formStyles} onSubmit={handleSubmit(submitHandler)}>
            <label>Phone Number</label>
            <input type='tel'
                name='phoneNumber'
                autoFocus={true}
                maxLength='10'
                onKeyDown={(e) => validateNumber(e)}
                ref={register({
                    required: true,
                    minLength: 10
                })} /><br />
            <p>{(errors.phoneNumber?.type === 'required' || errors.phoneNumber?.type === 'minLength') && 'Enter a valid 10 digit Phone Number'}</p><br />
            <button>submit</button>
        </form>


    )
}

export default Phone
