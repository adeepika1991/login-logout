import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getId, getUserToken, getPhone, getFirstName, getLastName } from '../../utils/localRetrieve';
import { clearStorage } from '../../utils/localStore';
import { authUpdate, logoutProfile } from '../../utils/utils'

const Profile = () => {
    const history = useHistory();
    const { register, handleSubmit } = useForm();

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
            const response = await authUpdate('PUT', { ...data }, getId(), getUserToken());
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const logOutHandler = async () => {
        try {
            const response = await logoutProfile(getId(), getUserToken())
            console.log(response);

            if (response.success) {
                clearStorage();
                history.push('/')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Welcome to Basis </h1>
            <h3>Edit your Profile</h3>
            <form style={formStyles} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="First name" name="firstName" defaultValue={getFirstName()} ref={register({ required: true, maxLength: 80 })} /><br />
                <input type="text" placeholder="Last name" name="lastName" defaultValue={getLastName()} ref={register({ required: true, maxLength: 100 })} /><br />
                <input type="tel" placeholder="Mobile number" defaultValue={getPhone()} name="phone_Number" readOnly ref={register} /><br />

                <button type="submit">Update</button>
            </form>
            <button onClick={logOutHandler}>Log Out</button>
        </div>
    )
}

export default Profile
