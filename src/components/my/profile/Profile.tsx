import { useEffect, useState } from 'react'
import ProfileImage from './ProfileImage'
import useUserInfo from '@auth/useUserInfo'
import { useAlertContext } from '@hooks/useAlertContext'

import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

const Profile = () => {
  const { openAlert } = useAlertContext()
  const { user, fetchUpdateUserInfo } = useUserInfo()
  const {
    userName: initialUserName,
    userEmail: initialUserEmail,
    gender: initialGender,
    birthAt: initialBirthAt,
    locationAgree: initialLocationAgree,
    marketingAgree: initialMarketingAgree,
  } = user || {}

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [updatedUserName, setUpdatedUserName] = useState<string>(
    initialUserName || '',
  )
  const [updatedLocationAgree, setUpdatedLocationAgree] = useState<boolean>(
    initialLocationAgree || false,
  )
  const [updatedMarketingAgree, setUpdatedMarketingAgree] = useState<boolean>(
    initialMarketingAgree || false,
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetchUpdateUserInfo({
        userName: updatedUserName,
        locationAgree: updatedLocationAgree,
        marketingAgree: updatedMarketingAgree,
      })

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
    setUpdatedUserName(initialUserName || '')
    setUpdatedLocationAgree(initialLocationAgree || false)
    setUpdatedMarketingAgree(initialMarketingAgree || false)
  }

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUserName(e.target.value)
  }

  useEffect(() => {
    if (user) {
      setUpdatedUserName(initialUserName || '')
      setUpdatedLocationAgree(initialLocationAgree || false)
      setUpdatedMarketingAgree(initialMarketingAgree || false)
    }
  }, [user, initialUserName, initialLocationAgree, initialMarketingAgree])

  if (!user) {
    return
  }

  return (
    <div className={cx('profileContainer')}>
      <form onSubmit={handleSubmit}>
        <div className={cx('profileCard')}>
          <div className={cx('topContent')}>
            <ProfileImage user={user} isEditing={isEditing} />
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
            <div className={cx('infoItem')}>
              <div className={cx('title')}>
                <h4 className={cx('edit')}>닉네임</h4>
              </div>
              <div className={cx('infoContents')}>
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
            <div className={cx('infoItem')}>
              <div className={cx('title')}>
                <h4>이메일</h4>
              </div>
              <div className={cx('infoContents')}>
                <span>{initialUserEmail}</span>
              </div>
            </div>
            <div className={cx('infoItem')}>
              <div className={cx('title')}>
                <h4>생년월일</h4>
              </div>
              <div className={cx('infoContents')}>
                <span>{`${initialBirthAt?.slice(0, 4)}년`}</span>
                <span>{`${initialBirthAt?.slice(5, 7)}월`}</span>
                <span>{`${initialBirthAt?.slice(8, 10)}일`}</span>
              </div>
            </div>
            <div className={cx('infoItem')}>
              <div className={cx('title')}>
                <h4>성별</h4>
              </div>
              <div className={cx('infoContents')}>
                <span>{initialGender === 'F' ? '여성' : '남성'}</span>
              </div>
            </div>
            <div className={cx('infoItem')}>
              <div className={cx('title')}>
                <h4 className={cx('edit')}>약관 동의</h4>
              </div>
              <div className={cx('infoContents')}>
                <div className={cx('termsAgreement')}>
                  <div className={cx('item')}>
                    <span>마케팅</span>
                    <div className={cx('selectRadio')}>
                      <input
                        type="radio"
                        name="marketingAgree"
                        id="marketingAgree"
                        disabled={!isEditing}
                        checked={updatedMarketingAgree}
                        onChange={() =>
                          setUpdatedMarketingAgree(!updatedMarketingAgree)
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
                        checked={!updatedMarketingAgree}
                        onChange={() =>
                          setUpdatedMarketingAgree(!updatedMarketingAgree)
                        }
                      />
                      <label htmlFor="marketingDisagree">동의 안함</label>
                    </div>
                  </div>
                  <div className={cx('item')}>
                    <span>위치 정보 이용</span>
                    <div className={cx('item')}>
                      <div className={cx('selectRadio')}>
                        <input
                          type="radio"
                          name="locationAgree"
                          id="locationAgree"
                          disabled={!isEditing}
                          checked={updatedLocationAgree}
                          onChange={() =>
                            setUpdatedLocationAgree(!updatedLocationAgree)
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
                          checked={!updatedLocationAgree}
                          onChange={() =>
                            setUpdatedLocationAgree(!updatedLocationAgree)
                          }
                        />
                        <label htmlFor="locationDisagree">동의 안함</label>
                      </div>
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
        </div>
      </form>
      <hr />
    </div>
  )
}

export default Profile
