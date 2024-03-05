import { useState } from 'react'
import { User } from '@models/user'

import IconUser from '@assets/icon/icon-userProfile.svg?react'
import classNames from 'classnames/bind'
import styles from './ProfileImage.module.scss'

const cx = classNames.bind(styles)

interface ProfileImageProps {
  user: User
  isEditing: boolean
}

const ProfileImage = ({ user, isEditing }: ProfileImageProps) => {
  const [updatedImage, setUpdatedImage] = useState(user.image || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const result = reader.result as string
        setUpdatedImage(result)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={cx('imgContainer')}>
      {updatedImage ? (
        <div className={cx('imgBox')}>
          <img src={updatedImage} alt="" />
        </div>
      ) : (
        <IconUser
          width={70}
          height={70}
          fill="var(--gray600)"
          className={cx('iconUser')}
        />
      )}
      {isEditing && (
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
      )}
    </div>
  )
}

export default ProfileImage
