import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getId, getUserToken, getPhone, getFirstName, getLastName } from '../../utils/localRetrieve';
import { clearStorage } from '../../utils/localStore';
import { authUpdate, logoutProfile } from '../../utils/utils';
import { ProfilePage, ProfileForm, Button } from './ProfileElements'

const Profile = ({ toast }) => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await authUpdate('PUT', { ...data }, getId(), getUserToken());
            console.log(response);
            toast.success(response.message);
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
                toast.success(response.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <ProfilePage>
            <ProfileForm onSubmit={handleSubmit(onSubmit)}>
                <h2>Update your profile</h2><br />
                <label>First Name</label>
                <input type="text"
                    placeholder="First name"
                    name="firstName"
                    defaultValue={getFirstName()}
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
                    placeholder="Last name"
                    name="lastName"
                    defaultValue={getLastName()}
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
                <label>Phone Number</label>
                <input type="tel" placeholder="Mobile number" defaultValue={getPhone()} name="phone_Number" readOnly ref={register} /><br />

                <button type="submit">Update</button>
            </ProfileForm>
            <Button onClick={logOutHandler}>Log Out</Button>
        </ProfilePage>
    )
}

export default Profile
