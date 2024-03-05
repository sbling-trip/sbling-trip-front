import { useEffect, useState } from 'react'
import useUserInfo from '@auth/useUserInfo'
import { useAlertContext } from '@hooks/useAlertContext'

import IconUser from '@assets/icon/icon-userProfile.svg?react'
import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

const Profile = () => {
  const { openAlert } = useAlertContext()
  const { user } = useUserInfo()
  const {
    userName,
    userEmail,
    gender,
    birthAt,
    image,
    locationAgree,
    marketingAgree,
  } = user || {}

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [updatedUserName, setUpdatedUserName] = useState<string>('')

  const [updateLocationAgree, setUpdateLocationAgree] =
    useState<boolean>(!!locationAgree)
  const [updateMarketingAgree, setUpdateMarketingAgree] =
    useState<boolean>(!!marketingAgree)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsEditing(false)
      openAlert({
        title: '프로필 수정이 완료되었습니다.',
        onConfirmClick: () => {},
      })
    } catch (error) {
      console.error('Failed to update user profile', error)
    }
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUserName(e.target.value)
  }

  useEffect(() => {
    if (user) {
      setUpdatedUserName(userName || '')
      setUpdateLocationAgree(!!locationAgree)
      setUpdateMarketingAgree(!!marketingAgree)
    }
  }, [user, locationAgree, marketingAgree, userName])

  if (!user) {
    return
  }

  return (
    <div className={cx('profileContainer')}>
      <form onSubmit={handleSubmit}>
        <div className={cx('profileCard')}>
          <div className={cx('topContent')}>
            <div className={cx('profileImg')}>
              {image ? (
                <img src={image} alt="" />
              ) : (
                <IconUser
                  width={70}
                  height={70}
                  fill="var(--gray600)"
                  className={cx('iconUser')}
                />
              )}
              {isEditing && (
                <input type="file" accept="image/*" name="" id="" />
              )}
            </div>
            <div className={cx('editBtnWrap')}>
              {!isEditing && (
                <button
                  type="button"
                  className={cx('editBtn')}
                  onClick={handleEditProfile}
                >
                  프로필 수정
                </button>
              )}
            </div>
          </div>
          <div className={cx('mainContent')}>
            <div className={cx('rowBlock')}>
              <div className={cx('title')}>
                <h4 className={cx('edit')}>닉네임</h4>
              </div>
              <div className={cx('textWrap')}>
                {!isEditing && <span>{updatedUserName}</span>}
                {isEditing && (
                  <input
                    type="text"
                    name="userName"
                    autoComplete="off"
                    value={updatedUserName}
                    disabled={!isEditing}
                    onChange={handleUserNameChange}
                  />
                )}
              </div>
            </div>
            <div className={cx('rowBlock')}>
              <div className={cx('title')}>
                <h4>이메일</h4>
              </div>
              <div className={cx('textWrap')}>
                <span>{userEmail}</span>
              </div>
            </div>
            <div className={cx('rowBlock')}>
              <div className={cx('title')}>
                <h4>생년월일</h4>
              </div>
              <div className={cx('textWrap')}>
                <span>{`${birthAt?.slice(0, 4)}년`}</span>
                <span>{`${birthAt?.slice(5, 7)}월`}</span>
                <span>{`${birthAt?.slice(8, 10)}일`}</span>
              </div>
            </div>
            <div className={cx('rowBlock')}>
              <div className={cx('title')}>
                <h4>성별</h4>
              </div>
              <div className={cx('textWrap')}>
                <span>{gender === 'F' ? '여성' : '남성'}</span>
              </div>
            </div>
            <div className={cx('rowBlock')}>
              <div className={cx('title')}>
                <h4 className={cx('edit')}>약관 동의</h4>
              </div>
              <div className={cx('terms')}>
                <div className={cx('flexBlock')}>
                  <span>마케팅</span>
                  <div className={cx('selectRadio')}>
                    <input
                      type="radio"
                      name="marketingAgree"
                      id="marketingAgree"
                      disabled={!isEditing}
                      checked={updateMarketingAgree}
                      onChange={() =>
                        setUpdateMarketingAgree(!updateMarketingAgree)
                      }
                    />
                    <label htmlFor="marketingAgree">동의</label>
                  </div>
                  <div className={cx('selectRadio')}>
                    <input
                      type="radio"
                      name="marketingAgree"
                      id="marketingDisagree"
                      disabled={!isEditing}
                      checked={!updateMarketingAgree}
                      onChange={() =>
                        setUpdateMarketingAgree(!updateMarketingAgree)
                      }
                    />
                    <label htmlFor="marketingDisagree">동의 안함</label>
                  </div>
                </div>
                <div className={cx('flexBlock')}>
                  <span>위치 정보 이용</span>
                  <div className={cx('selectRadio')}>
                    <input
                      type="radio"
                      name="locationAgree"
                      id="locationAgree"
                      disabled={!isEditing}
                      checked={updateLocationAgree}
                      onChange={() =>
                        setUpdateLocationAgree(!updateLocationAgree)
                      }
                    />
                    <label htmlFor="locationAgree">동의</label>
                  </div>
                  <div className={cx('selectRadio')}>
                    <input
                      type="radio"
                      name="locationAgree"
                      id="locationDisagree"
                      disabled={!isEditing}
                      checked={!updateLocationAgree}
                      onChange={() =>
                        setUpdateLocationAgree(!updateLocationAgree)
                      }
                    />
                    <label htmlFor="locationDisagree">동의 안함</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isEditing && (
            <div className={cx('bottom')}>
              <div className={cx('btn__width50')}>
                <button
                  type="button"
                  className={cx('btn')}
                  onClick={handleCancelEdit}
                >
                  취소
                </button>
              </div>
              <div className={cx('btn__width50')}>
                <button type="submit" className={cx('btn')}>
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
      </form>

      <hr />
    </div>
  )
}

export default Profile
