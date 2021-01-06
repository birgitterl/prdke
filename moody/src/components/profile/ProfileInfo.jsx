<<<<<<< HEAD
/* import React from 'react';
=======
import React from 'react';
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745

const ProfileInfo = ({ auth: { isAuthenticated } }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return null;
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default ProfileInfo;
<<<<<<< HEAD
 */
=======
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745
