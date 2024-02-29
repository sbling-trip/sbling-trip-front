import { TermsState } from '@hooks/useTermsAgreement'
import IconCheck from '@assets/icon/icon-check.svg?react'
import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './TermsAndConditions.module.scss'

const cx = classNames.bind(styles)

interface TermsAndConditionsProps {
  selectAllTerms: boolean
  termsAgreed: TermsState
  handleSelectAgreeAll: () => void
  handleSelectTerm: (term: keyof TermsState) => void
}

const TermsAndConditions = ({
  selectAllTerms,
  termsAgreed,
  handleSelectAgreeAll,
  handleSelectTerm,
}: TermsAndConditionsProps) => {
  const terms = [
    { key: 'term1', label: '서비스 이용 동의 (필수)' },
    { key: 'term2', label: '마케팅 수신 동의 (선택)' },
    { key: 'term3', label: '위치 정보 이용 동의 (선택)' },
  ]

  return (
    <div className={cx('termsAndConditions')}>
      <div className={cx('totalAgree')}>
        <span className={cx('selectAllOption')}>
          <input
            type="checkbox"
            checked={selectAllTerms}
            onChange={handleSelectAgreeAll}
            id="selectAllTerms"
          />
          {selectAllTerms ? <IconCheck fill="var(--blue400)" /> : null}
        </span>
        <label htmlFor="selectAllTerms" className={cx('checkboxLabel')}>
          <strong>전체 약관 동의</strong>
        </label>
      </div>
      <ul>
        {terms.map(({ key, label }) => (
          <li key={key}>
            <div className={cx('selectItem')}>
              <div className={cx('checkbox')}>
                <span>
                  <input
                    type="checkbox"
                    checked={termsAgreed[key]}
                    onChange={() => handleSelectTerm(key)}
                  />
                  {termsAgreed[key] && <IconCheck fill="var(--blue400)" />}
                </span>
                <label htmlFor=""></label>
              </div>
              <button type="button" className={cx('labelBtn')}>
                <span>{label}</span>
                <div className={cx('arrowBox')}>
                  <IconArrow
                    width={18}
                    height={18}
                    className={cx('iconArrow')}
                  />
                </div>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TermsAndConditions
