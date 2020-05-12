import profile from 'src/reducers/profile';
import {
  INITIALIZE_USER_INFO,
  UPDATE_USER_INFO
} from 'src/actions/profileActions';

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(profile(undefined, {})).toEqual({
      userId: null,
      nickname: '',
      avatarPath: '',
      experience: 0,
      account: {
        accountId: null,
        email: ''
      }
    });
  });

  it('should handle INITIALIZE_USER_INFO', () => {
    expect(
      profile(undefined, {
        type: INITIALIZE_USER_INFO,
        payload: {
          userId: 1,
          nickName: 'Prometium',
          avatarPath: '//avatar.png',
          experience: 0,
          email: '1@1'
        }
      })
    ).toEqual({
      userId: 1,
      nickname: 'Prometium',
      avatarPath: '//avatar.png',
      experience: 0,
      email: '1@1'
    });
  });

  it('should handle UPDATE_USER_INFO', () => {
    expect(
      profile(
        {
          userId: 1,
          nickname: 'Prometium',
          avatarPath: '//avatar.png',
          experience: 0,
          account: {
            accountId: 1,
            email: '1@1'
          }
        },
        {
          type: UPDATE_USER_INFO,
          payload: {
            nickname: 'Promet1um',
            avatarPath: '//avatar2.png'
          }
        }
      )
    ).toEqual({
      userId: 1,
      nickname: 'Promet1um',
      avatarPath: '//avatar2.png',
      experience: 0,
      account: {
        accountId: 1,
        email: '1@1'
      }
    });
  });
});
