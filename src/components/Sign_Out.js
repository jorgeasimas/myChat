
import '.././App.css';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { auth } from '.././firebase/firebase.utils';
import { connect } from 'react-redux';
import { signOutStart} from '../redux/sagas';

export function Sign_Out({signOutStart}) {
        return auth.currentUser && (
          <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
        )
      } 

 
  const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  });

  const mapStateToProps = (state) => ({
    currentUser: state.currentUser
  });

  export default connect(mapStateToProps,mapDispatchToProps)(Sign_Out);