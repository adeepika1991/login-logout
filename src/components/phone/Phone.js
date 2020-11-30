import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';
import { validateNumber, postData } from '../../utils/utils';


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

        const response = await postData(data, 'users/phone');
        console.log(response);
        if (response.success) {
            localStorage.setItem('login_Token', response.results.token);
            localStorage.setItem('phone_Number', data.phoneNumber);
            history.push('/otp')
        }
    }


    return (
        <form style={formStyles} onSubmit={handleSubmit(submitHandler)}>
            <label>Phone Number</label>
            <input type='tel'
                name='phoneNumber'
                defaultValue={localStorage.getItem('phone_Number') || null}
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
