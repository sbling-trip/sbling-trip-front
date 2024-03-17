import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

interface TermsAgreementItemProps {
  name: string
  label: string
  disabled: boolean
  checked: boolean
  onChange: () => void
}

const TermsAgreementItem = ({
  name,
  label,
  disabled,
  checked,
  onChange,
}: TermsAgreementItemProps) => {
  return (
    <div className={cx('selectRadio')}>
      <input
        type="radio"
        name={name}
        id={`${name}-${label}`}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`${name}-${label}`}>{label}</label>
    </div>
  )
}

export default TermsAgreementItem
